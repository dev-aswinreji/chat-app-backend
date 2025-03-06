import { Injectable } from "@nestjs/common";


@Injectable({})

export class AuthService {
    login(){
        return 'login success from servie layer'
    }
}