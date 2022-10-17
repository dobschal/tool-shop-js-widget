/**
 * @typedef {Object} Observable
 * @template O
 * @augements O
 * @property {(key: string, callback: (any) => void) => void} $on
 */

/**
 * @template O
 * @param {O} plainData 
 * @returns Observable<O>
 */
export function Observable(plainData) {
    const listener = [];
    if (Array.isArray(plainData)) {
        return;
    }
    return new Proxy({
        ...plainData,
        $on: (key, callback) => listener.push({ key, callback })
    }, {
        set(target, key, value) {
            target[key] = value;
            listener.forEach(({ key: key2, callback }) => {
                if (key === key2) callback(value);
            });
            return true;
        }
    });
}