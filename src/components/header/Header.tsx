import Profile from '@/app/profile/page';
import { Separator } from '@/components';

export const Header = () => {
    return (
        <header>
            <div className="container mx-auto flex justify-between items-center">
                <h2>
                    Tutor SaaS <small>in development</small>
                </h2>
                <Profile />
            </div>
            <Separator />
        </header>
    );
};
