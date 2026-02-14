import axios from "axios";
import bcrypt from "bcryptjs";
import NextAuth, { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as User;
        const res = await axios.get("http://localhost:9000/api/users");
        const user = res.data.find((u: User) => u.email === email);



        if (!user) {
          throw new Error("No User Found with the Email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid Password");
        }

        return {
          id: user._id.toString(), // REQUIRED
          email: user.email,
          name: user.username,
          balance: user.balance,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async signIn({ user, account }: { user: User; account: Account }) {
  try {
    if (account?.provider === "google") {
      const { data: exists } = await axios.get(
        `http://localhost:9000/api/users/${user.email}/exists`
      );

      if (!exists) {
        await axios.post(`http://localhost:9000/api/users/register`, {
          username: user.name,
          email: user.email,
          password: "google_oauth_no_password",
        });
      }
    }
    return true; // must always return
  } catch (err) {
    console.error(err);
    return false;
  }
}
,
    async jwt({ token, user , account}: { token: JWT; user?: User , account?: Account }) {


      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.balance = user.balance;
      }

      if(account?.provider === "google" && user) {

        const res = await axios.get(`http://localhost:9000/api/users/${user.email}`);
        token.email = user.email;
        token.id = user.id;
        token.balance = res.data.balance;
      }
    
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.balance = token.balance as number;
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
