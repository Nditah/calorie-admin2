import { User } from './user';

export interface Image {
    id: string;
    name: string;
    url: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
