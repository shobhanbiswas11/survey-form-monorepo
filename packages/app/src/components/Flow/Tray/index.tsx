import {
  DocumentDownloadIcon,
  DocumentTextIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { formSelectors } from "features/form";
import { questionSelector } from "features/questions";
import { useAppSelector } from "hooks";
import { FC } from "react";
import { Link } from "react-router-dom";
import { downloadAsJson } from "utils";
import TrayAddBtn from "./Add";

const IconBtn: FC = ({ children }) => {
  return (
    <div className="cursor-pointer mb-2 last:mb-0 pb-2 border-b-[1px] border-b-gray-200">
      {children}
    </div>
  );
};

const FlowTray = () => {
  const questions = useAppSelector(questionSelector.selectAll);
  const formHead = useAppSelector(formSelectors.head);

  function handleDownload() {
    downloadAsJson(
      {
        questions,
        form: {
          head: formHead,
        },
      },
      "questions"
    );
  }

  return (
    <div className="bg-slate-200 w-[50px] absolute top-5 left-5 z-[10000] p-2 rounded-lg text-gray-800">
      <TrayAddBtn
        icon={
          <IconBtn>
            <PlusCircleIcon className="w-full" />
          </IconBtn>
        }
      />
      <IconBtn>
        <DocumentDownloadIcon onClick={handleDownload} />
      </IconBtn>

      <IconBtn>
        <Link to="form">
          <DocumentTextIcon />
        </Link>
      </IconBtn>
    </div>
  );
};

export default FlowTray;
