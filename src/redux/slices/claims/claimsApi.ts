import { baseApi } from "@/redux/api/baseApi";

export const claimsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTikTokClaimRequest: build.mutation({
      query: (loginData) => ({
        url: `claims/tiktok-claims`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["artist"],
    }),
    addArtistChannelRequest: build.mutation({
      query: (adminData) => ({
        url: `claims/artist-channel-requests`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    addYoutubeManualClaim: build.mutation({
      query: (adminData) => ({
        url: `claims/youtube-manual-claims`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    addYoutubeTakeDown: build.mutation({
      query: (adminData) => ({
        url: `claims/youtube-take-downs`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    addYoutubeClaimRequest: build.mutation({
      query: (adminData) => ({
        url: `claims/youtube-claims`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    addFacebookWhitelistRequest: build.mutation({
      query: (adminData) => ({
        url: `claims/facebook-whitelist-requests`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),

    addFacebookClaimRequest: build.mutation({
      query: (adminData) => ({
        url: `claims/facebook-claims`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    addWhitelistRequest: build.mutation({
      query: (adminData) => ({
        url: `claims/whitelist-requests`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["claims"],
    }),
    //! GET
    getTikTokClaimRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/tiktok-claims`,
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
      providesTags: ["claims"],
    }),
    getArtistChannelRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/artist-channel-requests`,
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
      providesTags: ["claims"],
    }),
    getYoutubeManualClaim: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/youtube-manual-claims`,
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
      providesTags: ["claims"],
    }),
    getYoutubeTakeDown: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/youtube-take-downs`,
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
      providesTags: ["claims"],
    }),
    getYoutubeClaimRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/youtube-claims`,
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
      providesTags: ["claims"],
    }),
    getFacebookWhitelistRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/facebook-whitelist-requests`,
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
      providesTags: ["claims"],
    }),
    getFacebookClaimRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/facebook-claims`,
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
      providesTags: ["claims"],
    }),
    getWhitelistRequest: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `claims/whitelist-requests`,
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
      providesTags: ["claims"],
    }),
  }),
});

export const {
  useAddArtistChannelRequestMutation,
  useAddFacebookClaimRequestMutation,
  useAddFacebookWhitelistRequestMutation,
  useAddTikTokClaimRequestMutation,
  useAddWhitelistRequestMutation,
  useAddYoutubeClaimRequestMutation,
  useAddYoutubeManualClaimMutation,
  useAddYoutubeTakeDownMutation,
  useGetArtistChannelRequestQuery,
  useGetFacebookClaimRequestQuery,
  useGetFacebookWhitelistRequestQuery,
  useGetTikTokClaimRequestQuery,
  useGetWhitelistRequestQuery,
  useGetYoutubeClaimRequestQuery,
  useGetYoutubeManualClaimQuery,
  useGetYoutubeTakeDownQuery,
} = claimsApi;
