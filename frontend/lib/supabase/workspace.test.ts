import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient } from './server';
import { getOrCreateWorkspaceId } from './workspace';

type WorkspaceRecord = { id: string } | null;

type SupabaseMockOptions = {
  user: { id: string; email?: string | null } | null;
  userError?: Error | null;
  workspaceRecord?: WorkspaceRecord;
  workspaceError?: { code: string } | null;
  createdWorkspace?: WorkspaceRecord;
  createWorkspaceError?: Error | null;
};

type MockedCreateClient = ReturnType<typeof vi.fn> & { mockResolvedValue: (value: unknown) => void };

vi.mock('./server', () => ({
  createClient: vi.fn(),
}));

const mockCreateClient = createClient as unknown as MockedCreateClient;

function buildSupabaseMock(options: SupabaseMockOptions) {
  const {
    user,
    userError = null,
    workspaceRecord = null,
    workspaceError = null,
    createdWorkspace = null,
    createWorkspaceError = null,
  } = options;

  const maybeSingle = vi.fn().mockResolvedValue({
    data: workspaceRecord,
    error: workspaceError,
  });

  const single = vi.fn().mockResolvedValue({
    data: createdWorkspace,
    error: createWorkspaceError,
  });

  const insertSelect = vi.fn().mockReturnValue({ single });

  const queryBuilder = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle,
    insert: vi.fn().mockReturnValue({ select: insertSelect }),
  };

  const from = vi.fn().mockImplementation((table: string) => {
    if (table !== 'workspaces') {
      throw new Error(`Unexpected table: ${table}`);
    }
    return queryBuilder;
  });

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user },
        error: userError,
      }),
    },
    from,
    queryBuilder,
    insertSelect,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getOrCreateWorkspaceId', () => {
  it('ném lỗi khi Supabase trả về lỗi xác thực', async () => {
    const authError = new Error('Auth failed');
    const supabase = buildSupabaseMock({ user: null, userError: authError });
    mockCreateClient.mockResolvedValue(supabase);

    await expect(getOrCreateWorkspaceId()).rejects.toThrow('Auth failed');
    expect(supabase.auth.getUser).toHaveBeenCalledTimes(1);
  });

  it('trả về user null và workspace null khi chưa đăng nhập', async () => {
    const supabase = buildSupabaseMock({ user: null });
    mockCreateClient.mockResolvedValue(supabase);

    const result = await getOrCreateWorkspaceId();
    expect(result).toEqual({ user: null, workspaceId: null });
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it('ghi nhận workspace hiện có nếu tồn tại', async () => {
    const user = { id: 'user-1', email: 'demo@example.com' };
    const supabase = buildSupabaseMock({ user, workspaceRecord: { id: 'ws-123' } });
    mockCreateClient.mockResolvedValue(supabase);

    const result = await getOrCreateWorkspaceId();
    expect(result).toEqual({ user, workspaceId: 'ws-123' });
    expect(supabase.queryBuilder.maybeSingle).toHaveBeenCalledTimes(1);
    expect(supabase.queryBuilder.insert).not.toHaveBeenCalled();
  });

  it('tạo workspace mới khi chưa có', async () => {
    const user = { id: 'user-2', email: 'new@example.com' };
    const supabase = buildSupabaseMock({
      user,
      workspaceRecord: null,
      workspaceError: { code: 'PGRST116' },
      createdWorkspace: { id: 'ws-new' },
    });
    mockCreateClient.mockResolvedValue(supabase);

    const result = await getOrCreateWorkspaceId();
    expect(result).toEqual({ user, workspaceId: 'ws-new' });
    expect(supabase.queryBuilder.insert).toHaveBeenCalledTimes(1);
    expect(supabase.insertSelect).toHaveBeenCalledTimes(1);
  });
});
