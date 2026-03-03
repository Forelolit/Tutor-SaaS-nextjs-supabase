import { UserData } from './userData';

export interface SessionData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    user: UserData;
}
