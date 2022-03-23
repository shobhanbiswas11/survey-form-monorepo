import { MCQuestion } from "questions";
import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { MainState, useStore } from "store";
import NodeTextInput from "./Input";
import NodeWrapper from "./Wrapper";

const selector = (s: MainState) => ({
  updateContent: s.updateQuestionContent,
  updateChoiceContent: s.updateMCQuestionChoiceContent,
});

const MCQuestionNode: FC<NodeProps<MCQuestion>> = (props) => {
  const {
    id,
    data: { content, choices },
  } = props;
  const { updateContent, updateChoiceContent } = useStore(selector);

  function onContentUpdate(content: string) {
    updateContent({
      id,
      content,
    });
  }

  function onChoiceContentUpdate(content: string, order: number) {
    updateChoiceContent({
      id,
      content,
      order,
    });
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />

      <NodeWrapper {...props}>
        <div className="flex">
          <NodeTextInput
            content={content}
            onEditingDone={onContentUpdate}
            className="w-2/3 mr-2"
          />

          <div className="w-1/3">
            {choices.map((choice, i) => (
              <div className="relative mb-2 last:mb-0" key={i}>
                <NodeTextInput
                  content={choice.content}
                  onEditingDone={(content) => {
                    onChoiceContentUpdate(content, i);
                  }}
                />
                <Handle
                  type="source"
                  id={i.toString()}
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
          </div>
        </div>
      </NodeWrapper>
    </>
  );
};

export default memo(MCQuestionNode);
