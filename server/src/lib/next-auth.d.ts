import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
        emailVerified: null | boolean;
        image: string;
        username?: string;
    }

    interface Session {
        user: User;
    }
}
