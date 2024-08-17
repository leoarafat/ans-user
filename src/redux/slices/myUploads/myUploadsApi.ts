import { baseApi } from "@/redux/api/baseApi";

export const myUploadsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPendingVideo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/pending-videos`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["video"],
    }),
    getSuccessVideo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/success-videos`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["video"],
    }),
    getCorrectionVideo: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/correction-videos`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["video"],
    }),
    getPendingSingleSong: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/pending-songs`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["single-audio"],
    }),
    getCorrectionSingleSong: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/correction-songs`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["single-audio"],
    }),
    getSuccessSingleSong: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `my-uploads/success-songs`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: ["single-audio"],
    }),
    getLatestSongs: build.query({
      query: () => {
        return {
          url: `latest/latest-songs`,
          method: "GET",
        };
      },

      providesTags: ["single-audio"],
    }),
    getStoredSong: build.query({
      query: (id) => {
        return {
          url: `stored-content/single/${id}`,
          method: "GET",
        };
      },

      providesTags: ["store"],
    }),
    getCountrySong: build.query({
      query: (id) => {
        return {
          url: `stored-country/single/${id}`,
          method: "GET",
        };
      },

      providesTags: ["store"],
    }),
    getCorrectionMessage: build.query({
      query: (id) => {
        return {
          url: `catalog-music/correction-data/${id}`,
          method: "GET",
        };
      },

      providesTags: ["single-audio"],
    }),
    getCorrectionContent: build.query({
      query: (id) => ({
        url: `catalog-music/correction-data/${id}`,
        method: "GET",
      }),
      providesTags: ["single-audio"],
    }),
    getDraftsSong: build.query({
      query: (id) => ({
        url: `single-music/drafts/${id}`,
        method: "GET",
      }),
      providesTags: ["single-audio"],
    }),
  }),
});

export const {
  useGetSuccessVideoQuery,
  useGetPendingVideoQuery,
  useGetCorrectionVideoQuery,
  useGetCorrectionSingleSongQuery,
  useGetPendingSingleSongQuery,
  useGetSuccessSingleSongQuery,
  useGetLatestSongsQuery,
  useGetStoredSongQuery,
  useGetCountrySongQuery,
  useGetCorrectionMessageQuery,
  useGetCorrectionContentQuery,
  useGetDraftsSongQuery,
} = myUploadsApi;
