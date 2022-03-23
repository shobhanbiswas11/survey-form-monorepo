import { QuestionMap } from "questions";

interface SelectedEntity {
  type: "edge" | "node";
  id: string;
}

export type MainStore = {
  questionMap: QuestionMap;
  flowUI: {
    selectedEntities: SelectedEntity[];
  };
};

export type MainAction = {
  setQuestionFlowMetadata: (props: { id: string; flowMetadata: any }) => void;
  updateQuestionContent: (props: { id: string; content: string }) => void;
  deleteQuestion: (id: string) => void;
  updateMCQuestionChoiceContent: (props: {
    id: string;
    order: number;
    content: string;
  }) => void;
  handleConnection: (props: {
    parentId: string;
    childId: string;
    parentHandleId: string | null;
    childHandleId: string | null;
  }) => void;
};

export type FlowUIAction = {
  setSelectedEntity: (entities: SelectedEntity[]) => void;
};

export type MainState = MainStore & MainAction & FlowUIAction;
