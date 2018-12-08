<template>
  <div class="editor">
    <h1>エディター画面</h1>
    <span>{{user.displayName}}</span>
    <button @click="logout">ログアウト</button>
    <div>
      <div class="memoListWrapper">
        <div class="memoList" v-for="(memo,index) in memos" @click="selectMemo(index)" :data-selected="index == selectedIndex">
          <p class="memoTitle">
            {{ displayTitle(memo.markdown)}}
          </p>
        </div>
        <button class="addMemoBtn" @click="addMemo">メモの追加</button>
        <button class="deleteMemoBtn" v-if="memos.length > 1" @click="deleteMemo">選択中のメモを消去</button>
        <button class="saveMemosBtn" @click="saveMemos">メモの保存</button>
      </div>
        <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
        <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
export default{
  name:"editor",
  props : ['user'],
  data(){
    return {
      memos : [
        {
          markdown : ""
        }
      ],
      selectedIndex: 0
    };
  },
  created: function() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          this.memos = result.val();
        }
      });
  },
  mounted: function(){
    document.onkeydown = e => {
      if (e.key == 's' && e.metakey){
        this.saveMemos();
        return false;
      }
    }
  },
  beforeDestroy: function() {
    document.onkeydown = null;
  },
  methods : {
    logout: function(){
      firebase.auth().signOut();
    },
    addMemo: function(){
      this.memos.push({
        markdown: "無題のメモ"
      });
    },
    deleteMemo: function(){
      this.memos.splice(this.selectedIndex,1);
      if (this.selectedIndex >0 ) {
        tehis.selectedIndex--;
      }
    },
    selectMemo: function(index){
      this.selectedIndex = index;
    },
    preview : function (){
      return marked(this.memos[this.selectedIndex].markdown);
    },
    displayTitle: function(text){
      return text.split(/\n/)[0];
    },
    savaMemos: function(){
      firebase.database().ref('memos/' + this.user.uid).set(this.memos);
    }
  }
};
</script>
<style lang="scss" scoped>
.memoListWrapper {
  width: 19%;
  float: left;
  border-top: 1px solid #000;
}
.memoList {
  padding: 10px;
  box-sizing:border-box;
  text-align:1px solid #000;
  &:nth-child(even){
    beckground-color: #ccf;
  }
  &[data-selected="true"]{
    background-color: #ccf;
  }
}
.memoTitle {
  height : 1.5em;
  margin: 0;
  white-space : nowrap;
  overflow : hidden;
}
.addMemoBtn {
  margin-top: 20px;
}
.deleteMemoBtn{
  margin: 10px;
}
.markdown {
  float : left;
  width: 40%;
  height: 500px;
}
.preview {
  float: left;
  width: 40%;
  text-aligin: left;
}

</style>
