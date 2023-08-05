import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { react, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Define a service using a base URL and expected endpoints
export const tokenVerificationQuery = createApi({
  reducerPath: "tokenVerificationQuery",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tution-project-backend-iuym.vercel.app",
    prepareHeaders: (headers) => {
      const userinfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userinfo?.token;
      headers.set("authorization", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTokenVerification: builder.query({
      query: (token) => ({
        url: "verifytoken",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetTokenVerificationQuery } = tokenVerificationQuery;
