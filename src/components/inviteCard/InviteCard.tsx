import { InviteData } from '@/types/inviteData';
import { Trash2 } from 'lucide-react';
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
} from '@/components';

interface InviteCardProps {
    className?: string;
    invite: InviteData;
    deleteInvite?: () => void;
    acceptInvite?: () => void;
}

export const InviteCard = ({ className = '', invite, deleteInvite, acceptInvite }: InviteCardProps) => {
    return (
        <Card className={className} key={invite.id}>
            <CardHeader>
                <CardTitle>Lesson id: {invite.lesson_id}</CardTitle>
                <CardDescription>Created by: {invite.created_by}</CardDescription>
                {deleteInvite && (
                    <CardAction>
                        <Button variant={'destructive'} onClick={deleteInvite}>
                            <Trash2 />
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                <div>Invited email: {invite.invited_email}</div>
                <div>Created at: {invite.created_at}</div>
            </CardContent>
            {acceptInvite && (
                <>
                    <Separator />
                    <CardFooter>
                        <Button type="button" onClick={acceptInvite} className="w-full">
                            Accept invite
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};
