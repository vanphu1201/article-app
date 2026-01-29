import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from 'md5';

export const resolversUser = {
    Mutation: {
        registerUser: async (_, args) => {
            const { user } = args;
            
            const existEmail = await User.findOne({
                email: user.email,
                deleted: false
            });

            if (existEmail) {
                return {
                    code: 400,
                    message: "Email da ton tai!"
                }
            }

            user.password = md5(user.password);
            user.token = generateRandomString(30);

            const newUser = new User(user);
            const data = await newUser.save();

            return {
                code: 200,
                message: "Dang ky tai khoan thanh cong!",
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                token: data.token,
                

            }
        },
    }
}