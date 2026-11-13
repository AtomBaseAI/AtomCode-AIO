import { getAllCourses } from "@/data/courses"
import { CourseTableSchema } from "@/schemas/course-schema"
import { Book, DownloadCloud, PieChart, Trophy } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { TopbarTitle } from "@/components/topbar-title"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

async function fetchCourses() {
  const courses = await getAllCourses()
  return z.array(CourseTableSchema).parse(courses)
}


const Results = async () => {
  const coursesData = await fetchCourses()
  // console.log(coursesData)
  return (
    // Same content-span spacing rule as /admin/questions-groups:
    // p-4 (mobile) / md:p-8 (desktop) top + left padding, full-width column.
    <div className='flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full'>
      <TopbarTitle>Analysis</TopbarTitle>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          coursesData.length === 0 ? (
            <div className="col-span-full flex h-[60vh] flex-col items-center justify-center">
              <div className="shadow-lg rounded-md overflow-hidden w-[20rem] border hover:border-primary" >
                <div className="py-5 px-6 sm:px-8 flex flex-col justify-center items-center gap-5">
                  <Book className="h-10 w-10 text-yellow-400" />
                  No Courses Available !
                </div>
              </div>
            </div>
          ) : (
            coursesData.map((course) => (
              <div key={course.id} className="flex h-[9rem] flex-col rounded-md shadow-lg overflow-hidden border hover:border-primary" >
                <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-6 py-2">
                  <h2 title={course.title} className="line-clamp-3 text-sm sm:text-lg lg:text-xl font-semibold leading-snug">{course.title}</h2>
                </div>
                <div className='flex h-12 shrink-0 flex-row border-t-2'>
                  <TooltipProvider>
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <Link href={`/admin/results/${course.id}/leaderboard`} className='flex flex-row items-center justify-center w-full h-full border-r-2 dark:bg-yellow-600/10 hover:dark:bg-yellow-600/20 bg-yellow-300/10 hover:bg-yellow-300/20 text-sm font-bold '>
                          <Trophy className="h-5 w-5  text-yellow-500" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side='bottom' className='bg-yellow-500'>
                        <p className='z-50'>Leaderboard</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <Link href={`/admin/results/${course.id}/analysis`} className='flex flex-col items-center justify-center w-full h-full  border-r-2 dark:bg-primary/15 hover:dark:bg-primary/25 bg-primary/10 hover:bg-primary/20 text-sm font-bold'>
                          <PieChart className="h-5 w-5  text-purple-600" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side='bottom' className='bg-purple-500'>
                        <p className='z-50'>Performance</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <Link href={`/admin/results/${course.id}/completion`} className='flex flex-col items-center justify-center w-full h-full  dark:bg-green-600/10 bg-green-300/10 hover:dark:bg-green-600/20 hover:bg-green-300/20 text-sm font-bold'>
                          <DownloadCloud className="h-5 w-5  text-green-600" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side='bottom' className='bg-green-500'>
                        <p className='z-50'>Result Matrix</p>
                      </TooltipContent>
                    </Tooltip>

                  </TooltipProvider>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div >
  )
}

export default Results