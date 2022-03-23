import { v4 } from "uuid";
import { QuestionType } from "./type";

export interface CommonAttr {
  type: QuestionType;
  id: string;
  content: string;
  parents: string[];
  flowData?: any;
}

export abstract class QuestionBase<T extends CommonAttr> implements CommonAttr {
  protected abstract _type: QuestionType;
  protected attr!: T;

  constructor(attr: Omit<T, "id" | "type"> & { id?: string }) {
    if (!attr.id) attr.id = v4();
    // @ts-ignore
    this.attr = attr;
  }

  abstract addChild(props: { childId: string }): typeof this;
  abstract removeChild(id: string): typeof this;
  abstract get connectedChildren(): string[];

  get id() {
    return this.attr.id;
  }
  get content() {
    return this.attr.content;
  }
  get parents() {
    return this.attr.parents;
  }
  get type() {
    return this._type;
  }
  get flowData() {
    return this.attr.flowData;
  }

  set content(content: string) {
    this.attr.content = content;
  }
  set flowData(d: any) {
    this.attr.flowData = d;
  }

  addParent(id: string) {
    this.attr.parents.push(id);
  }
  removeParent(id: string) {
    this.attr.parents = this.attr.parents.filter((p) => p !== id);
  }

  serialize(): T {
    return {
      ...this.attr,
      type: this._type,
    };
  }
}
