import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type ShortURL = {
  id?: number;
  originalURL: string;
  shortCode: string;
  created: string;
};

export type CountryData = [{ country: string; total: number }];
export type BrowserData = [{ browser: string; total: number }];
export type DeviceData = [{ device: string; os: string; total: number }];

type StatsResponse = {
  country: CountryData;
  browser: BrowserData;
  deviceAndOs: DeviceData;
};

export const shortlyApi = createApi({
  reducerPath: "shortlyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.jwtToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
      }
    },
  }),
  tagTypes: ["shorts"],
  endpoints: (builder) => ({
    getUserShorts: builder.query<ShortURL[], void>({
      query: () => "shortly/",
      providesTags: ["shorts"],
    }),
    getShortlyStats: builder.query<StatsResponse, string>({
      query: (shortCode: string) => `shortly/stats/${shortCode}`,
    }),
    createShort: builder.mutation<void, { originalURL: string }>({
      query: (body: { originalURL: string }) => ({
        url: "shortly/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["shorts"],
    }),
    deleteShort: builder.mutation<void, string>({
      query: (shortCode: string) => ({
        url: `shortly/${shortCode}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shorts"],
    }),
  }),
});

export const {
  useGetUserShortsQuery,
  useGetShortlyStatsQuery,
  useCreateShortMutation,
  useDeleteShortMutation,
} = shortlyApi;
