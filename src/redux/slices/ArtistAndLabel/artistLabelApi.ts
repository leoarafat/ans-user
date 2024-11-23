import { baseApi } from "@/redux/api/baseApi";

export const artistLabelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addArtist: build.mutation({
      query: (loginData) => ({
        url: `primary-artist/add-artist`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["artist"],
    }),
    addChannel: build.mutation({
      query: (loginData) => ({
        url: `channel/add-channel`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["channel"],
    }),
    addLabel: build.mutation({
      query: (adminData) => ({
        url: `label/add-label`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["label"],
    }),
    getLabels: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `label/my-label`,
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
      providesTags: ["label"],
    }),
    getApprovedLabels: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `label/my-approved-label`,
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
      providesTags: ["label"],
    }),
    getSingleLabel: build.query({
      query: (id) => ({
        url: `label/single/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    singleChannel: build.query({
      query: (id) => ({
        url: `channel/single/${id}`,
        method: "GET",
      }),
      providesTags: ["channel"],
    }),
    getArtists: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `primary-artist/all`,
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
      providesTags: ["artist"],
    }),
    getChannels: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `channel/all`,
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
      providesTags: ["channel"],
    }),
    getApprovedChannels: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `channel/approved-channel`,
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
      providesTags: ["channel"],
    }),

    deleteLabel: build.mutation({
      query: (id) => ({
        url: `label/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["label"],
    }),
    deleteArtist: build.mutation({
      query: (id) => ({
        url: `primary-artist/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["artist"],
    }),
    deleteChannel: build.mutation({
      query: (id) => ({
        url: `channel/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["channel"],
    }),
    editLabel: build.mutation({
      query: (data) => ({
        url: `label/update/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["label"],
    }),
    editArtists: build.mutation({
      query: (data) => ({
        url: `primary-artist/update/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["artist"],
    }),
    editChannel: build.mutation({
      query: (data) => ({
        url: `channel/update/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["channel"],
    }),
    editRequest: build.mutation({
      query: (data) => ({
        url: `channel/edit-request`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["channel"],
    }),
  }),
});

export const {
  useAddArtistMutation,
  useAddLabelMutation,
  useEditArtistsMutation,
  useEditLabelMutation,
  useDeleteArtistMutation,
  useDeleteLabelMutation,
  useGetArtistsQuery,
  useGetLabelsQuery,
  useGetSingleLabelQuery,
  useGetApprovedLabelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useEditChannelMutation,
  useGetChannelsQuery,
  useGetApprovedChannelsQuery,
  useEditRequestMutation,
  useSingleChannelQuery,
} = artistLabelApi;
