import { Controller, Get } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    @Get('login')
    login() {
        return 'login success'
    }

    signup() {
        return 'signup '
    }

    logout() {
        return 'logout'
    }
}