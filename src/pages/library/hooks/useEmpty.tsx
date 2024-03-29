import { useSelector } from "react-redux";

import { getLoading } from "@services/loading/Loading.store";
// import { getUserID } from "@services/user/User.store";
import { getNormalizeWord } from "@common/word-modal/helpers/getNormalizeWord";
import { createLibraryWord } from "@api/library.api";

import type { WordForm } from "@models/Library.models";

const useEmpty = () => {
	const userID = window.localStorage.getItem('userId') || ''
	const isLoading = true

	const onSubmit = async (word: WordForm) => {
		if (!userID) {
			return null;
		}

		const nomralizedWord = getNormalizeWord(word);

		const response = await createLibraryWord({
			...nomralizedWord,
			userID,
		});

		if (response === null) {
			return null;
		}

		return response;
	};

	return {
		isLoading,
		userID,
		onSubmit,
	};
};

export default useEmpty;
