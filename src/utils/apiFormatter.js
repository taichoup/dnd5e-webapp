
const removeUselessProperties = (obj, propToDelete) => {

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            // object or array
            if (typeof obj[prop] == 'object') {
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

const removeNullishValues = (obj) => {

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'object' && obj[prop] !== null) { // null is of type object!
                removeNullishValues(obj[prop]);
            } else {
                if (!obj[prop]) {
                    // console.log("Removing property with empty value: ", prop, obj[prop]);
                    delete obj[prop];
                }
            }
        }
    }
}

module.exports = {
    removeUselessProperties,
    removeNullishValues,
}