<template>
  <div>
    <div class="mb text-align-center">
      <label for="name">Filter by name </label>
      <input type="text" name="name" id="name" v-model="nameFilter" />

      <br class="mb" />

      <button :disabled="previous == null" @click="previousPage()">
        Previous Page
      </button>
      <button :disabled="next == null" @click="nextPage()">
        Next Page
      </button>
    </div>

    <div class="text-align-center" v-if="loading">
      <h3>Loading data ...</h3>
    </div>

    <div v-else>
      <table class="center">
        <thead>
          <tr>
            <th @click="sortByColumn('name')">
              Name
              <span v-if="sortColumn === 'name'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
            <th @click="sortByColumn('height')">
              Height
              <span v-if="sortColumn === 'height'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
            <th @click="sortByColumn('mass')">
              Mass
              <span v-if="sortColumn === 'mass'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
            <th @click="sortByColumn('created')">
              Created
              <span v-if="sortColumn === 'created'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
            <th @click="sortByColumn('edited')">
              Edited
              <span v-if="sortColumn === 'edited'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
            <th @click="sortByColumn('planet')">
              Planet
              <span v-if="sortColumn === 'planet'">
                <span v-if="sortAsc">↑</span>
                <span v-else>↓</span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="$p in filteredAndSortedPeopleList" :key="$p.name">
            <td>{{ $p.name }}</td>
            <td class="text-align-right">{{ $p.height }}</td>
            <td class="text-align-right">{{ $p.mass }}</td>
            <td>{{ $p.created }}</td>
            <td>{{ $p.edited }}</td>
            <td>
              <a
                href="#"
                @click="toggleShowPlanetModal($p.planet)"
                v-if="$p.planet"
              >
                {{ $p.planet.name }}
              </a>
              <font-awesome-icon icon="spinner" v-else />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <planet
      :planet="showPlanet"
      v-if="showPlanetModal"
      @close="toggleShowPlanetModal()"
    ></planet>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref } from "vue";
import { getPeople, People, peopleState } from "@/people";
import { Planet } from "@/planets";

export default defineComponent({
  name: "Home",

  setup() {
    const data = reactive({
      nameFilter: "",
      sortColumn: (null as unknown) as string,
      sortAsc: true,
      showPlanetModal: false
    });

    const showPlanet = ref<Planet>();

    getPeople();

    const nextPage = async () => {
      await getPeople(peopleState.next);
    };

    const previousPage = async () => {
      await getPeople(peopleState.previous);
    };

    const sortByColumn = (column: string): void => {
      data.sortColumn = column;
      data.sortAsc = !data.sortAsc;
    };

    const sortPeopleList = (peopleA: People, peopleB: People) => {
      const a = peopleA[data.sortColumn as keyof People];
      const b = peopleB[data.sortColumn as keyof People];

      if (a && b) {
        if (a < b) return data.sortAsc ? 1 : -1;
        if (a > b) return data.sortAsc ? -1 : 1;
      }

      return 0;
    };

    const toggleShowPlanetModal = (planet: Planet): void => {
      if (planet != null) {
        showPlanet.value = planet;
      }
      data.showPlanetModal = !data.showPlanetModal;
    };

    const filteredPeopleByName = computed<Array<People>>(() => {
      if (data.nameFilter === "") return peopleState.people;

      return peopleState.people.filter(p =>
        p.name.toLowerCase().includes(data.nameFilter.toLowerCase())
      );
    });

    const filteredAndSortedPeopleList = computed<Array<People>>(() => {
      if (data.sortColumn != null)
        return [...filteredPeopleByName.value].sort(sortPeopleList);
      return filteredPeopleByName.value;
    });

    return {
      ...toRefs(peopleState),
      ...toRefs(data),
      showPlanet,
      nextPage,
      previousPage,
      sortByColumn,
      sortPeopleList,
      toggleShowPlanetModal,
      filteredPeopleByName,
      filteredAndSortedPeopleList
    };
  }
});
</script>

<style scoped>
.text-align-right {
  text-align: right;
}
.text-align-center {
  text-align: center;
}
.actions {
  width: 200px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.mb {
  margin-bottom: 20px;
}
table {
  border-collapse: collapse;
}
td,
th {
  padding: 8px;
}
thead th {
  cursor: pointer;
  /* color: #46bd87; */
  color: #ffffff;
  background: #4fc3a1;
}
thead th:nth-child(odd) {
  /* color: #ffffff; */
  background: #324960;
}
tr:nth-child(even) {
  background: #f8f8f8;
}
</style>
