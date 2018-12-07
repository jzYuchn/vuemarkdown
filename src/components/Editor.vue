<template>
  <div class="editor">
    <h1>エディター画面</h1>
    <span>{{user.displayName}}</span>
    <button @click="logout">ログアウト</button>
    <div class="editoroWrapper">
      <textarea class="markdown" v-model="markdown"></textarea>
    </div>
    <div class="preview" v-html="preview()"></div>
  </div>
</template>

<script>
export default{
  name:"editor",
  props : ['user'],
  data(){
    return {
      markdown : ""
    };
  },
  methods : {
    logout: function(){
      firebase.auth().signOut();
    },
    preview : function (){
      return marked(this.markdown);
    },
  }
};
</script>
<style lang="scss" scoped>
.editoroWrapper{
  display : flex;
}
.markdown {
  width: 50%;
  height :500px;
}
.preview {
  width: 50%;
  text-align: left;
}
</style>
