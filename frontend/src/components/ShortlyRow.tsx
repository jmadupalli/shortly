import { useDeleteShortMutation } from "../redux/features/shortlyApi";
import Spinner from "./Spinner";

const ShortlyRow = ({
  sno,
  shortCode,
  created,
}: {
  sno: number;
  shortCode: string;
  created: string;
}) => {
  const [deleteShort, result] = useDeleteShortMutation();
  const shortURL = import.meta.env.VITE_API_URL + "/" + shortCode;

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
        <p>{new Date(created).toLocaleString()}</p>
      </td>
      <td className="p-3">
        {result.isLoading ? (
          <Spinner />
        ) : (
          <button
            onClick={handleDelete}
            className="rounded-md px-3 py-1 font-semibold dark:dark:bg-red-400 dark:dark:text-gray-900"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default ShortlyRow;
