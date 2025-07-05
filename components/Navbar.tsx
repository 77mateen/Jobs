import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AlignJustify } from "lucide-react";

async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl h-16 mx-auto flex items-center justify-between px-5">
        <div>
          <div>
            <Link
              href={"/"}
              className="flex items-center justify-center gap-1 sm:gap-2"
            >
              <span>
                <BriefcaseBusiness size={30} />
              </span>
              <span className=" font-bold text-lg">Job Board</span>
            </Link>
          </div>
        </div>

        <div className="sm:hidden dropdown dropdown-end bg-white">
          <div
            tabIndex={0}
            role="button"
            className="btn shadow-none px-1 py-1 border-none bg-white text-slate-950"
          >
            <AlignJustify />
          </div>
          <ul
            tabIndex={0}
            className="text-[16px] space-y-3 dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li className="text-right">
              <Link
                href={"/jobs/"}
                className="text-gray-600 hover:text-gray-900"
              >
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                href={"/jobs/post"}
                className="text-gray-600 hover:text-gray-900"
              >
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard"}
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              {isUserAuthenticated ? (
                <LogoutLink className="text-red-600">Logout</LogoutLink>
              ) : (
                <LoginLink className="text-indigo-600">Login</LoginLink>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-7 items-center text-sm">
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
            <LogoutLink className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md">
              Logout
            </LogoutLink>
          ) : (
            <LoginLink className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md">
              Login
            </LoginLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
