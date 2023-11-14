export interface LoginRequest {
    login: string;
    password: string;
}

interface LoginResponseSuccess {
    login: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
}

export type LoginResponse = LoginResponseSuccess;