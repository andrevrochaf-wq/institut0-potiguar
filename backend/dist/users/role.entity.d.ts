import { User } from './user.entity';
import { Permission } from './permission.entity';
export declare class Role {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    users: User[];
    permissions: Permission[];
}
