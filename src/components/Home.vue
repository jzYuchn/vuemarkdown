<template>
    <div class="container">
        <h1><img src="../assets/markdownlogo.png" alt=""></h1>
        <div class="layout">
                <v-btn color= "white" @click ="googleLogin">LOGIN</v-btn>

        </div>
        <router-link :to="{ name: 'terms' }" class="link">利用規約</router-link>
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
            firebase
                .auth()
                    .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    text-align: center;
    width: 600px;
}
h1 > img {
    border-radius: 50%;
    max-width: 100%;
    width: 250px;
}
</style>
