<template>

    <div class="screen-width">
        <div class="row" id="auth-container">
            <div class="main-image">
                <img src="../assets/3641634.jpg" alt="doctors">
            </div>
            <div class="auth-content">
               <router-view/>
            </div>
        </div>
    </div>

</template>

<script>

</script>

<style>
.main-image{
    width: 60vw;
    background-color: #CFECEA;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main-image img{
    width: 80%;
}
.auth-content{
    padding: 1.2em;
}
button {
    padding: 1.2em;
    color: white;
    background-color: #1d9fb9;
    border-radius: 7px;
    border: none;
    margin: 1.2em 0;
    /* width: 100%; */
}
</style>