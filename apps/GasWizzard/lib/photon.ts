import axios from 'axios';
import { Coordinate } from "@/lib/osrm";
import {fallback} from "@/components/map/locator";

export type photonResponse = {
    type: string;
    features: {
      type: string;
      properties: {
          osm_type: string;
          osm_id: number;
          osm_key: string;
          type: string;
          name: string;
          housenumber: number;
          street: string;
          district: string;
          city: string;
          county: string;
          state: string;
          country: string;
          postcode: string;
          countrycode: string;
      }
      geometry: {
          type: string;
          coordinates: Coordinate[];
      }
    }[]
}

export async function ReverseGeocode({ lng, lat }: Coordinate) {
    try{
        const url = `https://photon.komoot.io/reverse?lon=${lng}&lat=${lat}`;

        const { data } = await axios.get(url);

        console.log(data);
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function searchAddress(
    searchTerm: string,
) {
    // const limit = 4

    const coords = await getUserLocation();
    console.log(coords);

    try{
        const response = await axios.get(`https://photon.komoot.io/api/?q=${searchTerm}&lat=${coords.lat}&lon=${coords.lng}`);
        // // if you want a limit
        // const response = await axios.get(`https://photon.komoot.io/api/?q=${searchTerm}&limit=${limit}&lat=${userLat}&lng=${userLng}`);
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}


export function PhotonToAddress(photonData: photonResponse) {

    try{
        const data = photonData.features[0];
        const properties = data?.properties;
        const geometry = data?.geometry;

        const name = properties?.name

        const address = [`${properties?.housenumber ?? ""} ${properties?.street ?? ""}`.trim()]
            .filter(Boolean).join("");

        const [long, lat] = geometry?.coordinates || "";

        const locationInformation = [
            [properties?.city, properties?.state].filter(Boolean).join(", "),
            properties?.country
        ]
        .filter(Boolean).join(", ");

        return {
            name: name,
            address: address,
            location: locationInformation,
            coordinates: [long, lat] as unknown as Coordinate,
        }

    }catch(error){
        throw error;
    }

}

function getUserLocation(): Promise<{
    lat: number;
    lng: number;
}> {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => {
                resolve({
                    lat: fallback[0] as number,
                    lng: fallback[1] as number,
                });
            }
        );
    });
}