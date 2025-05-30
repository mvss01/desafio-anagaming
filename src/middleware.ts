// middleware.ts
import { withAuth } from "next-auth/middleware";


export default withAuth({
    pages: {
        signIn: "/",
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: ["/home/:path*", "/details/:sport/:odd/:path*"],
};
