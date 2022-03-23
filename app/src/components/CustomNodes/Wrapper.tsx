import { useElementClick } from "components/Flow/useElementClick";
import { Question } from "questions";
import { FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { clx } from "utils";
import { NodeSemanticName } from "./NodeSemanticNames";

// const selector = (s: MainState) => ({
//   updateContent: s.updateQuestionContent,
//   selectedId: s.,
//   setSelected: s.setSelectedNode,
// });

const NodeWrapper: FC<NodeProps<Question>> = ({ id, children, data }) => {
  const { handleNodeClick, isSelected } = useElementClick();

  return (
    <div
      className={clx([
        "w-[400px] min-h-[100px] bg-slate-400 text-gray-800 rounded-md p-3 cursor-auto",
        isSelected(id) ? "bg-orange-200" : "bg-slate-400",
      ])}
      onMouseDown={handleNodeClick.bind(null, id)}
    >
      <div className="pb-6 flex justify-between items-start cursor-grab">
        <span className="px-2 py-1 rounded-md bg-slate-700 text-white text-xs">
          {NodeSemanticName[data.type]}
        </span>
      </div>
      {children}
    </div>
  );
};

export default NodeWrapper;
