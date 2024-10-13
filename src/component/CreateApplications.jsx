import { getApplication } from "@/api/apiapplication";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreateApplications = () => {
  const { user } = useUser();
  const {
    fn: fnApplications,
    data: applications,
    loading: loadingApplications,
  } = useFetch(getApplication, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);
  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2 ">
      {applications?.map((application) => {
        return (
          <ApplicationCard key={application.id} application={application} isCandidate={true}/>
        );
      })}
    </div>
  );
};

export default CreateApplications;
