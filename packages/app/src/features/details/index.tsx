import { QuestionSemanticName, useQuestionDetailsRouteParam } from "components";
import { Question, questionSelector, QuestionType } from "features/questions";
import { useAppSelector } from "hooks";
import { AnyQuestionRenderer, DetailsRenderer } from "./DetailsRenderer";
import { MCQDetailsRenderer } from "./MCQRenderer";

function getRenderer(question: Question): DetailsRenderer {
  switch (question.type) {
    case QuestionType.MCQuestion:
      return new MCQDetailsRenderer(question);

    default:
      return new AnyQuestionRenderer(question);
  }
}

const QuestionDetails = () => {
  const { questionId } = useQuestionDetailsRouteParam();
  const question = useAppSelector((s) =>
    questionSelector.selectById(s, questionId!)
  );
  if (!question) return null;
  const renderer = getRenderer(question);

  return (
    <div className="bg-slate-800 text-white min-h-screen py-10">
      <div className="container mx-auto">
        <div className="p-4 bg-slate-300 text-gray-800 text-xl rounded-md">
          {QuestionSemanticName[question?.type!]}
        </div>
        {renderer.render()}
      </div>
    </div>
  );
};

export default QuestionDetails;
