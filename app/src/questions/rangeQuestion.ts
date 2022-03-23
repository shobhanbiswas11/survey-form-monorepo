import { CommonAttr, QuestionBase } from "./questionBase";
import { QuestionType } from "./type";

export type RangeQuestionAddChildProp = {
  childId: string;
  choiceOrder: number;
};

export interface RangeQuestionChoice {
  upper: number;
  lower: number;
  child?: string;
}

export interface RangeQuestionAttrs extends CommonAttr {
  type: QuestionType.RangeQuestion;
  choices: RangeQuestionChoice[];
}

export class RangeQuestion extends QuestionBase<RangeQuestionAttrs> {
  protected _type: QuestionType.RangeQuestion = QuestionType.RangeQuestion;

  get choices() {
    return this.attr.choices;
  }
  set choices(choices: RangeQuestionChoice[]) {
    this.attr.choices = choices;
  }

  addChild({ choiceOrder, childId }: RangeQuestionAddChildProp) {
    const choice = this.choices[choiceOrder];
    if (!choice) throw new Error("No choice found with that order");
    choice.child = childId;
    return this;
  }

  removeChild(childId: string) {
    this.choices = this.choices.map((choice) => {
      if (choice.child !== childId) return choice;
      return {
        ...choice,
        child: undefined,
      };
    });
    return this;
  }

  addChoice(choice: RangeQuestionChoice) {
    this.choices.push(choice);
    return this;
  }
  removeChoice(choice: RangeQuestionChoice) {
    this.choices = this.choices.filter((c) => c !== choice);
    return this;
  }

  updateChoiceContent(
    content: { upper: number; lower: number },
    order: number
  ) {
    this.choices[order].lower = content.lower;
    this.choices[order].upper = content.upper;
  }

  get connectedChildren(): string[] {
    return this.choices.map((c) => c.child).filter(Boolean) as string[];
  }
}
