import { MCQuestionNode, TextInputQuestion } from "components/CustomNodes";
import { QuestionType } from "features/questions";

enum CustomNode {
  MCQuestionNode = "MCQuestionNode",
  TextInputQuestionNode = "TextInputQuestionNode",
}

export const questionTypeNodeTypeMap = {
  [QuestionType.MCQuestion]: [CustomNode.MCQuestionNode],
  [QuestionType.TextInputQuestion]: [CustomNode.TextInputQuestionNode],
} as const;

export const nodeTypes = {
  [CustomNode.MCQuestionNode]: MCQuestionNode,
  [CustomNode.TextInputQuestionNode]: TextInputQuestion,
};
