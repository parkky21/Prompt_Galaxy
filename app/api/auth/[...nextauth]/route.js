import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { neon } from '@neondatabase/serverless';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        // Retrieve the user's ID from the database
        const result = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
        if (result.length > 0) {
          session.user.id = result[0].id; // Assign user ID to the session
          console.log(session.user.id);
        } else {
          console.log('No user found with email:', session.user.email);
        }

        return session;
      } catch (error) {
        console.error('Error fetching session user:', error.message);
        return session; // Return session without modification if error occurs
      }
    },

    async signIn({ account, profile }) {
      try {
        const sql = neon(process.env.DATABASE_URL);

        // Check if the user already exists
        const existingUser = await sql`SELECT * FROM users WHERE email = ${profile.email}`;
        if (existingUser.length === 0) {
          // Create a new user if they do not exist
          await sql`INSERT INTO users (email, username, image) 
                    VALUES (${profile.email}, ${profile.name.replace(/\s+/g, '').toLowerCase()}, ${profile.picture})`;
          console.log('New user created with email:', profile.email);
        } else {
          console.log('User already exists with email:', profile.email);
        }

        return true;
      } catch (error) {
        console.error('Error during sign-in process:', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
