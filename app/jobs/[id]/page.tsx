import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }
  return <div></div>;
}

export default page;
