import { hash } from "bcrypt";

const saltRounds = 8;

export async function encrypt(password: string) {
  const passwordEncrypted = await hash(password, saltRounds);

  return passwordEncrypted;
}
