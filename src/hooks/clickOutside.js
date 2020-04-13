import { useEffect, useCallback } from 'react';

const useClickOutside = (ref, handler) => {
    const listenerCallback = useCallback((e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            handler();
        }
    }, [ref, handler]);

    useEffect(() => {
        document.addEventListener('mousedown', listenerCallback, false);

        return function cleanup() {
            document.removeEventListener('mousedown', listenerCallback, false);
        };
    }, [ref, handler, listenerCallback]);
};

export default useClickOutside;