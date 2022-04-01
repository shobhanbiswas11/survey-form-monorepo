import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStore } from "services/localStorage";
import { RootState } from "store";
import { globalActions } from "store/globalActions";
import { startAppListen } from "store/listenerMiddleware";

const formSlice = createSlice({
  name: "form",
  initialState: {
    head: "",
  },
  reducers: {
    setHead: (state, action: PayloadAction<string>) => {
      state.head = action.payload;
    },
  },
});

export const { reducer: formReducer } = formSlice;
export const { actions: formActions } = formSlice;
export const formSelectors = {
  head: (state: RootState) => state.form.head,
};

const storage = new LocalStore<ReturnType<typeof formSlice.reducer>>("form", {
  head: "",
});
startAppListen({
  actionCreator: formActions.setHead,
  effect: async (action) => {
    storage.set({
      head: action.payload,
    });
  },
});

startAppListen({
  actionCreator: globalActions.appLoad,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(formActions.setHead(storage.get().head));
  },
});
