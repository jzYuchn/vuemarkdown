f<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <button @click="googleLogin">Googleアカウントでログイン</button>
    <button @click="console"> console </button>
  </div>
</template>

<script>
export default {
  name : "home" ,
  data(){
    return {
      msg : "welcom to myapp"
    };
  },
  methods : {
    googleLogin : function(){
      console.log("e");
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    console : function(){
      console.log("conso");
    }
  }
};
</script>
