import { RadioGroup } from "@headlessui/react";
import { MCQuestion } from "features/questions";
import { useAppDispatch, useAppSelector } from "hooks";
import { formPageActions, formPageSelectors } from "../slice";
import { MCQuestionFormPage } from "../types";

const MCQPage = (question: MCQuestion) => {
  const dispatch = useAppDispatch();
  const formPage = useAppSelector((s) =>
    formPageSelectors.selectById(s, question.id)
  ) as MCQuestionFormPage;

  let selected: typeof question.choices[number] | undefined = undefined;
  if (formPage.choiceId) {
    selected = question.choices.find((c) => c.id === formPage.choiceId);
  }

  function handelSelected(choice: typeof question.choices[number]) {
    dispatch(
      formPageActions.update({
        id: formPage.id,
        changes: {
          choiceId: choice.id,
        },
      })
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{question.content}</h1>
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={handelSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {question.choices.map((choice, i) => (
              <RadioGroup.Option
                key={i}
                value={choice}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-primary-main bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {choice.content}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MCQPage;
