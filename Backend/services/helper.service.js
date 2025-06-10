const isNullOrUndefined = function(inputValue){
    if (inputValue === undefined || inputValue === null){
        return true;
    }

    return false;
}

const base64ToArrayBuffer = function(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

const uint8ArrayToString = function(uint8Array){
    let result = '';

    for (let i = 0; i < uint8Array.length; i++){
        result += String.fromCharCode(uint8Array[i]);
    }

    return result;
}

const ensureNotNullOrUndefined = function(inputValue, errorMessage){
    if (isNullOrUndefined(inputValue)){
        throw new Error(errorMessage);
    }
}

const ensureType = function(inputValue, type, errorMessage){
    if (!(typeof inputValue === type)){
        throw new Error(errorMessage);
    }
}

module.exports = {
    isNullOrUndefined,
    ensureNotNullOrUndefined, 
    ensureType,
    base64ToArrayBuffer,
    uint8ArrayToString
}