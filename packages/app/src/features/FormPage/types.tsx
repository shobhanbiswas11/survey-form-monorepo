interface FormPageCommon {
  id: string;
  order: number;
}

export interface MCQuestionFormPage extends FormPageCommon {
  choiceId?: string;
}

export interface TextQuestionFormPage extends FormPageCommon {
  inputValue?: string;
}

export type FormPage = MCQuestionFormPage | TextQuestionFormPage;
