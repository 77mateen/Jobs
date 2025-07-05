"use client";

import { useActionState } from "react";
import { applyJob } from "@/actions/apply-job";

const initialState = { success: false, message: "" };

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useActionState(applyJob, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <button
        type="submit"
        className="bg-indigo-600 w-full mb-4 px-4 py-2 text-white rounded-md cursor-pointer"
      >
        Apply
      </button>
      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
