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
    myAllSong: build.query({
      query: (query: Record<string, unknown>) => ({
        url: `single-music/all-music`,
        method: "GET",
        params: query,
      }),
      providesTags: ["single-audio"],
    }),
    editSingleMusic: build.mutation({
      query: (payload) => ({
        url: `catalog-music/edit-release/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["single-audio"],
    }),
    getMusicDetails: build.query({
      query: (id) => ({
        url: `catalog-music/inspect-song/${id}`,
        method: "GET",
      }),
      providesTags: ["single-audio"],
    }),
    getVideoDetails: build.query({
      query: (id) => ({
        url: `catalog-video/inspect-song/${id}`,
        method: "GET",
      }),
      providesTags: ["video"],
    }),
    editVideo: build.mutation({
      query: (payload) => ({
        url: `catalog-video/edit-video/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["video"],
    }),
    updateVideo: build.mutation({
      query: (payload) => ({
        url: `/video/update-video`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["video"],
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
  useEditSingleMusicMutation,
  useGetMusicDetailsQuery,
  useGetVideoDetailsQuery,
  useEditVideoMutation,
  useUpdateVideoMutation,
  useMyAllSongQuery,
} = myUploadsApi;
