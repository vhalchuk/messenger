import {signIn, signOut, useSession} from 'next-auth/react'

export default function Home() {
    const { data } = useSession();

    return (
        <div>
            {data?.user ? (
                <button onClick={() => signOut()}>
                    Sign out
                </button>
            ) : (
                <button onClick={() => signIn('google')}>
                    Sign in
                </button>
            )}
        </div>
    );
}
