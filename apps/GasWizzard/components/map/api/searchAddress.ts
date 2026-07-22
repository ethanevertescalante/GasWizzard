import axios from 'axios';

const searchAddress = async (searchTerm: string) => {
    const limit = 4
    try{
        // const response = await axios.get(`https://photon.komoot.io/api/?q=${searchTerm}`);
        // if you want a limit
        const response = await axios.get(`https://photon.komoot.io/api/?q=${searchTerm}&limit=${limit}`);

        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export default searchAddress;