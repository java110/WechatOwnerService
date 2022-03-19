/**
 * 数组集合工具类
 */

/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
export function sliceArray(array, size) {
    var result = []
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size
        var end = start + size
        result.push(array.slice(start, end))
    }
    return result
}
