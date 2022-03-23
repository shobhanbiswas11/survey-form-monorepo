import { QuestionType } from "appTypes";
import { QuestionMap } from "questions";
import { Edge, Node } from "react-flow-renderer";
import { questionTypeNodeTypeMap } from "./nodeType";

export function questionsToEdges(
  map: QuestionMap,
  isSelected: (id: string) => boolean
): Edge[] {
  const edges: Edge[] = [];
  map.questions.forEach((question) => {
    if (
      question.type === QuestionType.MCQuestion ||
      question.type === QuestionType.RangeQuestion
    ) {
      question.choices.forEach((choice, i) => {
        if (!choice.child) return;
        const id = `${question.id}-${i}-${choice.child}`;
        edges.push({
          id,
          source: question.id,
          target: choice.child,
          sourceHandle: i.toString(),
          style: {
            strokeWidth: "5px",

            stroke: isSelected(id) ? "lightsalmon" : "",
          },
          animated: isSelected(id),
        });
      });
    }
  });

  return edges;
}

export function questionsToNodes(map: QuestionMap): Node[] {
  return map.questions.map((question) => {
    return {
      id: question.id,
      data: question,
      position: {
        x: question.flowData?.x || 10,
        y: question.flowData?.y || 10,
      },
      type: questionTypeNodeTypeMap[question.type].toString(),
    };
  });
}
