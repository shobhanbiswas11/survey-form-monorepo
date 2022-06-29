import { Question } from "features/questions";

export abstract class DetailsRenderer<T extends Question = any> {
  constructor(protected question: T) {}

  protected renderQuestionContent() {
    return (
      <div className="text-2xl my-10 font-bold">{this.question.content}</div>
    );
  }

  setQuestion(question: T) {
    this.question = question;
  }

  abstract render(): JSX.Element;
}

export class AnyQuestionRenderer extends DetailsRenderer {
  render(): JSX.Element {
    return <div>No details to show for this type of question</div>;
  }
}
