import userAccount from "../models/user_account";
import bcrypt from "bcrypt";

interface UserRepository {
    insert(user_account: userAccount): Promise<userAccount>;
    findOne (loginid : string) : Promise<userAccount| null>;

}

class UserRepositoryImpl implements UserRepository {
    async insert(user_account: userAccount): Promise<userAccount> { 
        try {
            user_account.loginid = user_account.name
            user_account.password = await bcrypt.hash(user_account.password , 16)
            console.log(user_account.password)

            
            return await userAccount.create({
                loginid   : user_account.loginid
                ,password : user_account.password
                ,name     : user_account.name
            })
        } catch (error) {
            throw new Error("Failed to create user_account")
        }
    }

    async findOne(loginid: string): Promise<userAccount| null> {
        return await userAccount.findOne({where: {loginid : loginid , enable : true} })
    }

}

export default new UserRepositoryImpl();