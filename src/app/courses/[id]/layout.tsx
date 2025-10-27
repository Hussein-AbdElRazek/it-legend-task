import CourseHeader from '@/features/course/components/course-header'
import { PlayerSizeProvider } from '@/contexts/player-size-context'

const layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) =>
{
  const { id } = await params;
  return (
    <PlayerSizeProvider>
      <div>
        <CourseHeader courseId={id} />
        <div className="px-4 py-4 grid grid-cols-1 gap-12 justify-start items-start lg:px-8 lg:gap-18 lg:grid-cols-[2fr_1fr]">
          {children}
        </div>
      </div>
    </PlayerSizeProvider>
  )
}

export default layout