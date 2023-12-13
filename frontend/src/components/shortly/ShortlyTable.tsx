import { useGetUserShortsQuery } from "../../redux/features/shortlyApi";
import ShortlyRow from "./ShortlyRow";
import Spinner from "../util/Spinner";

const ShortlyTable = () => {
  const result = useGetUserShortsQuery();

  return (
    <div className="m-auto mb-3 min-h-[50%] w-full rounded-md bg-gray-900 p-6 text-center lg:w-11/12">
      <div className="container mx-auto p-1 dark:dark:text-gray-100 sm:p-4">
        <h2 className="leadi mb-4 text-2xl font-semibold">Your Short URLs</h2>
        <div className="overflow-x-auto">
          {result.isLoading ? (
            <Spinner />
          ) : (
            <table className="min-w-full text-xs">
              <thead className="dark:dark:bg-gray-700">
                <tr className="text-center">
                  <th className="p-3">SNO #</th>
                  <th className="p-3">Short URL</th>
                  <th className="p-3">Original URL</th>
                  <th className="p-3">Date Created</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="max-h-full overflow-auto">
                {result.data?.length == 0 ? (
                  <tr className="text-bold font-bold">
                    <td colSpan={5}>No URLs found</td>
                  </tr>
                ) : (
                  result.data?.map((value, ind) => (
                    <ShortlyRow
                      key={ind + 1}
                      sno={ind + 1}
                      shortCode={value.shortCode}
                      originalURL={value.originalURL}
                      created={value.created}
                    />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortlyTable;
