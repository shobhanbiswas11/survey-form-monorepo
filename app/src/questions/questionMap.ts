import {
  MCQuestion,
  MCQuestionAddChildProp,
  MCQuestionAttrs,
} from "./mCQuestion";
import {
  RangeQuestion,
  RangeQuestionAddChildProp,
  RangeQuestionAttrs,
} from "./rangeQuestion";
import { QuestionType } from "./type";

export type Question = MCQuestion | RangeQuestion;

export class QuestionMap {
  private _map: Map<string, Question> = new Map();

  add(question: Question) {
    this._map.set(question.id, question);
    return this;
  }

  remove(id: string) {
    const question = this._map.get(id);
    if (!question) throw new Error("No question found with that id");

    question.parents.forEach((parentId) => {
      this._map.get(parentId)!.removeChild(id);
    });

    question.connectedChildren.forEach((childId) => {
      this.get(childId)!.removeParent(id);
    });
    this._map.delete(id);

    return this;
  }

  disconnect(parentId: string, childId: string) {
    this._map.get(parentId)?.removeChild(childId);
    this._map.get(childId)?.removeParent(parentId);
  }

  connectToMCQ(parentId: string, props: MCQuestionAddChildProp) {
    const child = this._map.get(props.childId);
    const parent = this._map.get(parentId) as MCQuestion;
    child!.addParent(parentId);
    parent!.addChild(props);
    return this;
  }

  connectToRange(parentId: string, props: RangeQuestionAddChildProp) {
    const child = this._map.get(props.childId);
    const parent = this._map.get(parentId) as RangeQuestion;
    child!.addParent(parentId);
    parent!.addChild(props);
  }

  get questions() {
    return Array.from(this._map.values());
  }

  get(id: string) {
    return this._map.get(id);
  }

  static create(questions: (RangeQuestionAttrs | MCQuestionAttrs)[]) {
    const map = new this();
    questions.forEach((question) => {
      if (question.type === QuestionType.MCQuestion) {
        map.add(new MCQuestion(question));
      }

      switch (question.type) {
        case QuestionType.MCQuestion:
          map.add(new MCQuestion(question));
          break;
        case QuestionType.RangeQuestion:
          map.add(new RangeQuestion(question));
          break;
        default:
          break;
      }
    });

    return map;
  }
}
