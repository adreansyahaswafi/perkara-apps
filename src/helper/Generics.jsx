import { format, parse, setHours, setMinutes, setSeconds } from "date-fns";

export const formatRupiah = (angka, prefix) => {
    if (angka !== undefined) {
        let number = angka.toString(),
            number_string = number.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);
        if (ribuan) {
            let separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }
        rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
        return prefix === undefined ? rupiah : rupiah ? "Rp" + rupiah : "";
    } else {
        return "";
    }
};

export const unique = (array, key = null, object = null) => {
    const { takeLast, checkLast, checkFirst } = object === null ? { takeLast: false, checkLast: null, checkFirst: null } : object
    let a = array.concat();
    let init = checkLast && checkLast < a.length ? a.length - checkLast : 0
    let length = checkFirst && checkFirst < a.length ? checkFirst : a.length
    for (let i = init; i < length; ++i) {
        for (let j = i + 1; j < length; ++j) {
            if (key === null) {
                if (a[i] === a[j]) a.splice(j--, 1);
            } else {
                if (a[i][key] === a[j][key]) {
                    if (object && takeLast === true) a[i] = a[j];
                    a.splice(j--, 1);
                    length--
                }
            }
        }
    }
    return a;
};

export const capitalize = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

export const camelCaseToDash = (str) => {
    return str
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([0-9])([^0-9])/g, '$1-$2')
        .replace(/([^0-9])([0-9])/g, '$1-$2')
        .replace(/-+/g, '-')
        .toLowerCase();
}

export const toBase64 = (blob, callback) => {
    const reader = new FileReader();

    if (callback instanceof Function) {
        reader.onload = () => callback(reader.result, null);
        reader.onerror = (error) => callback(null, error);

        reader.readAsDataURL(blob);
    } else {
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    }
}

export function constructObjectAsServices({ value }) {
    let keys = Object.keys(value);
    let arrayKey = keys.filter(setKey => setKey !== "roleName");
    let construct = []
    let define = ["create", "read", "update", "delete"]
    arrayKey.forEach(element => {
        const findValue = value[element] && Array.isArray(value[element]) ? value[element] : [];
        let setObj = findValue.filter(header => header !== element);
        let getObject = [...setObj, ...define].reduce(function (obj, v) {
            obj[v] = setObj.includes(v);
            return obj;
        }, {})
        construct.push({
            [element]: {
                ...getObject
            }
        })
    });
    return construct
}

export function constructValidationCheck(value) {
    let keys = Object.keys(value);
    let arrayKeyMutationName = keys.filter(setKey => setKey !== "roleName");
    let newArrayMutationName = arrayKeyMutationName.map(item => value[item].length === 0 && item)
    return newArrayMutationName.filter(resultsOfMutation => resultsOfMutation !== false)
}

export const dataUriToBlob = dataUri => {
    let binary = atob(dataUri.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const type = dataUri.split(',')[0].split(':')[1].split(';')[0];

    return new Blob([new Uint8Array(array)], { type });
}

export const debounce = (func, wait, immediate) => {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const FormatCurrencySimple = (num) => {
    if (Math.abs(num) > 999999999999) {
        return Math.sign(num) * ((Math.abs(num) / 1000000000000).toFixed(1)) + 'T';
    } else if (Math.abs(num) > 999999999) {
        return Math.sign(num) * ((Math.abs(num) / 1000000000).toFixed(1)) + 'B';
    } else if (Math.abs(num) > 999999) {
        return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'M';
    } else if (Math.abs(num) > 999) {
        return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K';
    } else {
        return (Math.sign(num) * Math.abs(num)).toLocaleString();
    }
}

export const filterObject = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));

export const mapObject = (obj, predicate) => Object.fromEntries(Object.entries(obj).map(predicate));

const rupiahFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
export const IdrFormat = (number) => rupiahFormatter.format(number);

const decimalFormatter = new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 });
export const decimalFormat = (number) => decimalFormatter.format(number);

const blankOrNullishValues = [undefined, null, ""];
export const isBlankOrNullish = (value) => blankOrNullishValues.includes(value);

export const parseValue = (
    value,
    format = (value) => value,
    fallbackValue = "-"
) => isBlankOrNullish(value) ? fallbackValue : format(value);


export const convertToDateTime = (dateStr, hours = 0, minutes = 0, seconds = 0) => {
    const parsedDate = parse(dateStr, "yyyy-MM-dd", new Date()); // Parse date
    const dateWithTime = setSeconds(setMinutes(setHours(parsedDate, hours), minutes), seconds);

    return format(dateWithTime, "yyyy-MM-dd'T'HH:mm:ss"); // Format output
}
