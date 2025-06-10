export class Helper{
    public static allUnique<T>(elements: T[]): boolean{
        if (elements.length == 0 || elements.length == 1){
            return true;
        }

        while (elements.length > 0){
            let element = elements[0];
            elements = elements.slice(1);

            if (elements.includes(element)){
                return false;
            }
        }

        return true;
    }

    public static normalize(input: string): string{
        let result = input.toLowerCase().replace(' ', '');
        return result;
    }

    public static convertToUTC(date: Date): Date{
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 
        date.getSeconds(), date.getMilliseconds()));
    }

    public static convertToUTCDateString(date: Date): string{
        let month = date.getUTCMonth() + 1;
        let monthString = month < 10 ? '0' + month : '' + month;
        let day = date.getUTCDate();
        let dayString = day < 10 ? '0' + day : '' + day;
        let year = date.getFullYear();
        let hours = date.getUTCHours();
        let hoursString = hours < 10 ? '0' + hours : '' + hours;
        let minutes = date.getUTCMinutes();
        let minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
        let seconds = date.getUTCSeconds();
        let secondsString = seconds < 10 ? '0' + seconds : '' + seconds;
        let milliseconds = date.getUTCMilliseconds();
        let result = `${year}-${monthString}-${dayString} ${hoursString}:${minutesString}:${secondsString}.${milliseconds}`
        return result;
    }

    public static arrayBufferToBase64(buffer: ArrayBuffer): string{
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }

        return window.btoa( binary );
    }

    public static base64ToArrayBuffer(base64: string) {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public static uint8ArrayToString(uint8Array: Uint8Array): string{
        let result: string = '';

        for (let i = 0; i < uint8Array.length; i++){
            result += String.fromCharCode(uint8Array[i]);
        }

        return result;
    }
}