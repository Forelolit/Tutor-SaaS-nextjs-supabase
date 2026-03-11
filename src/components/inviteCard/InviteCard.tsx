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
import { student_lesson_invites_view } from '@/types/inviteView';
import { getCreatedAtSubDays } from '@/lib/helpers/getCreatedAtSubDays';

interface InviteCardProps {
    className?: string;
    invite: student_lesson_invites_view;
    deleteInvite?: () => void;
    acceptInvite?: () => void;
}

export const InviteCard = ({
    className = '',
    invite: { title, description, created_at },
    deleteInvite,
    acceptInvite,
}: InviteCardProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Lesson: {title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                {deleteInvite && (
                    <CardAction>
                        <Button variant={'destructive'} onClick={deleteInvite}>
                            <Trash2 />
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>Invite created: {getCreatedAtSubDays(created_at)} </CardContent>
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
