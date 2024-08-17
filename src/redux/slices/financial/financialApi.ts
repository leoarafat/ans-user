/* eslint-disable @typescript-eslint/ban-ts-comment */
import { baseApi } from "@/redux/api/baseApi";

export const uploadVideoAudioApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestPayment: build.mutation({
      query: (payload) => ({
        url: `payment/request`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["financial"],
    }),

    getMyFiles: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `statics/my-files`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          //@ts-ignore
          data: response?.data,
          meta,
        };
      },
      providesTags: ["financial"],
    }),
    getMyBalance: build.query({
      query: () => {
        return {
          url: `statics/my-balance`,
          method: "GET",
        };
      },
      providesTags: ["financial"],
    }),
    getMyAllTimeBalance: build.query({
      query: () => {
        return {
          url: `statics/my-allTime-balance`,
          method: "GET",
        };
      },
      providesTags: ["financial"],
    }),
    getMyFullMonthBalance: build.query({
      query: () => {
        return {
          url: `statics/my-full-month-balance`,
          method: "GET",
        };
      },
      providesTags: ["financial"],
    }),
    getMyTransaction: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `payment/my-transaction`,
          method: "GET",
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          //@ts-ignore
          data: response?.data,
          meta,
        };
      },
      providesTags: ["financial"],
    }),
  }),
});

export const {
  useRequestPaymentMutation,
  useGetMyFilesQuery,
  useGetMyBalanceQuery,
  useGetMyAllTimeBalanceQuery,
  useGetMyTransactionQuery,
  useGetMyFullMonthBalanceQuery,
} = uploadVideoAudioApi;
