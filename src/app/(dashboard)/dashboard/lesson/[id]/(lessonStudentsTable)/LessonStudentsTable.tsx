'use client';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    TableCaption,
} from '@/components/index';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/index';
import { UserData } from '@/types/userData';
import { MoreHorizontalIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

interface LessonStudentsTableProps {
    students: UserData[] | null;
}

const actions = [
    {
        id: 1,
        label: 'Give task',
        action: (studentId: string) => console.log('giving task', studentId),
    },
    {
        id: 2,
        label: 'Remove student',
        action: (studentId: string) => console.log('deleting student', studentId),
    },
];

export const LessonStudentsTable = ({ students }: LessonStudentsTableProps) => {
    return (
        <Table>
            <TableCaption>Lesson students table.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>First name</TableHead>
                    <TableHead>Last name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students?.map((s) => (
                    <TableRow key={s.id}>
                        <TableCell>{s.first_name}</TableCell>
                        <TableCell>{s.last_name}</TableCell>
                        <TableCell>{s.role}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {actions.map((a) => (
                                        <Fragment key={a.id}>
                                            {a.id === 1 && (
                                                <DropdownMenuItem onClick={() => a.action(s.id)}>
                                                    {a.label}
                                                </DropdownMenuItem>
                                            )}
                                            {a.id === 2 && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() => a.action(s.id)}>
                                                        {a.label}
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </Fragment>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
