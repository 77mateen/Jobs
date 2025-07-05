import prisma from "@/lib/prisma";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default async function Home() {
  const latestJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div className="">
      <div className="text-center py-10 sm:py-16 mb-10 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find Your Dream Job
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 mb-6">
          Browse hundreds of job listings by title, type, and location.
        </p>
        <Link href={"/jobs"}>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-800 hover:shadow-md cursor-pointer">
            Browse Jobs
          </button>
        </Link>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">Recent Jobs</h2>
      <div className="max-w-7xl flex flex-col sm:flex-row justify-between gap-4">
        {latestJobs.map((job) => (
          <div key={job.id} className=" w-full bg-white p-5 rounded-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <p>{job.location}</p>
              <p>{job.type}</p>
            </div>
            <p className=" text-gray-600 mb-4 line-clamp-1">
              {job.description}
            </p>
            <Link
              href={`/jobs/${job.id}`}
              className="flex items-center gap-2 text-indigo-600"
            >
              <span>View details</span>
              <MoveRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
