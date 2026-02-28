import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface LessonProps {
    title: string;
    description: string | null;
    created_at: string;
}

export const LessonCard = ({ title, description, created_at }: LessonProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>{created_at}</p>
            </CardFooter>
        </Card>
    );
};
