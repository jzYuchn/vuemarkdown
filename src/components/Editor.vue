<template>
    <div class="editor layout">
        <div class="editor__sidebar flex xs2">
          <div>
            <v-btn dark small class="error" @click="logout">logout</v-btn>
          </div>
            <div class="editor__thumb acounnt" >
                <p class="balloon">{{user.displayName}}で<br>ログイン</p>
            </div>
            <div class="editor__btnArea layout">
                <v-btn dark small color="indigo" @click="addMemo">add</v-btn>
                <v-btn dark small color="primary" :disabled="memos.length < 2" @click="deleteMemo">remove</v-btn>
            </div>
            <div class="memoList">
                <div  v-if="memos" v-for="(memo, index) in memos" :key="index" @click="selectMemo(index)" :data-selected="index == selectedIndex" class="memoList__item">
                    <span v-if="index == selectedIndex" class="memoList__tag">選択中</span>
                    <v-card hover>{{memo.title}}</v-card>
                </div>
            </div>
          </div>
        <div class="editor__content white flex xs10">
            <input type="text" class="editor__title" placeholder="タイトルを入力" v-model="memos[selectedIndex].title">
            <div class="editor__writeArea layout">
                <textarea class="markdown flex xs6" v-model="memos[selectedIndex].markdown" placeholder="マークダウンでメモをかくにゃ！"></textarea>
                <div class="preview markdown-body flex xs6" v-html="preview()"></div>
            </div>
            <v-btn large class="black darken-2 white--text" @click="saveMemos">メモを保存する</v-btn>
        </div>
    </div>
</template>

<script>
import marked from "marked";
export default {
    name: "editor",
    props: ["user"],
    data() {
        return {
            memos: [
                {
                    title: "",
                    markdown: "",
                }
            ],
            selectedIndex: 0
        };
    },
    created: function() {
        firebase
            .database()
                .ref('memos/' + this.user.uid)
                .once('value')
                .then(result => {
                    if (result.val()) {
                        this.memos = result.val();
                    }
                })
    },
    methods: {
      logout: function() {
          firebase.auth().signOut();
      },
      addMemo: function() {
            this.memos.push({
                title: "無題のメモ",
                markdown: ""
            })
        },
        deleteMemo: function() {
            this.memos.splice(this.selectedIndex, 1);
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
            }
        },
        selectMemo: function(index) {
            this.selectedIndex = index;
        },
        preview: function() {
            return marked(this.memos[this.selectedIndex].markdown)
        },
        saveMemos: function() {
            firebase
                .database()
                    .ref('memos/' + this.user.uid)
                    .set(this.memos);
        }
    }
}
</script>

<style lang="scss" scoped>
// Component

.v-card {
    padding: 20px;
}
.v-btn {
    margin: 0 6px;
}
// Original
.memoList {
    // Variable
    $tag-height: 25px;
    $tag-color: #FBC02D;
    margin-top: 40px;
    &__item {
        position: relative;
        & + & {
            margin-top: $tag-height + 5px;
        }
    }
    &__tag {
        background-color: $tag-color;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: bold;
        padding: 3px 5px 4px;
        position: absolute;
        right: 0;
        top: -$tag-height;
        &:after {
            border: 0 solid  transparent;
            border-width: $tag-height 20px 0 0;
            border-right-color: $tag-color;
            content: "";
            position: absolute;
            right: 100%;
            top: 0;
        }
    }
}
.editor {
    height: 100%;
    &__sidebar {
        margin-right: 24px;
    }
    &__thumb {
        > img {
            border-radius: 50%;
            max-width: 100%;
            width: 250px;
        }
    }
    &__content {
        overflow: scroll;
        padding: 40px 20px;
        > button {
            margin: 20px 20px 0;
        }
    }
    &__title {
        border: 1px solid #ccc;
        font-size: 24px;
        padding: 10px;
        margin: 0 20px;
        width: calc(100% - 40px);
    }
    &__writeArea {
        height: 80%;
        margin-top: 20px;
        > * {
            border: 1px solid #ccc;
            height: 100%;
            padding: 30px;
            margin: 0 20px;
        }
    }
}
.link {
    display: block;
    margin: -5px 0 15px;
}
</style>
