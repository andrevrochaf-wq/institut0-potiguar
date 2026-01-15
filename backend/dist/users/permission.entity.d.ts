import { Role } from './role.entity';
export declare class Permission {
    id: string;
    module: string;
    action: string;
    key: string;
    description: string | null;
    createdAt: Date;
    roles: Role[];
}
