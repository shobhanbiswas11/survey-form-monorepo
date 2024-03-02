import {
  Button,
  QuestionSemanticName,
  RichTextEditor,
  useQuestionDetailsRouteParam,
} from "components";
import {
  Question,
  questionActions,
  questionSelector,
  QuestionType,
} from "features/questions";
import { useAppDispatch, useAppSelector } from "hooks";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
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

function QuestionPoint({ question }: { question: Question }) {
  const dispatch = useAppDispatch();

  function handleQuestionPointChange(e: ChangeEvent<HTMLInputElement>) {
    const point = e.target.value;
    dispatch(
      questionActions.updateOne({
        id: question.id,
        changes: {
          point: point as any,
        },
      })
    );
  }

  return (
    <div className="mt-2 flex justify-end items-baseline">
      <div className="mr-2 font-bold">Question Point</div>
      <input
        type="number"
        step="0.1"
        className="bg-transparent p-2  border-[1px] border-gray-500 rounded-md"
        value={question.point}
        onChange={handleQuestionPointChange}
      />
    </div>
  );
}

const QuestionDetails = () => {
  const dispatch = useAppDispatch();
  const { questionId } = useQuestionDetailsRouteParam();
  const question = useAppSelector((s) =>
    questionSelector.selectById(s, questionId!)
  );
  if (!question) return null;
  const renderer = getRenderer(question);

  function handleQuestionOverviewChange(value: string) {
    dispatch(
      questionActions.updateOne({
        id: question?.id!,
        changes: {
          overview: value,
        },
      })
    );
  }

  return (
    <div className="bg-slate-800 text-white min-h-screen py-10">
      <div className="container mx-auto">
        <div className="mb-10">
          <div className="p-4 bg-slate-600 rounded-md">
            <div className="flex items-start">
              <div className="text-xs font-extrabold px-4 py-2 bg-slate-700 text-white inline-block rounded-md mb-2">
                {QuestionSemanticName[question?.type!]}
              </div>
              <Link to="/" className="ml-auto">
                <Button className="text-sm mb-6">Back to flow</Button>
              </Link>
            </div>
            <div className="mb-6">
              <h1 className="mb-1 font-bold">Question Overview</h1>
              <RichTextEditor
                onChange={handleQuestionOverviewChange}
                value={question.overview || ""}
              />
            </div>
            <div className="text-xl font-bold">{question.content}</div>
          </div>
          <QuestionPoint question={question} />
        </div>

        {renderer.render()}
      </div>
    </div>
  );
};

export default QuestionDetails;
