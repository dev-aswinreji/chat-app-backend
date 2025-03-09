import { Body, Controller, Delete, Get, HttpCode, Post, Res, Response } from "@nestjs/common";
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
    async login(@Body() dto: AuthLoginDto, @Res({ passthrough: true }) res: any) {
        const { access_token } = await this.service.login(dto)
        console.log(access_token, 'inside controller ');
        res.cookie('access_token', access_token, {
            maxAge: 30 * 1000,
            sameSite: 'strict',
            httpOnly: true,
        })
        console.log('before retrn token');
        return access_token
    }

    @HttpCode(200)
    @Post('logout')
    logout(@Res({ passthrough: true }) res: any) {
        res.cookie('access_token', "", {
            maxAge: 0
        })
        return this.service.logout()
    }

    @Delete('delete')
    dropCollection() {
        return this.service.dropCollection()
    }
}