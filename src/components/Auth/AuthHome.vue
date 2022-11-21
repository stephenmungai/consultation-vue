<template>
    <div id="auth-intro">
        <h1>Welcome to Consultation</h1>
        <br>
        <div class="col">
            <router-link to="/auth/patient/"><button>Register as patient</button></router-link>
            <button>Register as Doctor</button>
        </div>
    </div>

</template>

<script>

</script>
<style>
#auth-intro {
    margin: 4em auto;
    display: block;
}

button {
    padding: 1.2em;
    color: white;
    background-color: #1d9fb9;
    border-radius: 7px;
    border: none;
    margin: 1.2em 0;
}
</style>