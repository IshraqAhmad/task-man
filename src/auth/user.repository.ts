
import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import { AuthCredentialDto } from "./dto/aut.credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.password = password;

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
}
