import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return !!session?.user;
}

export async function isAdmin(): Promise<boolean> {
    const session = await getSession();
    return session?.user?.role === 'admin';
}

/**
 * Guard for admin-only API handlers. Returns a 401 response when the caller
 * has no admin session, or null when the request may proceed:
 *
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
    if (await isAdmin()) return null;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
