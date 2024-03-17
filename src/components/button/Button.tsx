import { useMemo } from "react";
import Spin from "@components/spin";

const DefaultStyles =
  "bg-indigo-600 border border-transparent rounded-md py-2 px-5 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ";
const DisabledStyles = " bg-indigo-400 ";
const HoverStyles = " hover:bg-indigo-700 ";

export interface ButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  children: string | React.ReactNode | React.ReactNode[];
}
const Button = ({
  children,
  className,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const styles = useMemo(() => {
    if (loading || disabled) {
      return DefaultStyles + DisabledStyles + className;
    }

    return DefaultStyles + HoverStyles + className;
  }, [loading, disabled, className]);

  return (
    <button
      data-testid="button"
      className={styles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2" data-testid="button-spin">
          <Spin height={25} width={25} />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
