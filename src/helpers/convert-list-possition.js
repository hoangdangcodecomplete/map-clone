export const convertListPosition = (listPosition) => {
    if (listPosition && listPosition.length > 0) {
        return listPosition.map(function (obj) {
            return [obj.lat, obj.lng];
        })
    }
}