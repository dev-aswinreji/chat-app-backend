import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class DbService {
    constructor(private config: ConfigService) {
    }

    async activateDB() {
        const url = this.config.get('MONGODB_URL')
        console.log(url, 'url')
    }
}