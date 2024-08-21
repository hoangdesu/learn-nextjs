import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from './app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (err) {
    console.error('Failed to fetch user:', err);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // we can list different login options here for providers eg. Google, Github
    // Credentials allows users to log in with a username and a password
    Credentials({
      async authorize(credentials) {
        console.log(
          '>> credentials inside authorize function in auth.ts:',
          credentials,
        );

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          console.log('>> parsed successful');

          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log('>> getUser:', user);

          if (!user) return null;

          // const passwordMatch = await bcrypt.compare(user.password, password); => This will NOT work
          // function compare(data: string | Buffer, encrypted: string)
          // NOTE: when using bcrypt's compare, the params order DOES matter. It's not simply comparing param1 === param2.
          // param1: plain-text password. param2: encrypted password

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            console.log('>> password matched');
            return user;
          } else {
            console.log('>> password DIDNT matched!');
            return null;
          }
        }

        console.error('>> Parse failed');
        console.error('Invalid credentials.');
        return null;
      },
    }),
  ],
});
