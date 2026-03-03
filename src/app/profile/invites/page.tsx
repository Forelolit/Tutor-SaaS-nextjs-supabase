'use client';

import { useEffect, useState } from 'react';
import { getInvites } from './action';
import { InviteData } from '@/types/inviteData';
import {
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Separator,
    Spinner,
} from '@/components';
import { Trash2 } from 'lucide-react';

const Invites = () => {
    const [invites, setInvites] = useState<InviteData[] | null>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const asyncGetInvites = async () => {
            setLoading(true);
            const res = await getInvites();

            if (res.error) {
                setLoading(false);
                return;
            }

            setInvites(res.data);
            setLoading(false);
        };

        asyncGetInvites();
    }, []);

    const acceptHandler = (inviteId: string) => {
        if (!inviteId) {
            return console.error('Error, invite id not provided');
        }
        alert('Invite accepted!');
        const deleteInvite = invites?.filter((invite) => invite.id !== inviteId);
        setInvites(deleteInvite ?? []);
    };

    const deleteHandler = (inviteId: string) => {
        if (!inviteId) {
            return console.error('Error, invite id not provided');
        }
        alert('Deleting invite...');
        const deleteInvite = invites?.filter((invite) => invite.id !== inviteId);
        setInvites(deleteInvite ?? []);
    };

    return (
        <section className="h-[60vh]">
            <h1>Invites</h1>

            {loading && (
                <div className="flex h-full justify-center items-center">
                    <Spinner className="size-15" />
                </div>
            )}
            <div className="grid grid-cols-3 gap-4">
                {invites?.map((invite) => (
                    <Card className="" key={invite.id}>
                        <CardHeader>
                            <CardTitle>Lesson id: {invite.lesson_id}</CardTitle>
                            <CardDescription>Created by: {invite.created_by}</CardDescription>
                            <CardAction>
                                <Button variant={'destructive'} onClick={() => deleteHandler(invite.id)}>
                                    <Trash2 />
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="">Invited email: {invite.invited_email}</div>
                            <div className="">Created at: {invite.created_at}</div>
                        </CardContent>
                        <Separator />
                        <CardFooter>
                            <Button type="button" onClick={() => acceptHandler(invite.id)} className="w-full">
                                Accept invite
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {invites?.length === 0 && !loading && (
                <div className="">
                    <h2 className="text-center">You not have invites yet...</h2>
                </div>
            )}
        </section>
    );
};

export default Invites;
