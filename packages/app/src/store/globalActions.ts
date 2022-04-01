import { createAction } from "@reduxjs/toolkit";

export const globalActions = {
  logout: createAction("LOGOUT"),
  appLoad: createAction("APP_LOAD"),
};
