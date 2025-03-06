import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }
    @Post('login')
    login(@Body() dto: AuthDto) {

        return this.service.login(dto)
    }

    signup() {
        return 'signup '
    }

    logout() {
        return 'logout'
    }
}