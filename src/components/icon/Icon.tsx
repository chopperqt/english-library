import { IconsList } from "./IconList";

interface IconProps {
  icon: JSX.Element;
  className?: string;
}
const Icon = ({ icon, className }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    className={`fill-[#1677ff] text-md w-5 h-5 ${className}`}
  >
    {icon}
  </svg>
);

export default Icon;

export { IconsList };
