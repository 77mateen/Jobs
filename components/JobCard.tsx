import Link from "next/link";
import { Dot } from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
  postedByName: string | null;
};

function JobCard({
  id,
  title,
  company,
  location,
  type,
  description,
  salary,
  postedByName,
}: Job) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="sm:w-3/4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{company}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{location}</span>
            <span>
              <Dot />
            </span>
            <span>{type}</span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        </div>
        {salary && (
          <span className="text-lg mb-4 font-semibold text-gray-900">
            {salary}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <span className="text-sm text-gray-500">Posted by {postedByName}</span>
        <button className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-800 cursor-pointer">
          <Link href={`/jobs/${id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
}

export default JobCard;
