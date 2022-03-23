import { CommonAttr, QuestionBase } from "./questionBase";
import { QuestionType } from "./type";

export type MCQuestionAddChildProp = { childId: string; choiceOrder: number };

export type MCQuestionChoice = {
  content: string;
  child?: string;
};

export interface MCQuestionAttrs extends CommonAttr {
  type: QuestionType.MCQuestion;
  choices: MCQuestionChoice[];
}

export class MCQuestion extends QuestionBase<MCQuestionAttrs> {
  protected _type: QuestionType.MCQuestion = QuestionType.MCQuestion;

  get choices() {
    return this.attr.choices;
  }
  set choices(choices: MCQuestionChoice[]) {
    this.attr.choices = choices;
  }

  addChild({ childId, choiceOrder }: MCQuestionAddChildProp) {
    if (!this.choices[choiceOrder])
      throw new Error("No Choice found with that order");
    this.choices = this.choices.map((c, i) => {
      if (choiceOrder !== i) return c;
      return {
        ...c,
        child: childId,
      };
    });
    return this;
  }

  removeChild(childId: string) {
    this.choices = this.choices.map((c) => {
      if (c.child !== childId) return c;
      return {
        ...c,
        child: undefined,
      };
    });
    return this;
  }

  addChoice(choice: MCQuestionChoice) {
    this.choices.push(choice);
    return this;
  }

  removeChoice(choice: MCQuestionChoice) {
    this.choices = this.choices.filter((c) => c !== choice);
    return this;
  }

  updateChoiceContent(content: string, order: number) {
    this.choices[order].content = content;
  }

  get connectedChildren(): string[] {
    return this.choices.map((c) => c.child).filter(Boolean) as string[];
  }
}
