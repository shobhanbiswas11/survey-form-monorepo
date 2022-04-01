import { Button } from "components";
import { formSelectors } from "features/form";
import { questionSelector, QuestionType } from "features/questions";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formPageActions, formPageSelectors } from "../slice";
import { MCQuestionFormPage } from "../types";
import MCQPage from "./MCQPage";
import TextQuestionPage from "./TextQuestionPage";

const FormPage = () => {
  const dispatch = useAppDispatch();
  const formHead = useAppSelector(formSelectors.head);
  const allFromPages = useSelector(formPageSelectors.selectAll);
  const currentFormPage = allFromPages[allFromPages.length - 1];
  const question = useAppSelector((s) =>
    questionSelector.selectById(s, currentFormPage?.id)
  );

  useEffect(() => {
    dispatch(
      formPageActions.set([
        {
          id: formHead,
          order: 0,
        },
      ])
    );
  }, [formHead]);

  if (!question || !currentFormPage) return null;
  function renderQuestion() {
    if (!question) return null;
    switch (question.type) {
      case QuestionType.MCQuestion:
        return <MCQPage {...question} />;
      case QuestionType.TextInputQuestion:
        return <TextQuestionPage {...question} />;

      default:
        return null;
    }
  }

  const isHead = formHead === question.id;
  const handleNextBtnClicked = () => {
    let child: string | undefined;

    switch (question.type) {
      case QuestionType.MCQuestion:
        const choiceId = (currentFormPage as MCQuestionFormPage).choiceId;
        if (choiceId)
          child = question.choices.find((c) => c.id === choiceId)?.child;
        // if (!child) child = questionUtils.getChildren(question)[0];
        break;
      case QuestionType.TextInputQuestion:
        child = question.child;
        break;

      default:
        break;
    }

    if (child) {
      dispatch(
        formPageActions.add({
          id: child,
          order: allFromPages.length,
        })
      );
    }
  };

  const handlePrevBtnClicked = () => {
    if (question.id === formHead) return;
    dispatch(formPageActions.remove(question.id));
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-2/3 max-w-4xl">
        <div className="text-center">{renderQuestion()}</div>
        <div className="flex mt-20">
          {!isHead && (
            <Button className="w-full mr-2" onClick={handlePrevBtnClicked}>
              Previous
            </Button>
          )}
          <Button className="w-full" onClick={handleNextBtnClicked}>
            Next
          </Button>
        </div>
      </div>

      <Link
        to="/"
        className="fixed bottom-10 right-10 p-4 bg-slate-200 rounded-md"
      >
        Return to Flow
      </Link>
    </div>
  );
};

export default FormPage;
