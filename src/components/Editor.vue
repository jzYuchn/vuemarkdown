<template>
  <div class="editor">
    <h1>エディター画面</h1>
    <span>{{ userData.displayName }}</span>
    <button @click="logout">s</button>
  </div>
</template>

<script>
export default{
  name:"editor",
  props : ["userData"],
  data(){
    return {};
  },
  methods : {
    logout: function(){
      firebase.auth().signOut();
    }
  }
};
</script>
