import React from 'react'

const useInfiniteScroll = ({callback, options}) => {

    const {
        threshold = 1.0,      // 1.0 = fully visible, 0.5 = 50% visible
        rootMargin = '200px', // Trigger 200px before element is visible
        enabled = true,       // Allow disabling the observer
    } = options;

    
}

export default useInfiniteScroll