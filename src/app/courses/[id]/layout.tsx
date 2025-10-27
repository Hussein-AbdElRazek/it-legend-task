import CourseHeader from '@/features/course/components/course-header'

const layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) =>
{
  const { id } = await params;
  return (
    <div>
      <CourseHeader courseId={id} />

      <div className="px-4 py-4 grid grid-cols-1 gap-12 justify-start items-start lg:px-8 lg:grid-cols-[2fr_1fr]  lg:gap-18">
        {children}
      </div>
    </div>
  )
}

export default layout