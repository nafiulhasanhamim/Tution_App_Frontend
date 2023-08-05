import { configureStore } from "@reduxjs/toolkit";
import userinfoReducer from "../features/userQuery/userinfoSlice";
import roleinfoReducer from "../features/userQuery/roleSlice";
import { tokenVerificationQuery } from "../features/userQuery/tokenVerificationQuery";
export const store = configureStore({
  reducer: {
    userinfo: userinfoReducer,
    roleinfo: roleinfoReducer,
    [tokenVerificationQuery.reducerPath]: tokenVerificationQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([tokenVerificationQuery.middleware]),
});
