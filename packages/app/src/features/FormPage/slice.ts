import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { FormPage } from "./types";

const entity = createEntityAdapter<FormPage>({
  sortComparer: (a, b) => a.order - b.order,
});

const formPageSlice = createSlice({
  name: "formPageSlice",
  initialState: entity.getInitialState(),
  reducers: {
    add: entity.addOne,
    remove: entity.removeOne,
    update: entity.updateOne,
    set: entity.setAll,
  },
});

export const { reducer: formPageReduce } = formPageSlice;
export const { actions: formPageActions } = formPageSlice;
export const formPageSelectors = entity.getSelectors(
  (s: RootState) => s.entities.formPage
);
