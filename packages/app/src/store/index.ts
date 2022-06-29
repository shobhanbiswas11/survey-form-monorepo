import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { formReducer } from "features/form";
import { formPageReduce } from "features/FormPage";
import { questionReducer } from "features/questions";
import { uiReducer } from "features/UI";
import { normalize, schema } from "normalizr";
import { listenerMiddleware } from "./listenerMiddleware";

const suggestion = new schema.Entity("suggestions");
const choice = new schema.Entity("choices", {
  suggestions: [suggestion],
});
const question = new schema.Entity("questions", {
  choices: [choice],
});

const questions = [
  {
    id: "123",
    content: "Question 1",
    choices: [
      {
        id: "212dss",
        content: "Choice - 1",
        point: 12,
        suggestions: [
          {
            id: "adqu23in21",
            content: "Suggestion",
          },
          {
            id: "adquasa",
            content: "Suggestion",
          },
        ],
      },
    ],
  },
];

console.log(JSON.stringify(normalize(questions, [question]), null, 4));

export const store = configureStore({
  reducer: {
    form: formReducer,
    entities: combineReducers({
      questions: questionReducer,
      formPage: formPageReduce,
    }),
    ui: uiReducer,
  },
  middleware: [listenerMiddleware.middleware, ...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    _store: typeof store;
  }
}
window._store = store;
