import bcrypt from "bcrypt";

export const users = [
  {
    id: "1",
    username: "admin",
    passwordHash: bcrypt.hashSync("4gD$4fT$44", 10),
    role: "admin",
  },
  {
    id: "2",
    username: "employee",
    passwordHash: bcrypt.hashSync("Ff443f43R$$", 10),
    role: "employee",
  },
];