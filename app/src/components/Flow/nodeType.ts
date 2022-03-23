import { QuestionType } from "appTypes";
import { MCQuestionNode, RangeQuestionNode } from "components/CustomNodes";

enum CustomNode {
  MCQuestionNode = "MCQuestionNode",
  RangeQuestionNode = "RangeQuestionNode",
}

export const questionTypeNodeTypeMap = {
  [QuestionType.MCQuestion]: [CustomNode.MCQuestionNode],
  [QuestionType.RangeQuestion]: [CustomNode.RangeQuestionNode],
} as const;

export const nodeTypes = {
  [CustomNode.MCQuestionNode]: MCQuestionNode,
  [CustomNode.RangeQuestionNode]: RangeQuestionNode,
};
