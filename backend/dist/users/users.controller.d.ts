import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(): Promise<import("./user.entity").User[]>;
    create(body: CreateUserDto): Promise<import("./user.entity").User>;
    deactivate(id: string): Promise<{
        status: string;
    }>;
    assignRole(id: string, roleName: string): Promise<{
        status: string;
    }>;
}
