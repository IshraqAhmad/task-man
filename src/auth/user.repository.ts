
import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import { AuthCredentialDto } from "./dto/aut.credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<void> {
        const { username, password } = authCredentialDto;
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        console.log(user.password);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists.');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        
    }

    private async hashPassword(password: string, salt: string) : Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
