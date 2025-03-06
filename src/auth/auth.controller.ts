import { Body, Controller, Delete, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.service.signup(dto)
    }

    login() {
        return 'signup '
    }

    logout() {
        return 'logout'
    }

    @Delete('delete')
    dropCollection() {
        return this.service.dropCollection()
    }
}