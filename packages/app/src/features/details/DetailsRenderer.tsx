import { Question } from "features/questions";

export abstract class DetailsRenderer<T extends Question = any> {
  constructor(protected question: T) {}

  setQuestion(question: T) {
    this.question = question;
  }

  abstract render(): JSX.Element;
}

export class AnyQuestionRenderer extends DetailsRenderer {
  render(): JSX.Element {
    return (
      <div>
        <div>No details to show for this type of question</div>
      </div>
    );
  }
}
