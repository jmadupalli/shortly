import { useNavigate } from "react-router-dom";
import { useDeleteShortMutation } from "../../redux/features/shortlyApi";
import Spinner from "../util/Spinner";

const ShortlyRow = ({
  sno,
  shortCode,
  originalURL,
  created,
}: {
  sno: number;
  shortCode: string;
  originalURL: string;
  created: string;
}) => {
  const [deleteShort, result] = useDeleteShortMutation();
  const shortURL = import.meta.env.VITE_SHORTLY_URL + "/" + shortCode;
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteShort(shortCode);
  };

  return (
    <tr className="border-b border-opacity-20 dark:dark:border-gray-700 dark:dark:bg-gray-900">
      <td className="p-3">
        <p>{sno}</p>
      </td>
      <td className="p-3 font-bold">
        <p>
          <a href={shortURL} target="_blank">
            {shortURL}
          </a>
        </p>
      </td>
      <td className="p-3">
        <p>{originalURL}</p>
      </td>
      <td className="p-3">
        <p>{new Date(created).toLocaleString()}</p>
      </td>
      <td className="p-3">
        <button
          onClick={() => navigate("/stats/" + shortCode)}
          className="m-1 inline rounded-md px-3 py-1 font-semibold dark:dark:bg-blue-400 dark:dark:text-gray-900"
        >
          Stats
        </button>
        {result.isLoading ? (
          <Spinner />
        ) : (
          <button
            onClick={handleDelete}
            className="inline rounded-md px-3 py-1 font-semibold dark:dark:bg-red-400 dark:dark:text-gray-900"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default ShortlyRow;
