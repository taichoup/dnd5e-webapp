
type MutableObject = Record<string, unknown>;

const isObject = (value: unknown): value is MutableObject =>
    value !== null && typeof value === "object";

const removeUselessProperties = (obj: MutableObject, propToDelete: string): void => {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // object or array
            if (isObject(obj[prop])) {
                removeUselessProperties(obj[prop], propToDelete);
            } else {
                // primitive
                if (prop === propToDelete && obj[prop]) {
                    delete obj[prop];
                }
            }
        }
    }
}

const removeNullishValues = (obj: MutableObject): void => {

    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            if (isObject(obj[prop])) {
                removeNullishValues(obj[prop]);
            } else {
                if (!obj[prop]) {
                    delete obj[prop];
                }
            }
        }
    }
}

export {
    removeUselessProperties,
    removeNullishValues,
}
