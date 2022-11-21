<template>
    <div class="notfound-page">
        <img src="../assets/notfound.svg" alt="">
        <router-link to="/">
            <button>Back To Home</button>
        </router-link>
    </div>
</template>

<style scoped>
.notfound-page {
    height: 100vh;
}

img {
    height: 80vh;
    margin: 0 auto;
    display: block;
}

button {
    width: 300px;
    margin: 0 auto;
    display: block;
}
</style>