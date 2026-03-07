import { LessonData } from './lessonData';

export type LessonDataCreate = Pick<LessonData, 'title' | 'description'>;
