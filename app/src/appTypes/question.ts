import { FlowMetadata } from "components/Flow";
export type { FlowMetadata };

export enum QuestionType {
  MCQuestion = "MCQuestion",
  RangeQuestion = "RangeQuestion",
  //   ShortInputQuestion = "ShortInputQuestion",
  //   LongInputQuestion = "LongInputQuestion",
}

export enum ParentType {
  Question = "Question",
  Choice = "Choice",
}

export type QuestionParentType = {
  type: ParentType.Question;
};
export type ChoiceParentType = {
  type: ParentType.Choice;
  questionId: string;
  choiceOrder: number;
};

interface Question {
  id: string;
  flowMetadata: FlowMetadata;
  parent: QuestionParentType | ChoiceParentType | null;
}

export interface Choice {
  child?: string;
  content: string;
}

export interface MCQuestion extends Question {
  type: QuestionType.MCQuestion;
  content: string;
  choices: Choice[];
}

export interface RangeQuestion extends Question {
  type: QuestionType.RangeQuestion;
  content: string;
}
