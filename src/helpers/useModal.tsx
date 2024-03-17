import { useState } from "react";

export const useModal = () => {
	const [isOpened, setOpened] = useState(false)

	const handleOpen = () => {
		setOpened(true)
	}

	const handleClose = () => {
		setOpened(false)
	}

	return {
		handleClose,
		handleOpen,
		isOpened,
	};
}