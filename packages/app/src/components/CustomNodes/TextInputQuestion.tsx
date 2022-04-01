import { MCQuestion, questionActions } from "features/questions";
import { useAppDispatch } from "hooks";
import { FC, memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import NodeHeader from "./Header";
import NodeTextInput from "./Input";
import NodeWrapper from "./Wrapper";

const TextInputQuestionNode: FC<NodeProps<MCQuestion>> = (props) => {
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

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeWrapper {...props}>
        <NodeHeader {...question} />
        <div>
          <NodeTextInput
            content={question.content}
            onEditingDone={onContentUpdate}
          />
        </div>
      </NodeWrapper>
      <Handle type="source" id={"0"} position={Position.Right} />
    </>
  );
};

export default memo(TextInputQuestionNode);
