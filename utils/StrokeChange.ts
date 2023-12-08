const changeStrokeColor = (svgString, color) => {
    const updatedSVG = svgString.replace(/stroke="([^"]*)"/g, `stroke="${color}"`);
    return updatedSVG;
};

export default changeStrokeColor;
