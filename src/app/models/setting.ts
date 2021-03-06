import { User } from './user';

export class Setting {
    id: string;
    name: string;
    access: string;
    value: string;
    category: string;
    description: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;
    
    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }
}

export interface Setting {
    id: string;
    name: string;
    access: string;
    value: string;
    category: string;
    description: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;
}