import { MCQuestion, QuestionMap, QuestionType } from "questions";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { MainState, MainStore } from "./types";
export * from "./types";
export { useStore };

// const dummyQuestions = new Map<string, Question>();

// dummyQuestions.set("1", {
//   id: "1",
//   type: QuestionType.MCQuestion,
//   parent: null,
//   choices: [
//     {
//       child: "2",
//       content: "Choice -1",
//     },
//     {
//       child: "3",
//       content: "Choice -2",
//     },
//     {
//       child: "3",
//       content: "Choice -2",
//     },
//     {
//       content: "Choice -2",
//     },
//   ],
//   content: "This is a test question",
//   flowMetadata: {
//     x: 10,
//     y: 10,
//   },
// });

// dummyQuestions.set("2", {
//   id: "2",
//   type: QuestionType.MCQuestion,
//   parent: {
//     type: ParentType.Choice,
//     choiceOrder: 0,
//     questionId: "1",
//   },
//   choices: [],
//   content: "This is a test question",
//   flowMetadata: {
//     x: 10,
//     y: 10,
//   },
// });
// dummyQuestions.set("3", {
//   id: "3",
//   type: QuestionType.MCQuestion,
//   parent: {
//     type: ParentType.Choice,
//     choiceOrder: 1,
//     questionId: "1",
//   },
//   choices: [],
//   content: "This is the third question",
//   flowMetadata: {
//     x: 10,
//     y: 10,
//   },
// });

const initialState: MainStore = {
  questionMap: QuestionMap.create([
    {
      choices: [
        {
          content: "1-c-1",
          child: "33b9f258-8ca8-4bbb-9c5b-fcde3f191e99",
        },
        {
          content: "1-c-2",
          child: "a82a4736-d470-4c6b-8c4f-3869b6e1b07c",
        },
      ],
      content: "",
      parents: [],
      id: "cc8ff60c-9260-4591-89f2-c2703c8b404f",
      type: QuestionType.MCQuestion,
    },
    {
      choices: [],
      content: "",
      parents: ["cc8ff60c-9260-4591-89f2-c2703c8b404f"],
      id: "a82a4736-d470-4c6b-8c4f-3869b6e1b07c",
      type: QuestionType.MCQuestion,
    },
    {
      choices: [],
      content: "",
      parents: ["33b9f258-8ca8-4bbb-9c5b-fcde3f191e99"],
      id: "84c3c726-2e97-43ba-ba78-cc2b4f870270",
      type: QuestionType.MCQuestion,
    },
    {
      content: "",
      parents: ["cc8ff60c-9260-4591-89f2-c2703c8b404f"],
      choices: [
        {
          lower: 1,
          upper: 5,
          child: "84c3c726-2e97-43ba-ba78-cc2b4f870270",
        },
      ],
      id: "33b9f258-8ca8-4bbb-9c5b-fcde3f191e99",
      type: QuestionType.RangeQuestion,
    },
    {
      content: "",
      parents: [],
      choices: [
        {
          lower: 2,
          upper: 6,
        },
      ],
      id: "4fbd309e-575d-494a-a8ba-bdc04e19e8e1",
      type: QuestionType.RangeQuestion,
    },
  ]),
  flowUI: {
    selectedEntities: [],
  },
};

const useStore = create<MainState>(
  devtools((set, get) => ({
    ...initialState,
    setQuestionFlowMetadata: ({ id, flowMetadata }) => {
      set((s) => {
        s.questionMap.get(id)!.flowData = flowMetadata;
      });
    },
    updateQuestionContent: ({ id, content }) => {
      set((s) => {
        s.questionMap.get(id)!.content = content;
      });
    },
    deleteQuestion: (id: string) => {
      set((s) => {
        s.questionMap.remove(id);
      });
    },
    updateMCQuestionChoiceContent({ id, content, order }) {
      set((s) => {
        (s.questionMap.get(id) as MCQuestion).updateChoiceContent(
          content,
          order
        );
      });
    },

    setSelectedEntity(entities) {
      set((s) => {
        s.flowUI.selectedEntities = entities;
      });
    },

    handleConnection({ childHandleId, childId, parentHandleId, parentId }) {
      set((s) => {
        const parentQuestion = s.questionMap.get(parentId);

        switch (parentQuestion?.type) {
          case QuestionType.MCQuestion:
            s.questionMap.connectToMCQ(parentId, {
              choiceOrder: +parentHandleId!,
              childId,
            });
            return;
          case QuestionType.RangeQuestion:
            s.questionMap.connectToRange(parentId, {
              choiceOrder: +parentHandleId!,
              childId,
            });
            return;

          default:
            return;
        }
      });
    },
  }))
);
