<template>
  <div class="editor">
    <h1>エディター画面</h1>
    <button @click="console">con</button>
    <button @click="logout">s</button>
  </div>
</template>

<script>
export default{
  name:"editor",
  props : ["user"],
  data(){
    return {};
  },
  methods : {
    console: function(){console.log(user)},
    logout: function(){
      firebase.auth().signOut();
    }
  }
};
</script>
