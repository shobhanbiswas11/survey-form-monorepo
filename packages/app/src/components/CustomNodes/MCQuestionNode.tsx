import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { MCQuestion, questionActions } from "features/questions";
import { useAppDispatch } from "hooks";
import produce from "immer";
import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { generate } from "shortid";
import NodeHeader from "./Header";
import NodeTextInput from "./Input";
import NodeWrapper from "./Wrapper";

const MCQuestionNode: FC<NodeProps<MCQuestion>> = (props) => {
  const dispatch = useAppDispatch();
  const question = props.data;

  const onContentUpdate = (content: string) => {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          content,
        },
      })
    );
  };

  function onChoiceContentUpdate(content: string, id: string) {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          choices: produce(question.choices, (draft) => {
            for (const choice of draft) {
              if (choice.id === id) choice.content = content;
            }
          }),
        },
      })
    );
  }

  function handleChoiceRemove(id: string) {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          choices: question.choices.filter((choice) => choice.id !== id),
        },
      })
    );
  }

  function handleAddChoice() {
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          choices: [
            ...question.choices,
            {
              id: generate(),
              content: "",
            },
          ],
        },
      })
    );
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />

      <NodeWrapper {...props}>
        <NodeHeader {...question} />

        <div className="flex">
          <NodeTextInput
            content={question.content}
            onEditingDone={onContentUpdate}
            className="w-2/3 mr-2"
          />

          <div className="w-1/3">
            {question.choices.map((choice) => (
              <div className="relative mb-2 last:mb-0 flex" key={choice.id}>
                <MinusCircleIcon
                  className="w-8 cursor-pointer mr-2 flex-none"
                  onClick={handleChoiceRemove.bind(null, choice.id)}
                />
                <NodeTextInput
                  content={choice.content}
                  onEditingDone={(content) => {
                    onChoiceContentUpdate(content, choice.id);
                  }}
                  className="w-full"
                />
                <Handle
                  type="source"
                  id={choice.id}
                  position={Position.Right}
                  style={{
                    top: "50%",
                    right: 0,
                    background: "#555",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            ))}
            <PlusCircleIcon
              className="w-8 cursor-pointer"
              onClick={handleAddChoice}
            />
          </div>
        </div>
      </NodeWrapper>
    </>
  );
};

export default memo(MCQuestionNode);
