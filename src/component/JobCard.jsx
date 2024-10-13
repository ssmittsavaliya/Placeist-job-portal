import { useUser } from "@clerk/clerk-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinCheck, TractorIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState ,useEffect} from "react";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, savaJob } from "@/api/apijobs";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyjob = false,
  savedInit = false,
  onJobAction = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedjob,
    loading: loadingSavedJob,
  } = useFetch(savaJob,{
    alreadySaved:saved,
  });

  const { user } = useUser();
  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const {loading:loadingDeleteJob,fn:fnDeleteJob} =useFetch(deleteJob,{
    job_id:job.id,
  })

  const handledeleteJob=async()=>{
    await fnDeleteJob();
    onJobAction();
  }
  useEffect(() => {
    if (savedjob !== undefined) setSaved(savedjob?.length > 0);
  }, [savedjob]);
  return (
    <Card className='flex flex-col'>
      {loadingDeleteJob && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }
      <CardHeader className='flex '>
        <CardTitle className="flex justify-between font-bold ">
          {job.title}
          {isMyjob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer "
              onClick={handledeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinCheck size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyjob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {
              saved ? (
                <Heart size={20} stroke="red" fill="red" />
              ) : (
                <Heart size={20} />
              ) //saved and unsaved logic
            }
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
