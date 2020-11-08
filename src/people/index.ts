import { reactive } from "vue";
import axios, { AxiosResponse } from "axios";
import { getPlanet, Planet } from "@/planets";

interface PeopleApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<People>;
}

export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: string;
  edited: string;
  url: string;
  planet?: Planet;
}

interface PeopleState {
  loading: boolean;
  next: string | undefined;
  previous: string | undefined;
  people: Array<People>;
}

export const peopleState = reactive<PeopleState>({
  loading: false,
  next: undefined,
  previous: undefined,
  people: [],
});

export async function getPeople(query = ""): Promise<void> {
  try {
    peopleState.loading = true;
    const { data } = await axios.get<
      PeopleApiResponse,
      AxiosResponse<PeopleApiResponse>
    >(`https://swapi.dev/api/people${query}`);

    peopleState.next =
      data.next != null ? `/${data.next.split("/").pop()}` : undefined;
    peopleState.previous =
      data.previous != null ? `/${data.previous.split("/").pop()}` : undefined;

    if (Array.isArray(data.results)) {
      for await (const result of data.results) {
        const planet = await getPlanet(result.homeworld);
        result.planet = planet;
      }
      peopleState.people = data.results;
    }

    peopleState.loading = false;
  } catch (error) {
    peopleState.loading = false;
    console.error(JSON.stringify(error, null, 2));
  }
}
