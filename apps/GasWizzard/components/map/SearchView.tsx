import { useEffect, useState } from "react";
import { searchAddress } from "@/lib/photon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

type AddressSearchProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  results: any[];
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  goToResultAction: (lat: number, lng: number, address: string, locationInformation: string, name: string) => void;
};

export default function SearchView({
  searchTerm,
  setSearchTerm,
  results,
  setResults,
  goToResultAction,
}: AddressSearchProps) {

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      //start showing results after 3 or more letters are inputted
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchAddress(searchTerm);
        setResults(data.features ?? []);
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);



  return (
    <div className="relative w-90 bg-white rounded-full">
      <InputGroup className="h-13">
        <InputGroupInput
          value={searchTerm ?? ""}
          onChange={(e) => setSearchTerm(e.target.value ?? "")}
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          autoFocus={false}
          autoComplete="off"
        />

        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {focused && results.length > 0 && (
        <div className="absolute left-0 top-full mt-2 z-[99999] w-full rounded-md bg-white max-h-100 overflow-x-hidden overflow-y-scroll">
          {results.map((result) => {
            const { name, housenumber, street, city, state, country, postcode } =
              result.properties;

            const [long, lat] = result.geometry.coordinates;

            const address = [`${housenumber ?? ""} ${street ?? ""}`.trim()]
              .filter(Boolean).join("");

            const locationInformation = [
                [city, state].filter(Boolean).join(", "),
                country
            ]
                .filter(Boolean)
                .join(", ");

            return (
                <button
                    key={`${lat}-${long}`}
                    type="button"
                    className="block h-auto min-h-0 w-full px-4 py-3 text-left align-top hover:bg-gray-100"
                    onClick={() => {
                      goToResultAction(lat,long, address, locationInformation, name)
                      setSearchTerm(name ?? address ?? "");
                      setFocused(false);
                    }}
                >
                  {name && <div className='italic'>{name}</div>}
                  {address && <div>{address}</div>}
                  {locationInformation && (
                      <div className="whitespace-nowrap">
                        {locationInformation}
                      </div>

                  )}
                  {postcode && <div>{postcode}</div>}
                  <div className="text-sm text-gray-500">
                    {lat}, {long}
                  </div>
                </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
