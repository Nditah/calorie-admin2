import { User } from './user';
import { Food } from './food';
import { Exercise } from './exercise';

export interface Log {
    id: string;
    day: Date;
    food: Array<{ meal: Food, quantity: number }>;
    exercise: Array<{ activity: Exercise, duration: number }>;
    remark: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
