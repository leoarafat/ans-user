import { baseApi } from "@/redux/api/baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrivacyPolicy: build.mutation({
      query: (policyData) => ({
        url: `rules/privacy-policy`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: ["policy"],
    }),
    createTermsConditions: build.mutation({
      query: (policyData) => ({
        url: `rules/terms-and-conditions`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: ["terms"],
    }),
    createAboutUs: build.mutation({
      query: (policyData) => ({
        url: `rules/about`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: ["about"],
    }),
    createFaq: build.mutation({
      query: (policyData) => ({
        url: `faq/create-faq`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: ["faq"],
    }),
    getPrivacyPolicy: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/privacy-policy`,
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
      providesTags: ["policy"],
    }),
    getAboutUs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/about`,
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
      providesTags: ["about"],
    }),
    getTermsConditions: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/terms-and-conditions`,
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
      providesTags: ["terms"],
    }),
    myProfile: build.query({
      query: () => {
        return {
          url: `user/profile`,
          method: "GET",
        };
      },
      providesTags: ["profile"],
    }),
    singleSubUser: build.query({
      query: (id: string | null) => {
        return {
          url: `user/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    faqs: build.query({
      query: () => {
        return {
          url: `faq`,
          method: "GET",
        };
      },
      providesTags: ["faq"],
    }),
    notifications: build.query({
      query: () => {
        return {
          url: `notifications`,
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `user/profile-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateTermsConditions: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/terms-and-conditions`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: ["terms"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/privacy-policy`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: ["policy"],
    }),
    updateAboutUs: build.mutation({
      query: ({ ...content }) => ({
        url: `rules/about`,
        method: "PATCH",
        body: content,
      }),
      invalidatesTags: ["about"],
    }),
    changePassword: build.mutation({
      query: (userData) => ({
        url: `user/change-password`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["forget"],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["forget"],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reset"],
    }),
    verifyEmail: build.mutation({
      query: (data) => ({
        url: `auth/otp-verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["verify"],
    }),
    updateFaq: build.mutation({
      query: ({ id, question, answer }) => ({
        url: `faq/${id}`,
        method: "PATCH",
        body: { question, answer },
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `faq/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["faq"],
    }),
    dashboardOverview: build.query({
      query: () => {
        return {
          url: `order/sales-overview`,
          method: "GET",
        };
      },
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useCreateTermsConditionsMutation,
  useGetTermsConditionsQuery,
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useNotificationsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsConditionsMutation,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useFaqsQuery,
  useDashboardOverviewQuery,
  useSingleSubUserQuery,
} = settingApi;
