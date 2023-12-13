import {
  BrowserData,
  CountryData,
  DeviceData,
} from "../../redux/features/shortlyApi";

import { getName } from "country-list";

type BrowserCols = ["Browser", "Total"];
type CountryCols = ["Country", "Total"];
type DeviceCols = ["Device", "OS", "Total"];

const StatsTable = ({
  type,
  data,
}: {
  type: "country" | "browser" | "device";
  data: CountryData | BrowserData | DeviceData | [];
}) => {
  const getColumns = (): BrowserCols | CountryCols | DeviceCols | [] => {
    switch (type) {
      case "browser":
        return ["Browser", "Total"];
      case "country":
        return ["Country", "Total"];
      case "device":
        return ["Device", "OS", "Total"];
    }
  };

  return (
    <div className="container mx-auto rounded-md p-2 dark:dark:bg-gray-900 dark:dark:text-gray-100 sm:p-4">
      <h2 className="leadi mb-3 text-sm font-semibold">{type.toUpperCase()}</h2>
      <div className="overflow-x-auto">
        <table className="h-1/3 min-w-full overflow-auto text-xs">
          <thead className="rounded-t-lg dark:dark:bg-gray-700">
            <tr className="text-center">
              <th className="p-3">#</th>
              {getColumns().map((col) => (
                <th className="p-3">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.map((row: any, ind) => (
                <tr className="border-b border-opacity-20 text-center dark:dark:border-gray-700 dark:dark:bg-gray-800">
                  <td className="px-3 py-2">{ind + 1}</td>
                  {getColumns().map((col) => (
                    <td className="px-3 py-2">
                      {col == "Country"
                        ? getName(row["country"]) ?? "Other"
                        : row[col.toLowerCase()]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <p className="p-2">No Stats found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
