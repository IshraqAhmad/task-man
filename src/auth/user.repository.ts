
import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import { AuthCredentialDto } from "./dto/aut.credential.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.password = password;
        await user.save();
    }
}
