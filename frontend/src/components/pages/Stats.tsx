import { useNavigate, useParams } from "react-router-dom";
import { useGetShortlyStatsQuery } from "../../redux/features/shortlyApi";
import { useEffect } from "react";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

const Stats = () => {
  const { code: shortCode } = useParams();
  const navigate = useNavigate();
  const response = useGetShortlyStatsQuery(shortCode as string);

  useEffect(() => {
    if (!shortCode) toast.error("Invalid ShortURL");
    navigate("/");
  }, [shortCode, response, navigate]);

  const shortURL = import.meta.env.VITE_API_URL + "/" + shortCode;
  return (
    <>
      <div className="m-auto mb-3 w-full rounded-md bg-gray-900 p-6 text-center text-lg font-bold text-white lg:w-11/12">
        Stats for {shortURL}
      </div>

      <div className="m-auto mb-3 w-full rounded-md bg-gray-900 p-6 text-center lg:w-11/12">
        {response.isLoading ? <Spinner /> : <></>}
      </div>
    </>
  );
};

export default Stats;
