import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Viewport } from "react-flow-renderer";
import { LocalStore } from "services/localStorage";
import { RootState } from "store";
import { globalActions } from "store/globalActions";
import { startAppListen } from "store/listenerMiddleware";

const initialState = {
  flowViewPort: {
    x: 0,
    y: 0,
    zoom: 1,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFlowViewPort(state, action: PayloadAction<Viewport>) {
      state.flowViewPort = action.payload;
    },
  },
});

export const { reducer: uiReducer, actions: uiActions } = uiSlice;
export const uiSelectors = {
  flowViewPort: (s: RootState) => s.ui.flowViewPort,
};

const localStore = new LocalStore("ui", initialState);

startAppListen({
  actionCreator: uiActions.setFlowViewPort,
  effect: async ({ payload }, api) => {
    if (payload)
      localStore.set({
        flowViewPort: payload,
      });
  },
});

startAppListen({
  actionCreator: globalActions.appLoad,
  effect: async (_, api) => {
    api.dispatch(uiActions.setFlowViewPort(localStore.get().flowViewPort));
  },
});
