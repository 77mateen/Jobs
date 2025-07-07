"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type State = {
  success: boolean;
  message: string;
};

export async function applyJob(
  prevState: State,
  formData: FormData
): Promise<State> {
  const jobid = formData.get("jobId")?.toString();

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  try {
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobid,
        userId: existingUser?.id,
      },
    });

    if (existingApplication) {
      return {
        success: false,
        message: "You already have applied for this job",
      };
    }

    await prisma.application.create({
      data: {
        jobId: jobid as string,
        userId: existingUser?.id as string,
      },
    });

    return {
      success: true,
      message: "Application submitted successfully!",
    };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Failed to apply" };
  }
}
