import { compare } from "bcrypt";

export async function decryptPassword(
  passwordToComapre: string,
  correctPassword: string
) {
  return await compare(passwordToComapre, correctPassword);
}
