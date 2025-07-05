"use server";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type State = {
  success: boolean;
  message: string;
};

export async function applyJob(
  prevState: State,
  formData: FormData
): Promise<State> {
  const jobid = formData.get("jobId")?.toString();

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  const existingUser = await prisma.user.findUnique({
    where: {
      kindeId: userId,
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
        jobId: jobid,
        userId: existingUser?.id,
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
