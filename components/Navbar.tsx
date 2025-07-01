import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl h-16 mx-auto flex items-center justify-between">
        <div>
          <div>
            <Link href={"/"} className="flex items-center justify-center gap-3">
              <BriefcaseBusiness />
              <span className="font-bold text-lg">Job Board</span>
            </Link>
          </div>
        </div>

        <div className="flex gap-7 text-sm">
          <Link href={"/jobs/"} className="text-gray-600 hover:text-gray-900">
            Browse Jobs
          </Link>
          <Link
            href={"/jobs/post"}
            className="text-gray-600 hover:text-gray-900"
          >
            Post a Job
          </Link>
          <Link
            href={"/dashboard"}
            className="text-gray-600 hover:text-gray-900"
          >
            Dashboard
          </Link>
          {isUserAuthenticated ? (
            <LogoutLink>Logout</LogoutLink>
          ) : (
            <LoginLink>Login</LoginLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
