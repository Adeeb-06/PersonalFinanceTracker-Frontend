import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      balance: number;
    } & DefaultSession["user"];
    accessToken: JWT;
  }

  interface User {
    id: string;
    balance: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    balance: number;
  }
}
