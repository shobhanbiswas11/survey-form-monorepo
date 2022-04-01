import { removeFalsy } from "utils";
import { Question, QuestionType } from "./types";

export function getChildren(question: Question) {
  const children: (string | undefined)[] = [];

  if (question.type === QuestionType.TextInputQuestion) {
    children.push(question.child);
  }

  if (question.type === QuestionType.MCQuestion) {
    for (const choice of question.choices) {
      children.push(choice.child);
    }
  }

  return removeFalsy(children);
}
