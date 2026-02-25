import { GetUsers } from '@/app/api/students/route';
import { create } from 'zustand';

interface Student {
    id: string;
    firstName: string;
    email: string;
    subject: string;
    createdAt: string;
    gender: 'Man' | 'Woman' | 'Unset';
}

interface StudentsState {
    students: Student[];
    addStudent: (student: Student) => void;
    removeStudent: (id: string) => void;
    fetchStudents: () => Promise<void>;
}

export const useStudentsStore = create<StudentsState>((set) => ({
    students: [],

    addStudent: (student) =>
        set((state) => ({
            students: [student, ...state.students.slice(10)],
        })),

    removeStudent: (id) =>
        set((state) => ({
            students: state.students.filter((s) => s.id !== id),
        })),

    fetchStudents: async () => {
        const users = await GetUsers();
        const students = users.users;
        return set({ students });
    },
}));
