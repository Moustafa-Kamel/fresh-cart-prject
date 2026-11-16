import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "@/lib/api/auth";
import { loginSchema } from "../validations/auth";

declare module "next-auth" {
  interface User {
    tkn: string | null;
  }
}

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    Credentials({
      name: "fresh Cart",
      credentials: {
        email: { type: "email", placeholder: "enter your email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        try {
          const data = await signIn(parsed.data);
          if (data) {
            const { role: _role, ...userData } = data.user;
            return { tkn: data.token, ...userData };
          } else {
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.credentialToken = user.tkn;
        console.log(user.tkn);
      }

      return token;
    },
    session(param) {
      return param.session;
    },
  },
};
