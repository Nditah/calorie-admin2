import { User } from './user';

export interface Food {
    id: string;
    type: string; // enum: ["DEFAULT", "CUSTOM"]
    category: string; // enum: ["FOOD", "DRINK"]
    name: string;
    description: string;
    quantity: number;
    water: number;
    calories: number;
    carbohydrate: number;
    protein: number;
    fats: number;
    fibre: number;
    nutrients: Array<any>;
    ph: number;
    image: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
