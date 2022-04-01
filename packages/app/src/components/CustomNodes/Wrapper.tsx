import { Question } from "features/questions";
import { FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { clx } from "utils";

// const selector = (s: MainState) => ({
//   updateContent: s.updateQuestionContent,
//   selectedId: s.,
//   setSelected: s.setSelectedNode,
// });

const NodeWrapper: FC<NodeProps<Question>> = ({
  id,
  children,
  data,
  selected,
}) => {
  return (
    <div
      className={clx([
        "w-[400px] min-h-[100px] bg-slate-400 text-gray-800 rounded-md p-3",
        selected ? "bg-orange-200" : "bg-slate-400",
      ])}
    >
      {children}
    </div>
  );
};

export default NodeWrapper;
