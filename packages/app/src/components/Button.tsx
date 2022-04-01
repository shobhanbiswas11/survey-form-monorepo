import { FC } from "react";
import { clx } from "utils";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      className={clx([
        "bg-primary-main text-white px-6 py-2 text-xl rounded-lg",
        `active:bg-primary-dark`,
        "transition-colors",
        className,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
