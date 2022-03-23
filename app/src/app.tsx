import Flow from "components/Flow";
import React from "react";
import "./app.css";

const initialNodes = [
  {
    id: "1",
    type: "mCQuestionNode",
    data: { label: "questionNode" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: "Default Node" },
    position: { x: 550, y: 200 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 550, y: 500 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "1" },
  { id: "e2-3", source: "1", target: "3", sourceHandle: "2" },
];

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-800 text-white p-8">
      <Flow />
    </div>
  );
};

export default App;
