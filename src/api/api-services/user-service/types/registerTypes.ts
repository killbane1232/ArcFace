export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface RegisterResponseSuccess {
    id: number;
    username: string;
    loginSource: string;
    roles: string[];
}

export type RegisterResponse = RegisterResponseSuccess;