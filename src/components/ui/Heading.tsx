import { cn } from "#/lib/utils";
import type { JSX } from "react/jsx-runtime";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const Heading = ({ children, level = 1, className = "" }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  let headingClassNames = "font-serif ";

  switch (level) {
    case 1:
      headingClassNames += "text-4xl font-semibold";
      break;
    case 2:
      headingClassNames += "text-2xl";
      break;
    case 3:
      headingClassNames += "text-2xl";
      break;
    case 4:
      headingClassNames += "text-xl";
      break;
    case 5:
      headingClassNames += "text-lg";
      break;
    case 6:
      headingClassNames += "text-base";
      break;
    default:
      headingClassNames += "text-4xl";
  }

  return <Tag className={cn(headingClassNames, className)}>{children}</Tag>;
};

export default Heading;
