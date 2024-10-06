// utilities.ts

type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export const debounce = <T extends unknown[]>(func: DebounceFunction<T>, delay: number): DebounceFunction<T> => {
    let timer: NodeJS.Timeout;

    return (...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
