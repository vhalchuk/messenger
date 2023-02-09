import 'next-auth'

declare module 'next-auth' {
    interface User {
        name: string;
        email: string;
        image: string;
        username?: string;
    }

    interface Session {
        user: User;
    }
}
