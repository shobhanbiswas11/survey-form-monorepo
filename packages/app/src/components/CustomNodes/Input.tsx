import { FC, FocusEvent } from "react";
import { clx } from "utils";

interface Props {
  content: string;
  onEditingDone: (content: string) => void;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

const NodeTextInput: FC<Props> = ({
  content,
  onEditingDone,
  className,
  onFocus,
}) => {
  const handleContentChange = (e: FocusEvent<HTMLDivElement>) => {
    onEditingDone(e.currentTarget.innerText);
  };

  return (
    <div
      onFocus={onFocus}
      onBlur={handleContentChange}
      contentEditable
      suppressContentEditableWarning
      className={clx([
        "cursor-text border-[1px] border-gray-800 rounded-md p-1 nodrag",
        className,
      ])}
      style={{
        wordBreak: "break-word",
      }}
    >
      {content}
    </div>
  );
};

export default NodeTextInput;
