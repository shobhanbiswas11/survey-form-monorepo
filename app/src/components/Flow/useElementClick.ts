import { useKeyPress } from "react-flow-renderer";
import { MainState, useStore } from "store";
import shallow from "zustand/shallow";

const selector = (s: MainState) => ({
  selectedEntities: s.flowUI.selectedEntities,
  setSelectedEntities: s.setSelectedEntity,
});

export function useElementClick() {
  const { selectedEntities, setSelectedEntities } = useStore(selector, shallow);
  const shiftKeyPressed = useKeyPress("Shift");

  const handleNodeClick = (nodeId: string) => {
    return setSelectedEntities([
      ...(shiftKeyPressed ? selectedEntities : []),
      {
        id: nodeId,
        type: "node",
      },
    ]);
  };
  const handleEdgeClick = (edgeId: string) => {
    return setSelectedEntities([
      ...(shiftKeyPressed ? selectedEntities : []),
      {
        id: edgeId,
        type: "edge",
      },
    ]);
  };

  const handlePaneClicked = () => {
    setSelectedEntities([]);
  };

  const isSelected = (id: string) => {
    return Boolean(selectedEntities.find((e) => e.id === id));
  };

  return { handleEdgeClick, handleNodeClick, isSelected, handlePaneClicked };
}
