"use client";

import createJob from "@/actions/create-job";
import { ToasterProvider } from "@/components/ToasterProvider";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

function PostJobPage() {
  const [state, formAction] = useActionState(createJob, { success: false });

  useEffect(() => {
    if (state.success) {
      toast.success("Job posted successfully");
    }
  }, [state.success]);
  return (
    <div className="bg-white shadow-sm max-w-3xl mx-auto py-5 px-4 sm:px-8 rounded-md">
      <ToasterProvider />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>
      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={""}>Select a type</option>
            <option value={"Full-time"}>Full-time</option>
            <option value={"Part-time"}>Part-time</option>
            <option value={"Contract"}>Contract</option>
            <option value={"Internship"}>Internship</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            Salary (Optional)
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            placeholder="$10,000 - $100,000"
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-800 w-full rounded-md px-4 py-2 text-white cursor-pointer"
        >
          Post a Job
        </button>
      </form>
    </div>
  );
}

export default PostJobPage;
