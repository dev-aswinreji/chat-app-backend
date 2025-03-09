import { Body, Controller, Delete, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignupDto } from "./dto";
import { AuthLoginDto } from "./dto/auth.login-dto";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }
    @Post('signup')
    signup(@Body() dto: AuthSignupDto) {
        return this.service.signup(dto)
    }

    @HttpCode(200)
    @Post('login')
    login(@Body() dto: AuthLoginDto) {
        return this.service.login(dto)
    }

    @HttpCode(200)
    @Get('logout')
    logout() {
        return this.service.logout()
    }

    @Delete('delete')
    dropCollection() {
        return this.service.dropCollection()
    }
}