'use client';

import { Button } from '@/components';
import { googleSignIn } from './actions';

export default function LoginGoogleButton() {
    const signInHandler = async () => {
        await googleSignIn();
    };

    return <Button onClick={signInHandler}>Login with Google</Button>;
}
