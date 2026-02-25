import { Skeleton } from '@/components';

const Loading = () => {
    return (
        <>
            <Skeleton className="w-2xs h-20 rounded-2xl mb-5" />
            <Skeleton className="w-2xs h-20 rounded-2xl mb-2" />
            <Skeleton className="w-2xs h-20 rounded-2xl" />
        </>
    );
};

export default Loading;
