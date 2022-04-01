import { uiActions, uiSelectors } from "features/UI";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowInstance,
  ReactFlowProvider,
  useViewport,
} from "react-flow-renderer";
import { nodeTypes } from "./nodeType";
import FlowTray from "./Tray";
import { useQuestionToNode } from "./useQuestionToNode";

export interface FlowMetadata {
  x: number;
  y: number;
}

export interface UpdateFlowMetadataEvent {
  id: string;
  newMetadata: FlowMetadata;
}

const Flow = () => {
  const dispatch = useAppDispatch();
  const flowViewPort = useAppSelector(uiSelectors.flowViewPort);
  const { edges, nodes, onEdgesChange, onNodesChange, handleConnection } =
    useQuestionToNode();
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const viewPortFromHook = useViewport();

  useEffect(() => {
    if (rfInstance) {
      rfInstance.setViewport(flowViewPort);
    }
  }, [rfInstance]);

  useEffect(() => {
    if (viewPortFromHook.x === 0) return;
    dispatch(uiActions.setFlowViewPort(viewPortFromHook));
  }, [viewPortFromHook]);

  return (
    <div className="bg-gray-900 h-full relative">
      <FlowTray />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnection}
        minZoom={Number.NEGATIVE_INFINITY}
        onInit={setRfInstance}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
