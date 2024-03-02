import { useState } from "react";
import Rte, { EditorValue } from "react-rte";
import { clx } from "utils";
import { getTextAlignClassName } from "./block-style-function";
import "./textEditor.css";

export const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string | undefined;
  onChange: (v: string) => void;
  className?: string;
}) => {
  const [editorState, setEditorState] = useState(
    Rte.createValueFromString(value || "", "html")
  );

  function handleChange(value: EditorValue) {
    console.log(value.toString("html", {}));
    setEditorState(value);
    onChange(value.toString("html"));
  }

  return (
    <Rte
      value={editorState}
      onChange={handleChange}
      className={clx("react-rte text-black w-full", className)}
      blockStyleFn={getTextAlignClassName}
    />
  );
};
