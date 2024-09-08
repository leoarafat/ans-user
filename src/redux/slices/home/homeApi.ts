import { baseApi } from "@/redux/api/baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    totalSong: build.query({
      query: () => ({
        url: `statics/total-songs`,
        method: "GET",
      }),
      providesTags: ["single-audio", "video"],
    }),
  }),
});

export const { useTotalSongQuery } = homeApi;
