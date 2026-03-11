import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
import {
    LucideBookOpen,
    LucideCheckSquare,
    LucideClipboardList,
    LucideLayoutDashboard,
    LucideMessageSquare,
} from 'lucide-react';
import Link from 'next/link';

export const StudentHeroBlock = () => {
    return (
        <div className={'flex justify-center items-center h-[80vh] px-4'}>
            <Card className="w-full max-w-140">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">Welcome</CardTitle>
                    <p className="mt-2">
                        Your learning dashboard is ready. Track your lessons, complete tasks, and stay on top of your
                        progress!
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Link href={'/dashboard'}>
                        <Button className="flex items-center gap-2">
                            To dashboard <LucideLayoutDashboard />
                        </Button>
                    </Link>
                    <div className="flex-wrap justify-center mt-4 flex gap-6">
                        <div className="flex flex-col items-center">
                            <LucideBookOpen className="w-6 h-6 text-blue-500" />
                            <span className="text-sm">View Lessons</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideClipboardList className="w-6 h-6 text-purple-500" />
                            <span className="text-sm">Complete Tasks</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideMessageSquare className="w-6 h-6 text-yellow-500" />
                            <span className="text-sm">Ask Questions</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <LucideCheckSquare className="w-6 h-6 text-green-500" />
                            <span className="text-sm">Track Progress</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
