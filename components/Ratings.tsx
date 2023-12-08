import React from "react";
import { View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

const STAR_WIDTH = 17;
type RatingProps = {
    rating: number;
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const numberOfFullStars = Math.floor(rating);
    const remainingPercentage = (rating - numberOfFullStars) * 100;

    const renderFullStar = () => (
        <SvgXml
            xml={`<svg width="${STAR_WIDTH}" height="${STAR_WIDTH}" viewBox="0 0 17 18" fill="#F9B023" xmlns="http://www.w3.org/2000/svg"><path d="M12.6402 10.6367C12.4575 10.8137 12.3736 11.0698 12.4152 11.3209L13.0423 14.7916C13.0952 15.0858 12.9711 15.3835 12.7249 15.5535C12.4836 15.7298 12.1627 15.751 11.8995 15.6099L8.77521 13.9804C8.66657 13.9225 8.54594 13.8915 8.4225 13.888H8.23132C8.16501 13.8979 8.10012 13.919 8.04086 13.9515L4.91582 15.5888C4.76133 15.6664 4.58639 15.6939 4.41497 15.6664C3.99736 15.5874 3.71871 15.1895 3.78714 14.7698L4.41497 11.2991C4.45659 11.0458 4.37264 10.7883 4.18994 10.6085L1.64264 8.13946C1.4296 7.93277 1.35553 7.62238 1.45288 7.34233C1.54741 7.06298 1.78867 6.85911 2.08001 6.81326L5.58598 6.30465C5.85263 6.27714 6.08683 6.11489 6.20675 5.87504L7.75163 2.70768C7.78832 2.63714 7.83558 2.57224 7.89272 2.51721L7.95621 2.46783C7.98936 2.43115 8.02746 2.40082 8.06978 2.37613L8.14667 2.34791L8.2666 2.29853H8.56358C8.82882 2.32604 9.06232 2.48476 9.18436 2.72179L10.7497 5.87504C10.8626 6.10572 11.082 6.26585 11.3352 6.30465L14.8412 6.81326C15.1374 6.85559 15.3851 7.06016 15.4831 7.34233C15.5755 7.62521 15.4958 7.93559 15.2785 8.13946L12.6402 10.6367Z"/></svg>`}
        />
    );

    const renderPartialStar = (percentage) => (
        <View style={{ width: STAR_WIDTH, height: STAR_WIDTH }}>
            <SvgXml
                xml={`<svg width="${STAR_WIDTH}" height="${STAR_WIDTH}" viewBox="0 0 17 18" fill="#1E222B" xmlns="http://www.w3.org/2000/svg"><path d="M12.6402 10.6367C12.4575 10.8137 12.3736 11.0698 12.4152 11.3209L13.0423 14.7916C13.0952 15.0858 12.9711 15.3835 12.7249 15.5535C12.4836 15.7298 12.1627 15.751 11.8995 15.6099L8.77521 13.9804C8.66657 13.9225 8.54594 13.8915 8.4225 13.888H8.23132C8.16501 13.8979 8.10012 13.919 8.04086 13.9515L4.91582 15.5888C4.76133 15.6664 4.58639 15.6939 4.41497 15.6664C3.99736 15.5874 3.71871 15.1895 3.78714 14.7698L4.41497 11.2991C4.45659 11.0458 4.37264 10.7883 4.18994 10.6085L1.64264 8.13946C1.42960 7.93277 1.35553 7.62238 1.45288 7.34233C1.54741 7.06298 1.78867 6.85911 2.08001 6.81326L5.58598 6.30465C5.85263 6.27714 6.08683 6.11489 6.20675 5.87504L7.75163 2.70768C7.78832 2.63714 7.83558 2.57224 7.89272 2.51721L7.95621 2.46783C7.98936 2.43115 8.02746 2.40082 8.06978 2.37613L8.14667 2.34791L8.2666 2.29853H8.56358C8.82882 2.32604 9.06232 2.48476 9.18436 2.72179L10.7497 5.87504C10.8626 6.10572 11.082 6.26585 11.3352 6.30465L14.8412 6.81326C15.1374 6.85559 15.3851 7.06016 15.4831 7.34233C15.5755 7.62521 15.4958 7.93559 15.2785 8.13946L12.6402 10.6367Z"/></svg>`}
            />
            <View
                style={{
                    position: "absolute",
                    overflow: "hidden",
                    width: `${percentage}%`,
                    height: "100%",
                }}
            >
                <SvgXml
                    xml={`<svg width="${STAR_WIDTH}" height="${STAR_WIDTH}" viewBox="0 0 17 18" fill="#F9B023" xmlns="http://www.w3.org/2000/svg"><path d="M12.6402 10.6367C12.4575 10.8137 12.3736 11.0698 12.4152 11.3209L13.0423 14.7916C13.0952 15.0858 12.9711 15.3835 12.7249 15.5535C12.4836 15.7298 12.1627 15.751 11.8995 15.6099L8.77521 13.9804C8.66657 13.9225 8.54594 13.8915 8.4225 13.888H8.23132C8.16501 13.8979 8.10012 13.919 8.04086 13.9515L4.91582 15.5888C4.76133 15.6664 4.58639 15.6939 4.41497 15.6664C3.99736 15.5874 3.71871 15.1895 3.78714 14.7698L4.41497 11.2991C4.45659 11.0458 4.37264 10.7883 4.18994 10.6085L1.64264 8.13946C1.42960 7.93277 1.35553 7.62238 1.45288 7.34233C1.54741 7.06298 1.78867 6.85911 2.08001 6.81326L5.58598 6.30465C5.85263 6.27714 6.08683 6.11489 6.20675 5.87504L7.75163 2.70768C7.78832 2.63714 7.83558 2.57224 7.89272 2.51721L7.95621 2.46783C7.98936 2.43115 8.02746 2.40082 8.06978 2.37613L8.14667 2.34791L8.2666 2.29853H8.56358C8.82882 2.32604 9.06232 2.48476 9.18436 2.72179L10.7497 5.87504C10.8626 6.10572 11.082 6.26585 11.3352 6.30465L14.8412 6.81326C15.1374 6.85559 15.3851 7.06016 15.4831 7.34233C15.5755 7.62521 15.4958 7.93559 15.2785 8.13946L12.6402 10.6367Z"/></svg>`}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {[...Array(numberOfFullStars)].map((_, index) => (
                <View key={index}>{renderFullStar()}</View>
            ))}
            {remainingPercentage > 0 && renderPartialStar(remainingPercentage)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Rating;