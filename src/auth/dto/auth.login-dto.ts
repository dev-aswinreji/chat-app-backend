import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters.' })
    password: string;
}