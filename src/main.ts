import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudSunRain,
  faRulerCombined,
  faSpinner,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Planet from "@/components/Planet.vue";

library.add(faCloudSunRain, faRulerCombined, faSpinner, faUserFriends);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("planet", Planet)
  .use(router)
  .mount("#app");
