<template>
    <div class="report-card">
        <p class="report-number">{{quantity}}</p>
        <p class="report-subtitle">{{name}}</p>
    </div>
</template>

<script>
export default{
    props:['name','quantity']
}
</script>