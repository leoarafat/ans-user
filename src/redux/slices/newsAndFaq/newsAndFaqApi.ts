import { baseApi } from "@/redux/api/baseApi";

export const newsFaqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    news: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `news/all`,
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
      providesTags: ["news"],
    }),
    getFaq: build.query({
      query: () => ({
        url: "faq/faq",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
  }),
});

export const { useGetFaqQuery, useNewsQuery } = newsFaqApi;
