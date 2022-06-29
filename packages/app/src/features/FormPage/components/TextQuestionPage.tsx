import { TextInputQuestion } from "features/questions";
import { useAppDispatch } from "hooks";
import React from "react";
import { formPageActions } from "../slice";
import { TextQuestionFormPage } from "../types";

const TextQuestionPage = ({
  question: { id, content },
  formPage: { inputValue = "" },
}: {
  question: TextInputQuestion;
  formPage: TextQuestionFormPage;
}) => {
  const dispatch = useAppDispatch();
  console.log(inputValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      formPageActions.update({
        id,
        changes: {
          inputValue: e.target.value,
        },
      })
    );
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{content}</h1>
      <input
        type="text"
        className="p-3 border-[1px] border-gray-500 bg-transparent w-full rounded-md"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
export default TextQuestionPage;
