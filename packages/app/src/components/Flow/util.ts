import { Question, QuestionType } from "features/questions";
import { Edge, Node } from "react-flow-renderer";
import { questionTypeNodeTypeMap } from "./nodeType";

export function questionsToEdges(questions: Question[]): Edge[] {
  const edges: Edge[] = [];
  questions.forEach((question) => {
    switch (question.type) {
      case QuestionType.MCQuestion:
        question.choices.forEach((choice) => {
          if (!choice.child) return;
          // Check if the child exist or not
          if (!questions.find((q) => q.id === choice.child)) return;
          const id = `${question.id}-&&-${choice.id}-&&-${choice.child}`;
          edges.push({
            id,
            source: question.id,
            target: choice.child,
            sourceHandle: choice.id,
            style: {
              strokeWidth: "5px",
            },
          });
        });

        break;
      case QuestionType.TextInputQuestion:
        if (!question.child) return;
        if (!questions.find((q) => q.id === question.child)) return;

        edges.push({
          id: `${question.id}-&&-${0}-&&-${question.child}`,
          source: question.id,
          target: question.child,
          style: {
            strokeWidth: "5px",
          },
        });
        break;

      default:
        break;
    }
  });

  return edges;
}

export function questionsToNodes(questions: Question[]): Node[] {
  return questions.map((question) => {
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
