﻿import { User } from './user';
import { Nutrient } from './nutrient';

export class Food {
    id: string;
    type: string; // enum: ["DEFAULT", "CUSTOM"]
    category: string; // enum: ["FOOD", "DRINK"]
    name: string;
    description: string;
    ph?: number;
    water?: number;
    calories?: number;
    carbohydrate?: number;
    protein?: number;
    fats?: number;
    fibre?: number;
    nutrients?: Array<{nutrient: Nutrient, quantity: number}>;
    image?: string;
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

export interface Food {
    [prop: string]: any;
}
