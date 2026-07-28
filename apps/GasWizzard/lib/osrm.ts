import axios from "axios";

export type Coordinate = {
    lat: number;
    lng: number;
};
export async function getRoute(
    start: Coordinate,
    end: Coordinate,
) {
    try{
        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${start.lng},${start.lat};${end.lng},${end.lat}` +
            `?overview=full&geometries=geojson`;

        const {data} = await axios.get(url);

        return {
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
            position: data.routes[0].geometry.coordinates.map(
                ([lng, lat] : [number, number]) => [lng, lat],
            ),
        }

    }catch(error){
        console.log(error);
        throw error;
    }
}