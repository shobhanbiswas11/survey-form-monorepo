import { FlowMetadata, MCQuestion, RangeQuestion } from "./question";

export type Question = MCQuestion | RangeQuestion;

export type MainStore = {
  questions: Map<string, Question>;
  selectedQuestionNodeId: string | null;
};

export type MainAction = {
  setQuestionFlowMetadata: (question: {
    id: string;
    flowMetadata: FlowMetadata;
  }) => void;
  updateQuestionContent: (props: { id: string; content: string }) => void;
  updateSelectedQuestionNode: (id: string) => void;
  deleteQuestion: (id: string) => void;
};

export type MainState = MainStore & MainAction;
