import Image from 'next/image'
import { Terminal } from 'lucide-react'

/**
 * Language logo tile for course-related rows/cards (falls back to a
 * terminal glyph). Shared by the courses page and the dashboard
 * "My Courses" panel so both render identical iconography.
 */
function CourseLanguageIcon({ language, tileClass }: { language: string | null; tileClass?: string }) {
  const src =
    language === 'c' ? '/Lang/c.svg'
      : language === 'cpp' ? '/Lang/cpp.svg'
        : language === 'java' ? '/Lang/java.svg'
          : language === 'python' ? '/Lang/python.svg'
            : null
  if (src) {
    return (
      <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-muted ${tileClass ?? ''}`}>
        <Image src={src} alt={`${language ?? 'course'} logo`} width={28} height={28} className="object-contain" />
      </span>
    )
  }
  return (
    <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-500/10 ${tileClass ?? ''}`}>
      <Terminal className='h-6 w-6 text-primary' />
    </span>
  )
}

export default CourseLanguageIcon
