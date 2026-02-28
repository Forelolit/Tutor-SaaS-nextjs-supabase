import { Skeleton } from '@/components';

const Loading = () => {
    return (
        <>
            <Skeleton className="w-full h-50 rounded-2xl mb-4" />
            <Skeleton className="w-full h-50 rounded-2xl mb-4" />
            <Skeleton className="w-full h-50 rounded-2xl" />
        </>
    );
};

export default Loading;
