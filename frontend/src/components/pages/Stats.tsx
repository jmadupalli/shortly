import { useNavigate, useParams } from "react-router-dom";
import {
  BrowserData,
  CountryData,
  DeviceData,
  useGetShortlyStatsQuery,
} from "../../redux/features/shortlyApi";
import { lazy, Suspense, useEffect } from "react";
import Spinner from "../util/Spinner";
import toast from "react-hot-toast";
import StatsTable from "../stats/StatsTable";

const WorldMap = lazy(() => import("react-svg-worldmap"));

const Stats = () => {
  const { code: shortCode } = useParams();
  const navigate = useNavigate();
  const response = useGetShortlyStatsQuery(shortCode as string, {
    refetchOnMountOrArgChange: 30,
  });

  const countryData: { country: string; value: number }[] | undefined =
    response.data?.country.map((c) => ({
      country: c.country ? c.country.toLowerCase() : "Other",
      value: c.total,
    }));

  useEffect(() => {
    if (!shortCode) {
      toast.error("Invalid ShortURL");
      navigate("/");
    }
  }, [shortCode, response, navigate]);

  const shortURL = import.meta.env.VITE_API_URL + "/" + shortCode;

  return (
    <>
      <div className="m-auto mb-3 w-full rounded-md bg-gray-900 p-6 text-center text-lg font-bold text-white lg:w-11/12">
        Stats for {shortURL}
      </div>

      <div className="m-auto mb-3 w-full rounded-md text-center lg:grid lg:w-11/12 lg:grid-cols-2 lg:gap-3">
        {response.isLoading ? (
          <Spinner />
        ) : (
          <>
            <Suspense fallback={<Spinner />}>
              <div className="bg-gray-900 p-6 text-center">
                <p className="pb-2 text-sm font-bold text-white">Countries</p>
                <WorldMap
                  color="green"
                  backgroundColor="rgb(55 65 81 / var(--tw-bg-opacity))"
                  borderColor="white"
                  valueSuffix="hits"
                  size="responsive"
                  data={countryData ?? []}
                />
              </div>
            </Suspense>
            <div className="mt-2 bg-gray-900 p-6 text-center lg:mt-0">
              <StatsTable
                type="country"
                data={(response.data?.country as CountryData) ?? []}
              />
              <StatsTable
                type="browser"
                data={(response.data?.browser as BrowserData) ?? []}
              />

              <StatsTable
                type="device"
                data={(response.data?.deviceAndOs as DeviceData) ?? []}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Stats;
