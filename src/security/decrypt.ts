import { compare } from "bcrypt";

export async function decryptPassword (passwordToComapre: string, correctPassword: string) {
    const result = await compare(passwordToComapre, correctPassword)

    return result
}