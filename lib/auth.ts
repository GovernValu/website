import { getServerSession } from 'next-auth';
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
