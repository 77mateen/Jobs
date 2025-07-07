"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function saveUserToDb() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) throw new Error("User not authenticated");

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user?.emailAddresses[0]?.emailAddress || "no email",
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        image: user?.imageUrl,
        clerkId: userId,
      },
    });
  }

  return true;
}
