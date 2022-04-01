export enum QuestionType {
  MCQuestion = "MCQuestion",
  TextInputQuestion = "TextInputQuestion",
}

interface CommonAttrs {
  id: string;
  type: QuestionType;
  content: string;
  flowData?: {
    x: number;
    y: number;
  };
}

export interface MCQuestionChoice {
  id: string;
  content: string;
  child?: string;
}

export interface MCQuestion extends CommonAttrs {
  type: QuestionType.MCQuestion;
  choices: MCQuestionChoice[];
}

export interface TextInputQuestion extends CommonAttrs {
  type: QuestionType.TextInputQuestion;
  child?: string;
}

export type Question = TextInputQuestion | MCQuestion;
