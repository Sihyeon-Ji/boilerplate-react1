import { useState, useEffect, RefObject } from "react";

const useVisibility = <T extends HTMLElement>(ref: RefObject<T>): boolean => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			},
		);
		const instance = ref.current;
		if (instance) {
			observer.observe(instance);
		}

		return () => {
			if (instance) {
				observer.unobserve(instance);
			}
		};
	}, [ref]);

	return isVisible;
};

export default useVisibility;

/**
export default function useIntersectionObserver(callback) {
    const observer = useRef(
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
            }
          });
        },
        { threshold: 1 }
      )
    );
  
    const observe = (element) => {
      observer.current.observe(element);
    };
  
    const unobserve = (element) => {
      observer.current.unobserve(element);
    };
  
    return [observe, unobserve];
  } 
  */
