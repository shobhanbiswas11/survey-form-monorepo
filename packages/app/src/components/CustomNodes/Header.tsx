import { HomeIcon as HomeOutline } from "@heroicons/react/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/solid";
import { formActions, formSelectors } from "features/form";
import { Question } from "features/questions";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { FC } from "react";
import { NodeSemanticName } from "./NodeSemanticNames";

const NodeHeader: FC<Question> = ({ id, children, type }) => {
  const formHead = useAppSelector(formSelectors.head);
  const dispatch = useAppDispatch();
  const isHead = formHead === id;

  function handleHeadClick() {
    dispatch(formActions.setHead(id));
  }

  return (
    <div>
      <div className="pb-6 flex items-center cursor-grab">
        <span className="px-2 py-1 rounded-md bg-slate-700 text-white text-xs">
          {NodeSemanticName[type]}
        </span>

        {isHead ? (
          <HomeSolid className="w-6 ml-3 text-primary-dark" />
        ) : (
          <HomeOutline
            className="w-6 ml-3 cursor-pointer"
            onClick={handleHeadClick}
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default NodeHeader;
