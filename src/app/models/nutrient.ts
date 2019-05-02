import { User } from './user';
import { Food } from './food';

export class Nutrient {
    id: string;
    type: string; // enum: ["sub", "main"], required: true },
    category: string; // ["fat-based", "water-based", "macro-mineral", "trace-mineral", "class"],
    symbol: string;
    name: string;
    classification: string; // ["carbohydrate", "protein", "vitamin", "mineral", "fibre", "fats", "water"],
    foods?: Array<Food>; // [{ type: ObjectId, ref: "Food" }],
    source: string;
    use: string; // function
    description: string;
    deficiency: string; // Consequence
    excess: string; // Consequence
    ear: number; // Dietary Reference Intake - Estimated Average Requirements (EAR),
    limit: number; // Dietary Reference Intake - Tolerable Upper Intake Levels
    rda_male: number; // Recommended Dietary Allowances (RDAs) for Male
    rda_female: number; // Recommended Dietary Allowances (RDAs) for Female
    unit: string; // enum: ["mg", "iu"] },
    image: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;

    constructor(fields: any) {
// tslint:disable-next-line: forin
        for (const f in fields) {
            this[f] = fields[f];
        }
    }

}

export interface Nutrient {
    id: string;
    type: string; // enum: ["sub", "main"], required: true },
    category: string; // ["fat-based", "water-based", "macro-mineral", "trace-mineral", "class"],
    symbol: string;
    name: string;
    classification: string; // ["carbohydrate", "protein", "vitamin", "mineral", "fibre", "fats", "water"],
    foods?: Array<Food>; // [{ type: ObjectId, ref: "Food" }],
    source: string;
    use: string; // function
    description: string;
    deficiency: string; // Consequence
    excess: string; // Consequence
    ear: number; // Dietary Reference Intake - Estimated Average Requirements (EAR),
    limit: number; // Dietary Reference Intake - Tolerable Upper Intake Levels
    rda_male: number; // Recommended Dietary Allowances (RDAs) for Male
    rda_female: number; // Recommended Dietary Allowances (RDAs) for Female
    unit: string; // enum: ["mg", "iu"] },
    image: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;
}
