"use client";

import DMenueOne from "@/app/assets/images/d-menu-1.png";
import DMenueTwo from "@/app/assets/images/d-menu-2.png";
import { useSubmissionCountQuery } from "@/lib/slices/submissions/submissionApiSlice";
import MenuCard from "./components/MenuCard";

export default function Dashboard() {
  const { data: submissionCount } = useSubmissionCountQuery({});

  return (
    <div className="flex justify-center mt-[65px]">
      <div className="flex-col lg:flex-row h-[414px] justify-start items-start gap-6 inline-flex">
        <MenuCard
          image={DMenueOne}
          title="View submission"
          description="Login provides secure access to personalized accounts by verifying
              user credentials"
          badgeCount={
            submissionCount?.submission_count > 0
              ? submissionCount.submission_count
              : undefined
          }
          route="/admin/dashboard/submissions"
        />

        <MenuCard
          image={DMenueTwo}
          title="ISO Interface"
          description="Login provides secure access to personalized accounts by verifying
              user credentials"
          route="/admin/dashboard/iso-interface"
        />
      </div>
    </div>
  );
}
