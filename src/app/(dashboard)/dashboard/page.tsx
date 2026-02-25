'use client';

import { Button, Input, Separator } from '@/components';
import { useStudentsStore } from '@/app/api/students/useStudentsStore';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
    const { students, fetchStudents, addStudent, removeStudent } = useStudentsStore();

    const [firstName, setFirstName] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleAdd = () => {
        if (!firstName || !subject) return;

        addStudent({
            id: crypto.randomUUID(),
            firstName,
            email: `${firstName}@mail.com`,
            subject,
            createdAt: new Date().toLocaleDateString(),
            gender: 'Unset',
        });

        setFirstName('');
        setSubject('');
    };

    return (
        <div className="mt-10 p-5 grid gap-4 border border-neutral-800 rounded-2xl w-screen max-w-2xl justify-self-center">
            <h1 className="text-2xl mb-2">Dashboard</h1>

            <Input placeholder="Student name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />

            <Button onClick={handleAdd}>Add student</Button>

            {students.map((student) => (
                <div key={student.id} className="p-5 grid gap-2 border border-neutral-800 rounded-2xl">
                    <h3>Firstname - {student.firstName}</h3>
                    <Separator />
                    <p>Gender - {student.gender}</p>
                    <Separator />
                    <p>Mail - {student.email}</p>
                    <Separator />
                    <p>Added date - {student.createdAt}</p>
                    <Separator />

                    <Button variant={'destructive'} onClick={() => removeStudent(student.id)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default DashboardPage;
