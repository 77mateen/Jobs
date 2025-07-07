"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type PostJobResult = {
  success: boolean;
};

export default async function createJob(
  prevState: PostJobResult,
  formData: FormData
): Promise<PostJobResult> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const salary = formData.get("salary") as string;

  await prisma.job.create({
    data: {
      title,
      company,
      location,
      type,
      description,
      salary,
      postedBy: {
        connect: {
          clerkId: userId,
        },
      },
    },
  });

  return { success: true };
}
