import { createClient } from './server'

export async function getOrCreateWorkspaceId() {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    return { user: null, workspaceId: null }
  }

  const {
    data: existingWorkspace,
    error: workspaceError,
  } = await supabase
    .from('workspaces')
    .select('id')
    .eq('owner_id', user.id)
    .limit(1)
    .maybeSingle()

  if (workspaceError && workspaceError.code !== 'PGRST116') {
    throw workspaceError
  }

  let workspaceId = existingWorkspace?.id ?? null

  if (!workspaceId) {
    const {
      data: newWorkspace,
      error: createWorkspaceError,
    } = await supabase
      .from('workspaces')
      .insert({
        name: user.email ? `${user.email}'s Workspace` : 'My Workspace',
        owner_id: user.id,
      })
      .select('id')
      .single()

    if (createWorkspaceError) {
      throw createWorkspaceError
    }

    workspaceId = newWorkspace.id
  }

  return { user, workspaceId }
}
