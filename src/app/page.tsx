import { EmptyLesson } from '@/components/emptyLesson/EmptyLesson';
import { LessonCard } from '@/components/lessonCard/LessonCard';

const arr = [1, 2, 3, 4, 5, 6];

export default function Home() {
    return (
        <section>
            <h1>Main page</h1>

            <EmptyLesson />

            <div className="grid grid-cols-3 gap-4">
                {arr.map((i) => (
                    <LessonCard key={i} />
                ))}
            </div>
        </section>
    );
}
