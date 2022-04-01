import { EntityState } from "@reduxjs/toolkit";
import { questionActions, questionReducer } from "../questionSlice";
import { MCQuestion, Question, QuestionType } from "../types";

const initialState: EntityState<Question> = {
  ids: ["id-1", "id-2"],
  entities: {
    "id-1": {
      id: "id-1",
      choices: [],
      content: "",
      type: QuestionType.MCQuestion,
    },
    "id-2": {
      type: QuestionType.TextInputQuestion,
      id: "id-2",
      content: "",
    },
  },
};

describe("Test for Question Reducer", () => {
  test("Should Add a new Question", () => {
    const newState = questionReducer(
      {
        ids: [],
        entities: {},
      },
      questionActions.addOne({
        id: "question-1",
        choices: [],
        content: "",
        type: QuestionType.MCQuestion,
      })
    );

    expect(newState.ids).toContain("question-1");
  });

  test("Choice Content can be updated", () => {
    const question = initialState.entities["id-1"] as MCQuestion;
    question.choices[0] = {
      ...question.choices[0],
      content: "Choice Content",
    };

    const newState = questionReducer(
      initialState,
      questionActions.updateOne({
        id: question?.id!,
        changes: {
          ...question,
        },
      })
    );

    expect((newState.entities["id-1"] as MCQuestion).choices[0].content).toBe(
      "Choice Content"
    );
  });
});
