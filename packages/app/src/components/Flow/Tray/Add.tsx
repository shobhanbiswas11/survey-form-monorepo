import { Menu, Transition } from "@headlessui/react";
import { questionActions, QuestionType } from "features/questions";
import { useAppDispatch } from "hooks";
import React, { Fragment } from "react";
import { useViewport } from "react-flow-renderer";
import { v4 } from "uuid";

function useHandleAdd() {
  const { x, y } = useViewport();
  const dispatch = useAppDispatch();

  function add(questionType: QuestionType) {
    const xPos = window.innerWidth / 2 + Math.random() * 100 - x;
    const yPos = window.innerHeight / 2 + Math.random() * 100 - y;

    switch (questionType) {
      case QuestionType.MCQuestion:
        dispatch(
          questionActions.addOne({
            type: QuestionType.MCQuestion,
            content: "",
            choices: [],
            id: v4(),
            flowData: {
              x: xPos,
              y: yPos,
            },
          })
        );
        break;
      case QuestionType.TextInputQuestion:
        dispatch(
          questionActions.addOne({
            type: QuestionType.TextInputQuestion,
            content: "",
            id: v4(),
            flowData: {
              x: xPos,
              y: yPos,
            },
          })
        );
        break;

      default:
        break;
    }
  }

  return { add };
}

const TrayAddBtn = ({ icon }: { icon: JSX.Element }) => {
  const { add } = useHandleAdd();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{icon}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-12 -top-4 w-56 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary-main text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={add.bind(null, QuestionType.TextInputQuestion)}
                >
                  Text Input Question
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-primary-main text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={add.bind(null, QuestionType.MCQuestion)}
                >
                  Multiple Choice Question
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TrayAddBtn;
