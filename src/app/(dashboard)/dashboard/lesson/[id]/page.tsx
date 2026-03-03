'use client';

import { use, useEffect, useState } from 'react';
import { getLessonWithTasks } from './action';
import { Card, CardContent, CardHeader, CardTitle, Separator, Spinner } from '@/components';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';
import { InviteStudentForm } from './(inviteStudent)/InviteStudentForm';
import { CreateTaskForm } from './(createTask)/createTaskForm';

const LessonDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [lesson, setLesson] = useState<LessonDataWithTaskData>();
    const [loadingLesson, setLoadingLesson] = useState(false);

    useEffect(() => {
        const asyncGetLessonWithTasks = async () => {
            setLoadingLesson(true);
            const res = await getLessonWithTasks(id);

            setLesson(res.data ?? undefined);
            setLoadingLesson(false);
        };

        asyncGetLessonWithTasks();
    }, [id]);

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Lesson Detail</h1>
                <p className="text-muted-foreground">Manage lesson information, students and tasks</p>
            </div>

            {loadingLesson && (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            )}

            {lesson && !loadingLesson && (
                <>
                    {/* Lesson Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">{lesson.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-muted-foreground">{lesson.description}</p>
                            <Separator />
                            <p className="text-sm text-muted-foreground">Created at: {lesson.created_at}</p>
                        </CardContent>
                    </Card>

                    {/* Main Grid */}
                    <div className="flex justify-between gap-8">
                        {/* Tasks Section */}
                        <div className="w-full max-w-120">
                            <h2 className="text-xl font-semibold tracking-tight">Tasks</h2>

                            {lesson.tasks.length === 0 && (
                                <p className="text-muted-foreground">No tasks created yet.</p>
                            )}

                            {lesson.tasks.map((task) => (
                                <Card key={task.id} className="hover:shadow-sm transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{task.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-muted-foreground">{task.description}</p>
                                        <p className="text-xs text-muted-foreground">{task.created_at}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="flex justify-between gap-8 w-full max-w-200">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Invite Student</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <InviteStudentForm lessonId={lesson.id} />
                                </CardContent>
                            </Card>

                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Create Task</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CreateTaskForm lessonId={lesson.id} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonDetail;
