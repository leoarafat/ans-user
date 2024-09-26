import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import axios from "axios";
import { tagsList } from "../tag-types";
const authToken = getFromLocalStorage(authKey);
// http://localhost:7001
// https://api.ansbackstage.com
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.ansbackstage.com",
    headers: { Authorization: `Bearer ${authToken}` },
  }),
  endpoints: () => ({}),
  tagTypes: tagsList,
});
export const imageURL = "https://api.ansbackstage.com";
export const baseUrl = axios.create({
  baseURL: "https://api.ansbackstage.com",
});
export const socketURL = "https://api.ansbackstage.com";
