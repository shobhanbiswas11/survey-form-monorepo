import { QuestionType } from "features/questions";

export const NodeSemanticName = {
  [QuestionType.MCQuestion]: "MCQ",
  [QuestionType.TextInputQuestion]: "Text Input Question",
} as const;
