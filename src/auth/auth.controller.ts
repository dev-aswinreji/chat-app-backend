import { Body, Controller, Delete, HttpCode, Post, Response, ResponseDecoratorOptions } from "@nestjs/common";
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
    login(@Body() dto: AuthLoginDto, @Response() res: any) {
        const token = this.service.login(dto)
        res.cookie('jwt', token, {
            maxAge: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        })
        return token

    }

    logout() {
        return 'logout'
    }

    @Delete('delete')
    dropCollection() {
        return this.service.dropCollection()
    }
}