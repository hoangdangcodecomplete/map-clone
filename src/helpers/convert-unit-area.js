import * as turf from "@turf/turf";

export const convertUnitArea = (area, originalUnit, finalUnit) => {

    return turf.convertArea(area, originalUnit, finalUnit);
};