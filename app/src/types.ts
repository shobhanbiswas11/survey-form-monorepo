interface Position {
  x: number;
  y: number;
}

export interface QuestionNode {
  id: string;
  position: Position;
  zIndex: number;
  dimension: {
    height: number;
    width: number;
  };
}

export interface Connection {
  id: string;
  start: Position;
  end: Position;
}

interface OptionNode {
  id: string;
}

export interface MCQuestionNode extends QuestionNode {
  optionNode: OptionNode[];
}
