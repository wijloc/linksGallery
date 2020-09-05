<template>
  <v-app>
    <v-content>
      <Gallery />
    </v-content>
  </v-app>
</template>

<script>
import Gallery from "./components/Gallery";

export default {
  name: "App",

  components: {
    Gallery
  },

  data: () => ({
    //
  })
};
</script>
