import prisma from "@/lib/prisma";
import Link from "next/link";
import ApplyForm from "./ApplyForm";
import { formatDistanceToNow } from "date-fns";
import { MoveLeft, Dot } from "lucide-react";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    return <p>No Job Found</p>;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-4"
          >
            <span>
              <MoveLeft />
            </span>
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company}</p>
          <div className="flex flex-col sm:flex sm:flex-row sm:items-center gap-4 text-gray-500 mb-6">
            <span>{job.location}</span>
            <span className="hidden sm:block">
              <Dot />
            </span>
            <span>{job.type}</span>
            {job.salary && (
              <>
                <span className="hidden sm:block">
                  <Dot />
                </span>
                <span className="text-gray-900 font-medium">{job.salary}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Posted by {job.postedBy.name}</span>
            <span className="mx-2">
              <Dot />
            </span>
            <span>
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="max-w-none prose">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <div className="text-gray-600 whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <ApplyForm jobId={jobId} />
        </div>
      </div>
    </div>
  );
}

export default Page;
