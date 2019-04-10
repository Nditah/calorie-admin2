import { Log } from './log';
import { Feedback } from './feedback';

export interface User {
    id: string;
    type: string; // ["ADMIN", "USER"]
    username: string;
    gender: string; // ["MALE", "FEMALE"]
    phone: string;
    address: string;
    country_iso2: string;
    email: string;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    password: string;
    original_mass: number;
    current_mass: number;
    desired_mass: number;
    height: number;
    lifestyle: string;
    logs: Array<Log>;
    feedbacks: Array<Feedback>;
    is_complete: boolean;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
