import bcrypt from "bcryptjs";

const saltRound = 10;

export const comparePassword = async (password: string, dbPassword: string) => {
  return await bcrypt.compare(password, dbPassword);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRound);
};
