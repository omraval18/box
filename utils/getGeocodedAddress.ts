export const getGeocodedAddressFromCoords = (coords) => {
    const { latitude, longitude } = coords.coords;
    const key = process.env.EXPO_PUBLIC_MAPS_KEY;

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`;

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (
                    data.status &&
                    data.status.code === 200 &&
                    data.results &&
                    data.results.length > 0
                ) {
                    const formattedAddress = data.results[0].formatted;
                    resolve({ formattedAddress });
                } else {
                    // Handle errors or lack of results
                    reject(new Error("Unable to retrieve address from OpenCage Geocoding API"));
                }
            })
            .catch((error) => reject(error));
    });
};
