import { Database } from './database.types';

export type TaskSubmissionsData = Database['public']['Tables']['task_submissions']['Row'];

export type SubmittionStatus = Database['public']['Enums']['submission_status'];
