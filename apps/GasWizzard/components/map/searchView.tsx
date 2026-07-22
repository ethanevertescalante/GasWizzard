import { useEffect, useState } from "react";
import searchAddress from "@/components/map/api/searchAddress";
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
  goToResultAction: (lat: number, lng: number) => void;
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          autoFocus={false}
        />

        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {focused && results.length > 0 && (
        <div className="absolute left-0 top-full w-full z-[99999] max-h-1000 overflow-y-auto rounded-md border bg-white shadow-lg">
          {results.map((result) => {
            const { name, housenumber, street, city, state, country, osm_id } =
              result.properties;

            const [long, lat] = result.geometry.coordinates;

            const address = [`${housenumber ?? ""} ${street ?? ""}`.trim()]
              .filter(Boolean);

            const locationInformation = [
                [city, state].filter(Boolean).join(", "),
                country,
            ]
                .filter(Boolean)
                .join(", ");

            return (
                <button
                    key={osm_id}
                    type="button"
                    className="relative block h-auto min-h-0 w-full px-4 py-3 text-left align-top hover:bg-gray-100"
                    onClick={() => {
                      console.log("clicked")
                      goToResultAction(lat,long)
                      setFocused(false);
                    }}
                >
                  {name && <div>{name}</div>}
                  {address && <div>{address}</div>}
                  {locationInformation && (
                      <div className="whitespace-nowrap">
                        {locationInformation}
                      </div>
                  )}
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
