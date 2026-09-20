import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: { role?: string } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@fraudex.com" && credentials?.password === "password123") {
          return { id: "1", name: "Admin Fraudex", email: "admin@fraudex.com", role: "admin" };
        }
        if (credentials?.email === "user@fraudex.com" && credentials?.password === "user123") {
          return { id: "2", name: "Pengguna Biasa", email: "user@fraudex.com", role: "user" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/login", 
  },
  session: {
    strategy: "jwt", 
  },
  secret: "fraudex-rahasia-super-aman-123", 
});

export { handler as GET, handler as POST };