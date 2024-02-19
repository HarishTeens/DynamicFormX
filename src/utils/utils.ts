export const copyNestedObj = (obj: unknown) => {
    return JSON.parse(JSON.stringify(obj));
};

export const convertString = (str: string, conversion: string) => {
    switch (conversion) {
        case 'uppercase':
            return str.toUpperCase();
        case 'lowercase':
            return str.toLowerCase();
        case 'capitalize':
            return str.charAt(0).toUpperCase() + str.slice(1);
        default:
            return str;
    }
}

export const checkNested = (obj: object, ...args: string[]) => {
    for (let i = 0; i < args.length; i++) {
        if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
            return false;
        }
        obj = obj[args[i] as keyof object];
    }
    return true;
}
interface ISubItem {
    key: string;
    value: string | number;
}
export const substituteValues = (obj: object, items: Array<ISubItem>) => {
    let jsonStr = JSON.stringify(obj);
    jsonStr = items.reduce((acc, item) => {
        const repValue = typeof item.value === 'string' ? `"${item.value}"` : `${item.value}`;
        return acc.replace(`"{${item.key}}"`, repValue);
    }, jsonStr);
    return JSON.parse(jsonStr);
}


export const subObject = (obj: object, key: string, value: string | number) => {
    if (!obj) return obj;
    Object.keys(obj).forEach((k) => {
        if (obj[k as never] === key) obj[k as never] = value as never;
        else if (typeof obj[k as never] === 'object') subObject(obj[k as never], key, value);
    });
    return obj;
}

export const subString = (str: string, key: string, value: string | number) => {
    return str.replace(key, `${value}`);
}

export const refineString = (str: string) => {
    // replace all {anything} with "null"
    return str.replace(/{.*?}/g, "null");
}

export const refineObject = (obj: object) => {
    if (!obj) return obj;
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key as never] === 'object') refineObject(obj[key as never]);
        else if (typeof obj[key as never] === "string") {
            const objVal = obj[key as never] as string;
            if (objVal.includes("{") && objVal.includes("}")) delete obj[key as never];
        }
    });
    return obj;
}

export const modNameToKey = (str: string) => {
    return str.split(" ").map(x => x.toLowerCase()).join("") + "Id"
}