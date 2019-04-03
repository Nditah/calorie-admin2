export class LoginPayload {
    email: string;
    phone: string;
    password: string;
    type: LoginType;
}

export enum LoginType {
    EMAIL= 'EMAIL',
    PHONE= 'PHONE',
    OTP= 'OTP',
}
