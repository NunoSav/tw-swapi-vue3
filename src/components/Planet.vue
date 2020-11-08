<template>
  <div class="modalwrap" @click="$emit('close')">
    <div class="modalwrap-content">
      <div v-if="$props.planet">
        <h1 class="planet-value">{{ $props.planet.name }}</h1>

        <div class="planet-section">
          <font-awesome-icon icon="ruler-combined" size="6x" />
          <h2>Diameter</h2>
          <span class="planet-value">{{ $props.planet.diameter }}</span>
        </div>

        <div class="planet-section">
          <font-awesome-icon icon="cloud-sun-rain" size="6x" />
          <h2>Climate</h2>
          <span class="planet-value">{{ $props.planet.climate }}</span>
        </div>

        <div class="planet-section">
          <font-awesome-icon icon="user-friends" size="6x" />
          <h2>Population</h2>
          <span class="planet-value">{{ $props.planet.population }}</span>
        </div>
      </div>

      <div v-else>
        <h3>Nothing to show!</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Planet",

  props: {
    planet: {
      type: Object,
      default: () => null
    }
  },

  emits: ["close"]
});
</script>

<style scoped>
.modalwrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9991;
  font-size: 14px;
}
.modalwrap:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}
.modalwrap .modalwrap-content {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 2;
  padding: 16px;
  border-radius: 6px;
  max-height: 80%;
  min-height: 200px;
  overflow: auto;
  text-align: center;
}
.planet-section {
  margin: 0 15px 0 15px;
  width: 150px;
  display: inline-block;
  text-align: center;
}
.planet-value {
  font-size: 34px;
  font-weight: bolder;
  color: #46bd87;
}
@media only screen and (max-width: 768px) {
  .modalwrap .modalwrap-content {
    width: 80%;
  }
}
@media only screen and (min-width: 767px) {
  .modalwrap .modalwrap-content.wd60 {
    width: 60%;
  }
  .modalwrap .modalwrap-content.wd40 {
    width: 40%;
  }
  .modalwrap .modalwrap-content.wd25 {
    width: 25%;
  }
}
</style>
