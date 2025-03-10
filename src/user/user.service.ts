import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/interface';

@Injectable()
export class UserService {
    constructor(
        private readonly userModel: AuthService
    ) { }
    getUserForSidebar(user: User) {
        const loggedUserId = user.id
        return this.userModel.getUsersForSidebar(loggedUserId)
    }
}
