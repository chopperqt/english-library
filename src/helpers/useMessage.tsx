import { message } from "antd";

import type { ReactNode } from "react";
import type { NoticeType } from "antd/es/message/interface";

export const useMessage = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const handleShowMessage = (type: NoticeType) => (content: ReactNode) => {
		messageApi.open({
			type,
			content,
		});
	};

	const handleShowError = handleShowMessage("error");
	const handleShowSuccess = handleShowMessage("success");

	return {
		messageApi,
		contextHolder,
		handleShowError,
		handleShowSuccess,
	};
};
