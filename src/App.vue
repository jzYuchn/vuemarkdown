<template>
  <div class="">
    <v-app>
      <v-toolbar app class="grey darken-4">
          <h1><router-link :to="{name: 'top'}" class="white--text">Markdown memo</router-link></h1>
          <v-btn color="info" href = "https://github.com/kusaoisii/vuemarkdown">Repository</v-btn>
      </v-toolbar>
    <v-content class="grey lighten-2">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
#app,
.container {
  height: 100%;
}
h1 {
  float: left;
  font-family: "Nikukyu";
  font-size: 27px;
  padding-bottom: 7px;
}

.v-btn {
  float: right;
}

</style>
