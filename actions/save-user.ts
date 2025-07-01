"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";

export async function saveUserToDb() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || !user.email) return null;

  const existingUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.given_name,
        image: user.picture,
        kindeId: user.id,
      },
    });
  }

  return true;
}
