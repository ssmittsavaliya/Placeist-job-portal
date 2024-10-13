import { Button } from "@/component/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners"; //for the spinner

const Onbording = () => {
  const { user, isLoaded } = useUser();
  // console.log(user);
  const navigator = useNavigate();
  const handleRoleSelection = async (role) => {
    await user.update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigator(role === "recruiter" ? "/post-jobs" : "/jobs");
      })
      .catch((err) => {
        console.error("Error Update Role", err);
      });
  };
 
  useEffect(() => {
   if(user?.unsafeMetadata?.role){
    navigator(
      user?.unsafeMetadata?.role === 'recruiter' ? '/post-jobs' : '/jobs'
    )
   }
  }, [user]);
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a..
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => handleRoleSelection("candidate")}
          variant="blue"
          className="h-36 text-2xl "
        >
          Candidate
        </Button>
        <Button
          onClick={() => handleRoleSelection("recruiter")}
          variant="destructive"
          className="h-36 text-2xl "
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onbording;
