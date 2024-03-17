import { useEffect, useMemo } from "react"

interface UseObserver {
	threshold?: number
	callback: () => void
	element: React.MutableRefObject<HTMLElement | null>
}

export const useObserver = ({
	threshold = 0,
	callback,
	element,
}:UseObserver) => {
	const observer = useMemo(() => {
		return new IntersectionObserver((entry) => {
			if (!entry.length) {
				return
			}
	
			if (!entry[0].isIntersecting) {
				return
			}
	
			callback()
		}, {
			threshold,
		})
	}, [callback])

	useEffect(() => {
		if (!element.current) {
			return 
		}

		observer.observe(element.current)

		return () => {
			observer.disconnect()
		}
	}, [element, callback])

	return {
		observer,
	};
}