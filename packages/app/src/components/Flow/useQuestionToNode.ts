import { Update } from "@reduxjs/toolkit";
import {
  Question,
  questionActions,
  questionSelector,
  QuestionType,
} from "features/questions";
import { useAppDispatch, useAppSelector } from "hooks";
import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "react-flow-renderer";
import { removeFalsy } from "utils";
import { questionsToEdges, questionsToNodes } from "./util";

export function useQuestionToNode() {
  const questions = useAppSelector(questionSelector.selectAll);
  const questionById = useAppSelector(questionSelector.selectEntities);
  const [nodes, setNodes] = useState(questionsToNodes(questions));
  const [edges, setEdges] = useState(questionsToEdges(questions));
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNodes(questionsToNodes(questions));
    setEdges(questionsToEdges(questions));
  }, [questions]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nodes) => applyNodeChanges(changes, nodes));

      const positionChangedQuestions: Update<Question>[] = removeFalsy(
        changes.map((change) => {
          if (change.type === "position" && change.position) {
            const question = questionById[change.id]!;
            return {
              id: question.id,
              changes: {
                flowData: change.position,
              },
            };
          }
        })
      );

      const deletedQuestions: string[] = removeFalsy(
        changes.map((change) => {
          if (change.type === "remove") {
            return change.id;
          }
        })
      );

      if (positionChangedQuestions.length > 0)
        dispatch(questionActions.updateMany(positionChangedQuestions));

      if (deletedQuestions.length > 0)
        dispatch(questionActions.deleteMany(deletedQuestions));
    },
    [questionById]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((edges) => applyEdgeChanges(changes, edges));

      const deletedConnections: {
        parent: string;
        child: string;
        choiceId: string;
      }[] = removeFalsy(
        changes.map((change) => {
          if (change.type === "remove") {
            const [parent, choiceId, child] = change.id.split("-&&-");
            return {
              parent,
              child,
              choiceId,
            };
          }
        })
      );

      for (const connection of deletedConnections) {
        const { parent, choiceId } = connection;
        const parentQuestion = questionById[parent];
        switch (parentQuestion?.type) {
          case QuestionType.MCQuestion:
            dispatch(
              questionActions.updateOne({
                id: parentQuestion.id,
                changes: {
                  choices: produce(parentQuestion.choices, (choices) => {
                    for (const choice of choices) {
                      if (choice.id === choiceId) choice.child = undefined;
                    }
                  }),
                },
              })
            );
            break;
          case QuestionType.TextInputQuestion:
            dispatch(
              questionActions.updateOne({
                id: parentQuestion.id,
                changes: {
                  child: undefined,
                },
              })
            );
            break;

          default:
            break;
        }
      }
    },
    [questionById]
  );

  const handleConnection: OnConnect = useCallback(
    ({ source, target, sourceHandle }) => {
      const sourceQuestion = questionById[source!];
      if (!sourceQuestion) return;

      switch (sourceQuestion.type) {
        case QuestionType.MCQuestion:
          dispatch(
            questionActions.updateOne({
              id: sourceQuestion.id,
              changes: {
                choices: produce(sourceQuestion.choices, (choices) => {
                  for (const choice of choices) {
                    if (choice.id === sourceHandle) choice.child = target!;
                  }
                }),
              },
            })
          );
          break;
        case QuestionType.TextInputQuestion:
          dispatch(
            questionActions.updateOne({
              id: sourceQuestion.id,
              changes: {
                child: target!,
              },
            })
          );
          break;

        default:
          break;
      }
    },
    [questionById]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    handleConnection,
  };
}
