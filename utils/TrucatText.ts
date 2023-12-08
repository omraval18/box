const truncateMiddle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
        return text;
    }

    const startLength = Math.floor((maxLength - 3) / 2);
    const endLength = Math.ceil((maxLength - 3) / 2);

    return text.substr(0, startLength) + "..." + text.substr(text.length - endLength);
};

export default truncateMiddle;
