import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // authorized function: Nextjs middleware
    // called before a request is completed
    authorized({ auth, request: { nextUrl } }) {
      // - auth property contains the user's session
      // - request property contains the incoming request
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // ensure AUTH_URL in .env has correct port
      const isOnApi = nextUrl.pathname.startsWith('/api'); // ensure to remove middleware `api` route matcher to also protect the api route
      
      console.log('> start with:', nextUrl.pathname, isOnDashboard, isOnApi);

      // protect the /dashboard and /api routes
      if (isOnDashboard || isOnApi) {
        if (isLoggedIn) {
          console.log('>> Logged in user:', auth?.user);
          return true;
        } else {
          console.log('>> Not logged in:', auth, auth?.user);
          return false; // Redirect unauthenticated users to login page
        }
      } else if (isLoggedIn) {
        // Redirect the user to dashboard after logged in successfully
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
