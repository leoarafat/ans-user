import { baseApi } from "@/redux/api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `user`,
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
      providesTags: ["user"],
    }),

    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `user/active-deactive/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserStatusMutation } =
  userManagementApi;
