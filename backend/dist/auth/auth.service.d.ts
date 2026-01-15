import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            primaryRole: string | null;
            roles: string[];
            permissions: string[];
        };
    }>;
    register(data: {
        email: string;
        fullName: string;
        password: string;
    }): Promise<{
        id: string;
    }>;
}
