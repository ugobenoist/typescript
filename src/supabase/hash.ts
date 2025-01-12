import { hash,compare } from "bcrypt-ts";
 
export async function hashPassword(plainPassword: string): Promise<string> {
  return hash(plainPassword, 10).then((hashedPassword: string) => {
    return hashedPassword;
  });
}

export async function verifyPassword(
    plainPassword: string,
    hashedPassword: string
    ): Promise<boolean> {
    return compare(plainPassword, hashedPassword).then((isValid: boolean) => {
        return isValid;
    });
}