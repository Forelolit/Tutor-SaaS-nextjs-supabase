import { Skeleton } from '@/components';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <Skeleton className="w-85 h-20" />
                <Skeleton className="w-120 h-20" />
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-10">
                <div className="h-fit grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </div>
                <div className="grid gap-4">
                    <Skeleton className="w-120 h-80" />
                    <Skeleton className="w-120 h-80" />
                    <Skeleton className="w-120 h-80" />
                </div>
            </div>
        </div>
    );
};

export default Loading;
