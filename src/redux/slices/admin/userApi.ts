import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: `/user/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/user/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    verify: build.mutation({
      query: (data) => ({
        url: `/user/activate-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    editProfilePicture: build.mutation({
      query: (data) => ({
        url: `/user/edit-profile-picture`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    profileVerify: build.mutation({
      query: (data) => ({
        url: `/user/profile-verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    labelVerify: build.mutation({
      query: (data) => ({
        url: `/user/label-verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    agreementVerify: build.mutation({
      query: (data) => ({
        url: `/user/signature-verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    addressVerify: build.mutation({
      query: (data) => ({
        url: `/user/address-verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyUser: build.mutation({
      query: () => ({
        url: `/user/verify-profile`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    profile: build.query({
      query: () => {
        return {
          url: `/user/profile`,
          method: "GET",
        };
      },

      providesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useProfileVerifyMutation,
  useLabelVerifyMutation,
  useProfileQuery,
  useAddressVerifyMutation,
  useVerifyUserMutation,
  useUserLoginMutation,
  useAgreementVerifyMutation,
  useEditProfilePictureMutation,
} = userApi;
