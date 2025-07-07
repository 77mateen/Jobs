import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { AlignJustify } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

async function Navbar() {
  const { userId } = await auth();

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
              {userId ? (
                <SignOutButton>
                  <button className="text-red-700">Logout</button>
                </SignOutButton>
              ) : (
                <Link
                  href={"/sign-in"}
                  className="bg-indigo-600 text-white px-4 py-2 shadow-sm cursor-pointer rounded-md"
                >
                  Login
                </Link>
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
          {userId ? (
            <SignOutButton>
              <button className="bg-red-700 text-white px-4 py-2 rounded-md shadow-sm cursor-pointer">
                Logout
              </button>
            </SignOutButton>
          ) : (
            <Link
              href={"/sign-in"}
              className="bg-indigo-600 text-white px-4 py-2 shadow-sm cursor-pointer rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
