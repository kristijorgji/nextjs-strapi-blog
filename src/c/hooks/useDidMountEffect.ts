import { EffectCallback, useEffect } from 'react';

/**
 * Will run only one time after the first render
 */
export default function useDidMountEffect(func: EffectCallback): void {
    useEffect(() => {
        return func();
    }, []);
}
