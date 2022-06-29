import { Button } from "components";
import { MCQuestion, questionActions } from "features/questions";
import { useAppDispatch } from "hooks";
import produce from "immer";
import { ChangeEvent } from "react";
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
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        questionActions.updateOne({
          id: question.id,
          changes: {
            choices: produce(question.choices, (draft) => {
              const choice = draft.find((c) => c.id === choiceId)!;
              const suggestion = choice.suggestions?.find(
                (s) => s.id === suggestionId
              )!;
              suggestion.content = e.target.value;
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
                  type="number"
                />
              </div>
            </div>

            <div className="ml-10 mt-4">
              <div className="mb-2">
                {suggestions.map((s) => (
                  <textarea
                    key={s.id}
                    value={s.content}
                    className="bg-transparent p-2 border-[1px] border-gray-500 rounded-md w-full mb-2 last:mb-0"
                    rows={2}
                    onChange={buildHandleUpdateSuggestion({
                      choiceId: choice.id,
                      suggestionId: s.id,
                    })}
                  />
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

export class MCQDetailsRenderer extends DetailsRenderer<MCQuestion> {
  render(): JSX.Element {
    return (
      <div>
        {this.renderQuestionContent()}
        <Choices question={this.question} />
      </div>
    );
  }
}
