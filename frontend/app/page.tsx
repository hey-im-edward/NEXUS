import { redirect } from 'next/navigation';

/**
 * NEXUS Platform - Homepage
 * Redirects authenticated users to dashboard, others to login
 */
export default function HomePage() {
  // TODO: Check auth status and redirect accordingly
  // For now, redirect to login
  redirect('/login');
}
