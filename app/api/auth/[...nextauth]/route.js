import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import Payments from "@/models/Payments";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    if (account.provider == 'github' || account.provider == 'google') {
      await connectDB();
      //check if the user already exists in he database
      const currentUser = await User.findOne({email : user.email})

      if (!currentUser){
        //create new user
        const username = user.email.split("@")[0];
        const newUser = new User({
          email: user.email,
          name: profile?.name || username,
          username: username,
        })
        await newUser.save(); 
      }
      return true;
      }
    },

  async session({ session, user, token }) {
      const dbuser = await User.findOne({email: session.user.email});
      session.user.name = dbuser.username;
      return session
    },
  }
};
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
// This exports the NextAuth handler for both GET and POST requests
// allowing it to handle authentication requests in your Next.js application. 