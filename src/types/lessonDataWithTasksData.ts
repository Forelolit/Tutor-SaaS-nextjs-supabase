import { LessonData } from './lessonData';
import { TaskData } from './taskData';

export interface LessonDataWithTaskData extends LessonData {
    tasks: TaskData[];
}
