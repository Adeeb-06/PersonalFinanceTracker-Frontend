import api from "@/lib/axios";
import bcrypt from "bcryptjs";
import NextAuth, { Account, AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

import Google from "next-auth/providers/google";

interface BackendUser {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as unknown as BackendUser;

        const res = await api.get(`api/users/${email}`);
        console.log(res.data);
        const user = res.data;

        if (!user) {
          throw new Error("No User Found with the Email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid Password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          balance: user.balance,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const { data } = await api.get(
            `api/users/${user.email}/exists`,
          );

          if (data.exists === false) {
            await api.post(`api/users/register`, {
              username: user.name,
              email: user.email,
              password: "google_oauth_no_password",
            });
          }
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.balance = user.balance;
        token.accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "1d" }
        );
      }
      

      if (account?.provider === "google" && user) {
        const res = await api.get(`api/users/${user.email}`);

        token.balance = res.data.balance;
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.balance = token.balance as number;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
