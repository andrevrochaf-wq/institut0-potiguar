import { Role } from './role.entity';
export declare class User {
    id: string;
    email: string;
    fullName: string;
    passwordHash: string;
    active: boolean;
    primaryRole: string | null;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date | null;
    roles: Role[];
}
