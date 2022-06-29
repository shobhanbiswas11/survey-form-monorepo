import { ComponentProps, FC } from "react";
import { Link, useParams } from "react-router-dom";

export const QuestionDetailsLink: FC<
  { id: string } & Partial<ComponentProps<typeof Link>>
> = ({ children, id, ...rest }) => {
  return (
    <Link to={`details/${id}`} {...rest}>
      {children}
    </Link>
  );
};

export const QuestionDetailsPath = "details/:questionId";

export const useQuestionDetailsRouteParam = () => {
  const { questionId } = useParams<{ questionId: string }>();
  return { questionId };
};
