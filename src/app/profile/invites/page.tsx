'use client';

import { InviteCard } from '@/components/inviteCard/InviteCard';
import { useInvitesStore } from '@/stores/invites/useInvitesStore';
import { acceptInvite } from './action';

const Invites = () => {
    const { invites, clearInvite } = useInvitesStore();

    const acceptHandler = async (inviteId: string, inviteToken: string) => {
        if (!inviteId) {
            return console.error('Error, invite id not provided');
        }
        const res = await acceptInvite(inviteToken);

        if (res.error) {
            console.error(res.error.message);
            alert(`Invite error: ${res.error.message}`);
        }
        if (res.data) {
            alert(`Invite ${res.data?.lesson_id} accepted!`);
            clearInvite(inviteId);
        }
    };

    const deleteHandler = (inviteId: string) => {
        if (!inviteId) {
            return console.error('Error, invite id not provided');
        }
        alert('Deleting invite...');
        clearInvite(inviteId);
    };

    return (
        <section className="h-[60vh]">
            <h1>Invites</h1>

            <div className="grid grid-cols-3 gap-4">
                {invites?.map((invite) => (
                    <InviteCard
                        key={invite.id}
                        acceptInvite={() => acceptHandler(invite.id, invite.token)}
                        deleteInvite={() => deleteHandler(invite.id)}
                        invite={invite}
                    />
                ))}
            </div>

            {invites?.length === 0 && (
                <div className="">
                    <h2 className="text-center">You not have invites yet...</h2>
                </div>
            )}
        </section>
    );
};

export default Invites;
