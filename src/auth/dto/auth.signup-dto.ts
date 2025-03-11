import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class AuthSignupDto {
    // @IsString()
    // @IsNotEmpty()
    // @IsEmail()
    // email: string;
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters.' })
    password: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}