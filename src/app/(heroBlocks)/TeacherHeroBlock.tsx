import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index';
import { LucideFileText, LucideLayoutDashboard, LucideListTodo, LucideSquarePlus, LucideUsers } from 'lucide-react';
import Link from 'next/link';

export const TeacherHeroBlock = () => {
    return (
        <div className={'flex justify-center items-center h-[80vh] px-4'}>
            <Card className="w-full max-w-140">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">Welcome</CardTitle>
                    <p className="mt-2">Your personal dashboard awaits. Manage your tasks and track progress easily!</p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Link href={'/dashboard'}>
                        <Button className="flex items-center gap-2">
                            To dashboard <LucideLayoutDashboard />
                        </Button>
                    </Link>
                    <div className="flex-wrap justify-center mt-4 flex gap-6">
                        <div className="flex flex-col items-center">
                            <LucideUsers className="w-6 h-6 text-blue-500" />
                            <span className="text-sm">Invite students</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideSquarePlus className="w-6 h-6 text-purple-500" />
                            <span className="text-sm">Create lessons</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideListTodo className="w-6 h-6 text-yellow-500" />
                            <span className="text-sm">Give tasks</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideFileText className="w-6 h-6 text-green-500" />
                            <span className="text-sm">Review Submissions</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
