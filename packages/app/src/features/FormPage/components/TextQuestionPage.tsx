import { TextInputQuestion } from "features/questions";
import { useAppDispatch } from "hooks";
import React from "react";
import { formPageActions } from "../slice";

const TextQuestionPage = ({ id, content }: TextInputQuestion) => {
  const dispatch = useAppDispatch();

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    dispatch(
      formPageActions.update({
        id,
        changes: {
          inputValue: e.target.value,
        },
      })
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{content}</h1>
      <input
        type="text"
        className="p-3 border-[1px] border-gray-500 bg-transparent w-full rounded-md"
        onBlur={handleBlur}
      />
    </div>
  );
};
export default TextQuestionPage;
