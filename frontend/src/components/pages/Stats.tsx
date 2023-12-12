import { useParams } from "react-router-dom";

const Stats = () => {
  const { code: shortCode } = useParams();
  const shortURL = import.meta.env.VITE_API_URL + "/" + shortCode;
  return (
    <>
      <div className="m-auto mb-3 w-full rounded-md bg-gray-900 p-6 text-center text-lg font-bold text-white lg:w-11/12">
        Stats for {shortURL}
      </div>
    </>
  );
};

export default Stats;
