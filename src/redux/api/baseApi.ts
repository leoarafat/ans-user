import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import axios from "axios";
import { tagsList } from "../tag-types";
const authToken = getFromLocalStorage(authKey);
// http://localhost:7001
// https://backend.bemusix.com
// /https://api.ansbackstage.com
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7001",
    headers: { Authorization: `Bearer ${authToken}` },
  }),
  endpoints: () => ({}),
  tagTypes: tagsList,
});
export const imageURL = "http://localhost:7001";
export const baseUrl = axios.create({
  baseURL: "http://localhost:7001",
});
export const socketURL = "http://localhost:7001";
