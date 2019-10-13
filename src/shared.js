export const countObjectKeys = (object, key, inc) => {
    if (isNaN(object[key])) {
        object[key] = 0;
    }
    object[key] += inc;
}