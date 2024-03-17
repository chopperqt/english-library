import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

interface PinedProps {
  isPined: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}
const Pined = ({ isPined, onClick, isDisabled = false }: PinedProps) => {
  const disabled = isDisabled && !isPined;

  let Icon = StarOutlined;

  if (isPined) {
    Icon = StarFilled;
  }

  return (
    <Button
      className="mr-1 flex justify-center items-center"
      shape="circle"
      onClick={onClick}
      disabled={disabled}
      type="text"
      size="small"
      icon={<Icon />}
    />
  );
};

export default Pined;
