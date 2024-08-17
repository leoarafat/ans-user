import { baseApi } from "@/redux/api/baseApi";

export const bankApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBankAccount: build.mutation({
      query: (loginData) => ({
        url: `account/add-bank`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["bank"],
    }),
    addMobileBankAccount: build.mutation({
      query: (loginData) => ({
        url: `account/add-mobile-bank`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["mobile-bank"],
    }),
    addPioneerAccount: build.mutation({
      query: (loginData) => ({
        url: `account/add-pioneer`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["pioneer"],
    }),

    getMyAccounts: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `account/my-account`,
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
      providesTags: ["bank", "mobile-bank", "pioneer"],
    }),
  }),
});

export const {
  useAddBankAccountMutation,
  useAddMobileBankAccountMutation,
  useAddPioneerAccountMutation,
  useGetMyAccountsQuery,
} = bankApi;
