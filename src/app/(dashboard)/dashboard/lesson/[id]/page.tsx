'use client';

import { use } from 'react';
import { useGetLessonStudents, useGetLessonWithTasks } from './action';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, ScrollArea, Separator, Spinner } from '@/components';
import { InviteStudentForm } from './(inviteStudent)/InviteStudentForm';
import { CreateTaskForm } from './(createTask)/createTaskForm';
import { useUserStore } from '@/stores';
import { StudentsSubmissionForm } from './(taskSubmission)/StudentsSubmissionForm';
import { getCreatedAtSubDays } from '@/lib/helpers/getCreatedAtSubDays';

const LessonDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const role = useUserStore((state) => state.user?.role);
    const { data: lessonDetail, isLoading: loadingLessonDetail } = useGetLessonWithTasks(id);
    const { data: students, isLoading: studentsLoading } = useGetLessonStudents(id);

    return (
        <div>
            <div className="mb-5">
                <h1>{lessonDetail?.title}</h1>
                {lessonDetail?.description}
                {lessonDetail?.created_at && <p>Created: {getCreatedAtSubDays(lessonDetail.created_at)}</p>}
            </div>

            {loadingLessonDetail && (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            )}

            {lessonDetail && (
                <>
                    {role === 'teacher' && (
                        <div className="grid grid-cols-3 gap-8 w-full mb-8">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Invite Student</CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent>
                                    <InviteStudentForm lessonId={lessonDetail.id} />
                                </CardContent>
                            </Card>

                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Create Task</CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent>
                                    <CreateTaskForm lessonId={lessonDetail.id} />
                                </CardContent>
                            </Card>

                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Field</CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent>Something</CardContent>
                            </Card>
                        </div>
                    )}

                    <div className="flex justify-between items-start">
                        <div className="w-full max-w-120">
                            {lessonDetail.tasks.length === 0 && <p>No tasks created yet.</p>}

                            {lessonDetail.tasks.map((task) => (
                                <Card key={task.id} className="hover:shadow-sm transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{task.title}</CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="space-y-2">
                                        <p>{task.description}</p>

                                        <div className="flex gap-10 text-xs text-muted-foreground">
                                            <span>Created: {getCreatedAtSubDays(task.created_at)}</span>
                                        </div>
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

                        <Card className="w-full max-w-120">
                            <CardHeader>
                                <CardTitle>Students list</CardTitle>
                            </CardHeader>

                            <Separator />

                            <CardContent>
                                {!students?.length && !studentsLoading ? (
                                    <div className="text-center">No students</div>
                                ) : (
                                    <ScrollArea className="h-50 pr-3">
                                        <Separator />
                                        <ul className="grid gap-2 my-3">
                                            {students?.map((s) => (
                                                <li key={s.id} className="grid gap-1 border p-4 rounded-xl">
                                                    <span>First name: {s.first_name}</span>
                                                    <span>Last name: {s.last_name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Separator />
                                    </ScrollArea>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonDetail;
