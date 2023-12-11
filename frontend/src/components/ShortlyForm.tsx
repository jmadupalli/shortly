import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useCreateShortMutation } from "../redux/features/shortlyApi";

const ShortlyForm = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [createShort, result] = useCreateShortMutation();

  useEffect(() => {
    if (result.isSuccess) setOriginalURL("");
  }, [result]);

  const handleSubmit = () => {
    createShort({ originalURL: originalURL });
  };

  return (
    <div className="m-auto mb-3 w-full rounded-md bg-gray-900 p-6 text-center lg:w-11/12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className="form-input w-10/12 py-3 lg:w-6/12"
          type="text"
          placeholder="Enter Long URL Here"
          onChange={(e) => setOriginalURL(e.target.value)}
          value={originalURL}
          required
        />
        {result.isLoading ? (
          <Spinner />
        ) : (
          <button
            className="m-auto block rounded bg-red-400 px-8 py-3 xl:ml-2 xl:inline"
            type="submit"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default ShortlyForm;
