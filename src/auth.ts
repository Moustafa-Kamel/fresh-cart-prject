import NextAuth from "next-auth";
import { authConfig } from "./lib/authjs/authjs";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
