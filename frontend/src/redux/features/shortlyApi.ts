import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type ShortURL = {
  id?: number;
  originalURL: string;
  shortCode: string;
  created: string;
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
  useCreateShortMutation,
  useDeleteShortMutation,
} = shortlyApi;
