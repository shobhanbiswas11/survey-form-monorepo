import { useCallback } from "react";
import ReactFlow, { OnConnect, OnNodesChange } from "react-flow-renderer";
import { MainState, useStore } from "store";
import Controller from "./Controler";
import { nodeTypes } from "./nodeType";
import { useElementClick } from "./useElementClick";
import { questionsToEdges, questionsToNodes } from "./util";

export interface FlowMetadata {
  x: number;
  y: number;
}

export interface UpdateFlowMetadataEvent {
  id: string;
  newMetadata: FlowMetadata;
}

const selector = (state: MainState) => ({
  questionMap: state.questionMap,
  updateFlowMetadata: state.setQuestionFlowMetadata,
  deleteQuestionNode: state.deleteQuestion,
  handleConnect: state.handleConnection,
});

export default function Flow() {
  const { handleEdgeClick, handlePaneClicked, isSelected } = useElementClick();
  const { questionMap, updateFlowMetadata, handleConnect } = useStore(selector);

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    changes.map((change) => {
      if (change.type === "position") {
        updateFlowMetadata({
          id: change.id,
          flowMetadata: {
            x: change.position?.x!,
            y: change.position?.y!,
          },
        });
      }
    });
  }, []);

  const onConnect: OnConnect = useCallback((connection) => {
    handleConnect({
      parentId: connection.source!,
      childId: connection.target!,
      parentHandleId: connection.sourceHandle,
      childHandleId: connection.targetHandle,
    });
  }, []);

  return (
    <div className="bg-gray-900 h-full relative">
      <Controller />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={questionsToNodes(questionMap)}
        edges={questionsToEdges(questionMap, isSelected)}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onPaneClick={handlePaneClicked}
        onEdgeClick={(_, edge) => {
          handleEdgeClick(edge.id);
        }}
        selectionKeyCode={null}
      />
    </div>
  );
}
