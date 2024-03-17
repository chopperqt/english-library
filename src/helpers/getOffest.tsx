export const getOffset = (page: number) => {
	if (page < 2) {
		return 0
	}

	return (page * 70) - 70 + 1
}