import { useEffect } from 'react';

const usePrefetchData = (data, callback, condition) => {
    useEffect(() => {
        if (!data && !condition) {
            callback();
        }
    }, [data, callback, condition]);
};

export default usePrefetchData;