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

export interface Suggestion {
  id: string;
  content: string;
}

export interface MCQuestionChoice {
  id: string;
  content: string;
  child?: string;
  point?: number;
  suggestions?: Suggestion[];
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

export function questionIsMCQ(question: CommonAttrs): question is MCQuestion {
  return question.type === QuestionType.MCQuestion;
}

export function questionIsTextType(
  question: CommonAttrs
): question is TextInputQuestion {
  return question.type === QuestionType.TextInputQuestion;
}
