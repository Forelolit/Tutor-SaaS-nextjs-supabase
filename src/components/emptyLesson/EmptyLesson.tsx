import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components';
import { BookMarked } from 'lucide-react';
import Link from 'next/link';

export const EmptyLesson = () => {
    return (
        <Empty className="w-fit border">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BookMarked />
                </EmptyMedia>
                <EmptyTitle>No Lessons Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any projects yet. Get started by creating your first project.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Link href={'/dashboard'}>
                    <Button>Create Project</Button>
                </Link>
            </EmptyContent>
        </Empty>
    );
};
