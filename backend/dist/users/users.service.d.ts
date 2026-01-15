import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly usersRepo;
    private readonly rolesRepo;
    constructor(usersRepo: Repository<User>, rolesRepo: Repository<Role>);
    findByEmail(email: string): Promise<User | null>;
    findByEmailWithRoles(email: string): Promise<User | null>;
    setLastLogin(userId: string): Promise<void>;
    listUsers(): Promise<User[]>;
    createUser(dto: CreateUserDto): Promise<User>;
    assignRole(userId: string, roleName: string): Promise<void>;
    deactivate(userId: string): Promise<void>;
}
