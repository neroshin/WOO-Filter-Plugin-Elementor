// utilities/StringReRenderer.js

export const splitAtSecondUnderscore = (string) => {
    const parts = string.split('_');
    return parts.slice(1).join('_');
};


export const splitAtFirstUnderscore = (string) => {
    const parts = string.split('_');
    // console.log(parts);
    return parts[0]??"";
};


// Optional helper function for title case
export const titleCase  = (s) => s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
.replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) 

// Default Export
export default {
    splitAtFirstUnderscore,
    titleCase
};