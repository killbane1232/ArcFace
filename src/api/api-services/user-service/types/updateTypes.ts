export interface UpdateRequest {
    token: string;
    username: string;
    roles: string[];
}

interface UpdateResponseSuccess {
    username: string;
    roles: string[];
}

export type UpdateResponse = UpdateResponseSuccess;