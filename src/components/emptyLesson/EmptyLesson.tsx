import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components';
import { ArrowUpRightIcon, BookMarked } from 'lucide-react';

export const EmptyLesson = () => {
    return (
        <Empty>
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
                <Button>Create Project</Button>
            </EmptyContent>
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
                <a href="#">
                    Learn More <ArrowUpRightIcon />
                </a>
            </Button>
        </Empty>
    );
};
