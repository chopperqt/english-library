export const getOffset = (page: string | number = 1, limit = 30) => {
	if (!+page) {
		return 0
	}

	let formattedPage = +page - 1

	if (+page < 0) {
		formattedPage = 0
	}

	return formattedPage * limit
}
