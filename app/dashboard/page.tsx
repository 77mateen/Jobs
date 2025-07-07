import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";

async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: {
        userId: existingUser?.id,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    }),

    prisma.job.findMany({
      where: {
        postedBy: {
          id: existingUser?.id,
        },
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc",
      },
    }),
  ]);
  return (
    <div className="max-w-8xl mx-auto px-2 sm:px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className=" flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
            <Link
              href={"/jobs/post"}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Post New Job
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {postedJobs.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                You haven&apos;t posted any jobs yet.
              </p>
            ) : (
              postedJobs.map((job) => (
                <div key={job.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <div className="flex flex-col items-start w-full justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{job.location}</span>
                          <span>
                            <Dot />
                          </span>
                          <span>{job.type}</span>
                        </div>

                        <div className="mt-4 flex justify-end space-x-4">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 border-b-indigo-400"
                          >
                            View Job
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ">
                      <span className=" inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                        {job._count.applications} applications
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your Applications
          </h2>
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500 p-6">
                You haven&apos;t applied to any jobs yet
              </p>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {application.job.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {application.job.company}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{application.job.location}</span>
                        <span>
                          <Dot />
                        </span>
                        <span>{application.job.type}</span>
                        <span>
                          <Dot />
                        </span>
                        <span>
                          {formatDistanceToNow(
                            new Date(application.job.postedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
