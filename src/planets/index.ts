import { reactive } from "vue";
import axios, { AxiosResponse } from "axios";

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}

interface PlanetState {
  loading: boolean;
  next?: string;
  previous?: string;
  planets: Array<Planet>;
}

export const planetState = reactive<PlanetState>({
  loading: false,
  planets: [],
});

export async function getPlanet(url: string): Promise<Planet> {
  try {
    planetState.loading = true;

    const planet = planetState.planets.find((p) => p.url === url);
    if (planet) return planet;

    const { data } = await axios.get<Planet, AxiosResponse<Planet>>(url);

    planetState.planets.push(data);
    return data;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    throw new Error(`Error fetching planet with url ${url}`);
  }
}
