import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
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
    register(body: RegisterDto): Promise<{
        id: string;
    }>;
}
