import { FC } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import NodeTextInput from "./Input";
import NodeWrapper from "./Wrapper";

const RangeQuestionNode: FC<NodeProps> = (props) => {
  const onContentUpdate = (content: string) => {};

  function onChoiceContentUpdate(
    content: string,
    order: number,
    slot: "lower" | "upper"
  ) {}

  return (
    <>
      <Handle position={Position.Left} type="target" />

      <NodeWrapper {...props}>
        <div className="flex">
          <NodeTextInput
            content=""
            onEditingDone={onContentUpdate}
            className="w-2/3 mr-2"
          />

          {/* <div className="w-1/3">
            {question.choices.map(({ lower, upper }, i) => (
              <div className="relative mb-2 last:mb-0 " key={0}>
                <div className="flex items-center">
                  <NodeTextInput
                    content={lower.toString()}
                    onEditingDone={(content) => {
                      onChoiceContentUpdate(content, i, "lower");
                    }}
                    className="w-1/2"
                  />
                  <div className="mx-1">-</div>
                  <NodeTextInput
                    content={upper.toString()}
                    onEditingDone={(content) => {
                      onChoiceContentUpdate(content, i, "upper");
                    }}
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
          </div> */}
        </div>
      </NodeWrapper>
    </>
  );
};

export default RangeQuestionNode;
