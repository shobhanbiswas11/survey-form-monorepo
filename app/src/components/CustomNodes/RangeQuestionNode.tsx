import { RangeQuestion } from "questions";
import { FC } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { MainState, useStore } from "store";
import NodeTextInput from "./Input";
import NodeWrapper from "./Wrapper";

const selector = (s: MainState) => ({
  updateContent: s.updateQuestionContent,
  updateChoiceContent: s.updateMCQuestionChoiceContent,
});

const RangeQuestionNode: FC<NodeProps<RangeQuestion>> = (props) => {
  const {
    id,
    data: { choices },
  } = props;
  const { updateContent, updateChoiceContent } = useStore(selector);

  function onContentUpdate(content: string) {
    updateContent({
      id,
      content,
    });
  }

  return (
    <>
      <Handle position={Position.Left} type="target" />

      <NodeWrapper {...props}>
        <div className="flex">
          <NodeTextInput
            content={props.data.content}
            onEditingDone={onContentUpdate}
            className="w-2/3 mr-2"
          />

          <div className="w-1/3">
            {choices.map(({ lower, upper }, i) => (
              <div className="relative mb-2 last:mb-0 " key={0}>
                <div className="flex items-center">
                  <NodeTextInput
                    content={lower.toString()}
                    onEditingDone={(content) => {}}
                    className="w-1/2"
                  />
                  <div className="mx-1">-</div>
                  <NodeTextInput
                    content={upper.toString()}
                    onEditingDone={(content) => {}}
                    className="w-1/2"
                  />
                </div>
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

export default RangeQuestionNode;
