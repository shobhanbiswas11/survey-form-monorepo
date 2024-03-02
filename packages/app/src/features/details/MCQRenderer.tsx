import { Button, RichTextEditor } from "components";
import { MCQuestion, questionActions } from "features/questions";
import { useAppDispatch } from "hooks";
import produce from "immer";
import { ChangeEvent, useEffect } from "react";

import { useFormik } from "formik";
import { generateId } from "utils";
import { DetailsRenderer } from "./DetailsRenderer";

function Choices({ question }: { question: MCQuestion }) {
  const dispatch = useAppDispatch();

  function addSuggestion(choiceId: string) {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          choices: produce(question.choices, (draft) => {
            const choice = draft.find((c) => c.id === choiceId);
            if (choice) {
              choice.suggestions = [
                ...(choice.suggestions || []),
                {
                  id: generateId(),
                  content: "",
                },
              ];
            }
          }),
        },
      })
    );
  }

  function buildHandleUpdateSuggestion({
    choiceId,
    suggestionId,
  }: {
    choiceId: string;
    suggestionId: string;
  }) {
    return (value: string) => {
      dispatch(
        questionActions.updateOne({
          id: question.id,
          changes: {
            choices: produce(question.choices, (draft) => {
              const choice = draft.find((c) => c.id === choiceId)!;
              const suggestion = choice.suggestions?.find(
                (s) => s.id === suggestionId
              )!;
              suggestion.content = value;
            }),
          },
        })
      );
    };
  }

  function buildHandlePointChange(choiceId: string) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const point = e.target.value;
      dispatch(
        questionActions.updateOne({
          id: question.id,
          changes: {
            choices: produce(question.choices, (choices) => {
              const choice = choices.find((c) => c.id === choiceId)!;
              choice.point = point as any;
            }),
          },
        })
      );
    };
  }

  function buildHandleRemoveSuggestion({
    choiceId,
    suggestionId,
  }: {
    choiceId: string;
    suggestionId: string;
  }) {
    return () => {
      dispatch(
        questionActions.updateOne({
          id: question.id,
          changes: {
            choices: produce(question.choices, (draft) => {
              const choice = draft.find((c) => c.id === choiceId)!;
              choice.suggestions = choice.suggestions?.filter(
                (s) => s.id !== suggestionId
              );
            }),
          },
        })
      );
    };
  }

  return (
    <div>
      {question.choices.map((choice) => {
        const suggestions = choice.suggestions || [];

        return (
          <div className="mb-10 last:mb-0">
            <div className="flex items-center">
              <div className=" flex-auto p-2 border-[1px] border-gray-700">
                {choice.content}
              </div>

              <div className="ml-10">
                <span className="mr-2">Point</span>
                <input
                  className="bg-transparent p-2  border-[1px] border-gray-500 rounded-md"
                  value={choice.point}
                  onChange={buildHandlePointChange(choice.id)}
                  type="number"
                  step="0.1"
                />
              </div>
            </div>

            <div className="ml-10 mt-4">
              <div className="mb-2">
                {suggestions.map((s) => (
                  <div className="flex items-start mb-2 last:mb-0">
                    <RichTextEditor
                      value={s.content}
                      onChange={buildHandleUpdateSuggestion({
                        choiceId: choice.id,
                        suggestionId: s.id,
                      })}
                    />
                    <Button
                      className="ml-2"
                      onClick={buildHandleRemoveSuggestion({
                        choiceId: choice.id,
                        suggestionId: s.id,
                      })}
                    >
                      -
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className="text-xs"
                onClick={addSuggestion.bind(null, choice.id)}
              >
                Add Suggestion
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MultipleCorrect({ question }: { question: MCQuestion }) {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      allowMultiples: Boolean(question.multipleCorrect),
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          multipleCorrect: formik.values.allowMultiples,
        },
      })
    );
  }, [formik.values.allowMultiples]);

  return (
    <div className="mb-20 flex items-center">
      <input
        className="h-6 w-6 mr-6"
        type="checkbox"
        checked={formik.values.allowMultiples}
        {...formik.getFieldProps("allowMultiples")}
      />
      <label htmlFor="allowMultiples">Allow Multiple Correct</label>
    </div>
  );
}

export class MCQDetailsRenderer extends DetailsRenderer<MCQuestion> {
  render(): JSX.Element {
    return (
      <div>
        <MultipleCorrect question={this.question} />
        <Choices question={this.question} />
      </div>
    );
  }
}
