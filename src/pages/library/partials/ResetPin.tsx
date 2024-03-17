import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ResetPin = () => {
  return (
    <>
      <Button
        className="flex mb-[10px] items-center justify-center ml-2"
        type="primary"
        icon={<DeleteOutlined />}
        danger
      />
    </>
  );
};

export default ResetPin;
