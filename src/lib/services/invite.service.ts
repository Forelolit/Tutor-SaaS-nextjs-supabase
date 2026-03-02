import { supabase } from '@/lib/supabase/client';

export async function acceptInvite(token: string) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { data: invite } = await supabase.from('lesson_invites').select('*').eq('token', token).single();

    if (!invite) throw new Error('Invite not found');
    if (invite.used_at) throw new Error('Invite already used');
    if (new Date(invite.expires_at) < new Date()) throw new Error('Invite expired');

    if (invite.invited_email !== user.email) throw new Error('Email mismatch');

    await supabase.from('lesson_students').insert({
        lesson_id: invite.lesson_id,
        student_id: user.id,
        status: 'active',
    });

    await supabase.from('lesson_invites').update({ used_at: new Date().toISOString() }).eq('id', invite.id);
}
