import { useRef } from 'react';

export const generateUniqueId = (prefix = "", length = 8) => {
    const characters = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];
    const generated = Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    });

    return prefix + generated.join("");
};

export const useGenerateUniqueId = (prefix = "", length = 8) => {
    const uniqueId = useRef(generateUniqueId(prefix, length));

    return uniqueId.current;
};
