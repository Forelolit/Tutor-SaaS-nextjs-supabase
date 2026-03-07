'use client';

import { use, useEffect, useState } from 'react';
import { getLessonStudents, getLessonWithTasks } from './action';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Separator, Spinner } from '@/components';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';
import { InviteStudentForm } from './(inviteStudent)/InviteStudentForm';
import { CreateTaskForm } from './(createTask)/createTaskForm';
import { useUserStore } from '@/stores';
import { UserData } from '@/types/userData';
import { LessonStudentsTable } from './(lessonStudentsTable)/LessonStudentsTable';
import { StudentsSubmissionForm } from './(taskSubmission)/(submissionForms)/StudentsSubmissionForm';

const LessonDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [lesson, setLesson] = useState<LessonDataWithTaskData>();
    const [loadingLesson, setLoadingLesson] = useState(false);
    const role = useUserStore((state) => state.user?.role);
    const [students, setStudents] = useState<UserData[]>([]);

    useEffect(() => {
        const asyncGetLessonWithTasks = async () => {
            setLoadingLesson(true);
            const res = await getLessonWithTasks(id);

            if (res.error) {
                console.error(res.error.message);
                alert(`Lesson error: ${res.error.message}`);
            }

            setLesson(res.data ?? undefined);
            setLoadingLesson(false);
        };

        asyncGetLessonWithTasks();
    }, [id]);

    useEffect(() => {
        const asyncGetLessonStudents = async () => {
            const res = await getLessonStudents(id);

            if (res) {
                setStudents(res);
            }
        };

        asyncGetLessonStudents();
    }, [id]);

    return (
        <div>
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Lesson Detail</h1>
                {role === 'teacher' && (
                    <p className="text-muted-foreground">Manage lesson information, students and tasks</p>
                )}
                {role === 'student' && <p className="text-muted-foreground">Work, complete tasks and have fun</p>}
            </div>

            {loadingLesson && (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            )}

            {lesson && !loadingLesson && (
                <>
                    {/* Lesson Info Card */}
                    <div className="flex gap-5">
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

                        <LessonStudentsTable students={students} />
                    </div>

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
                                    {role === 'student' && (
                                        <>
                                            <Separator />
                                            <CardFooter>
                                                <StudentsSubmissionForm taskId={task.id} />
                                            </CardFooter>
                                        </>
                                    )}
                                </Card>
                            ))}
                        </div>

                        {/* Sidebar */}
                        {role === 'teacher' && (
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
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonDetail;
