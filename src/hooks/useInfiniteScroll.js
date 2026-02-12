import  {useCallback, useEffect, useRef} from 'react'

const useInfiniteScroll = (callback, options) => {

    const {
        threshold,      // 1.0 = fully visible, 0.5 = 50% visible
        rootMargin, // Trigger 200px before element is visible
        enabled,       // Allow disabling the observer
    } = options;

    const observerRef = useRef(null);
    const targetRef = useRef(null);
    // console.log('1. Hook called, targetRef.current:', targetRef.current);


    const handleIntersection = useCallback(
        (entries) => {
            const [entry] = entries;
            // console.log("is it", entry.isIntersecting);
            if(entry.isIntersecting && enabled) {
                console.log("is it inside", entry.isIntersecting + "and" , enabled);
                callback();
            }
    }, [enabled, callback])


    useEffect(() => {
        if(!enabled) return;
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold,
            rootMargin,
        })
        // console.log('2. useEffect runs, targetRef.current:', targetRef.current);


        observerRef.current = observer;

        if(targetRef.current) {
        observer.observe(targetRef.current);
        // console.log('3. Element exists! Starting observer.');
        }

        return () =>{
            if(observerRef.current) {
                observerRef.current.disconnect();
            }
        }
    }, [threshold, rootMargin, handleIntersection])
    
    return targetRef;
}

export default useInfiniteScroll