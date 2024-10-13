import { useSession } from "@clerk/clerk-react";
import { useState} from "react";

const useFetch = (cb, option = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session, isLoaded } = useSession();

  const fn = async (...args) => {
    if (!isLoaded || !session) {
      console.error("Session is not loaded or unavailable.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ensure session is available and fetch Supabase access token
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      console.log("Supabase Access Token:", supabaseAccessToken);

      // Call the provided callback with token, options, and any extra arguments
      const response = await cb(supabaseAccessToken, option, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error in useFetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
