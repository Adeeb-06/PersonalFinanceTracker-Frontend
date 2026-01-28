import axios from "axios";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

interface User {
    email: string;
    password: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: "Credentials",
        credentials:{
            email: { label: "email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req){
           const {email, password} = credentials as User;
            const res = await axios.get("http://localhost:9000/api/users")
            const user = res.data.find((user: User) => user.email === email);

            if(user){
               const isPasswordValid = await bcrypt.compare(password , user.password);
               if(isPasswordValid){
                   return user;
               }
            }

            return null;
        }
    }
  
  )

  ],

  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }