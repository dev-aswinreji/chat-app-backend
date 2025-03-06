import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }
    @Get('login')
    login() {
        return this.service.login()
    }

    signup() {
        return 'signup '
    }

    logout() {
        return 'logout'
    }
}