import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { globalActions } from "store/globalActions";
import { startAppListen } from "store/listenerMiddleware";
import { questionApi } from "./api";
import { Question } from "./types";
import { batchUpdater } from "./worker/batchUpdater";

const questionAdapter = createEntityAdapter<Question>();

export const questionSlice = createSlice({
  name: "question",
  initialState: questionAdapter.getInitialState(),
  reducers: {
    addOne: questionAdapter.addOne,
    updateOne: questionAdapter.updateOne,
    updateMany: questionAdapter.updateMany,
    deleteMany: questionAdapter.removeMany,
    setAll: questionAdapter.setAll,
  },
});

export const { reducer: questionReducer } = questionSlice;
export const questionSelector = questionAdapter.getSelectors<RootState>(
  (s) => s.entities.questions
);
export const questionActions = questionSlice.actions;

startAppListen({
  actionCreator: globalActions.appLoad,
  effect: (_, api) => {
    questionApi.getAll().then((questions) => {
      api.dispatch(questionActions.setAll(questions));
    });
  },
});

startAppListen({
  actionCreator: questionActions.updateMany,
  effect: (action) => {
    batchUpdater.addChanges(action.payload.map((q) => q.id.toString()));
  },
});

startAppListen({
  actionCreator: questionActions.addOne,
  effect: async (action) => {
    await questionApi.add(action.payload);
  },
});

startAppListen({
  actionCreator: questionActions.deleteMany,
  effect: async (action) => {
    await questionApi.removeMany(action.payload.map((e) => e.toString()));
  },
});

startAppListen({
  actionCreator: questionActions.updateOne,
  effect: async (action) => {
    await questionApi.update(action.payload.id.toString());
  },
});
