import * as turf from "@turf/turf";

export const calculateArea = (listPosition) => {
    var polygon = turf.polygon([
        listPosition
    ]);

    return turf.area(polygon);
}