<template>
    <div class="home">
      <h1><img  class="logo" src="../assets/markdownlogo.png" alt=""></h1>
      <div class="">
        <router-link :to="{ name: 'terms' }" class="link">利用規約</router-link>
      </div>
      <v-btn class = "login"color= "white" @click ="googleLogin">LOGIN</v-btn>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            msg: "Welcome to MyMarkdown"
        };
    },
    methods: {
        googleLogin: function() {
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  padding-top: 100px;
  width: 100%;
}
.logo {
  height: 130px;
  margin-bottom: 100px;
  text-align: center;
}

h1 > img {
  border-radius: 50%;
  max-width: 100%;
  width: 250px;
}

.login {
  font-size: 20px;
  padding: 5px 20px;
  text-align: center;
}

</style>
