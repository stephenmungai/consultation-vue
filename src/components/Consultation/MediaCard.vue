<template>
    <a :href="data['file']" download>
        <div class="media-card-container">
            <p class="caption">{{data['sender']['profile']['first_name']}} {{data['sender']['profile']['last_name']}}
            </p>
            <div class="media-card">
                <img :src="data['file']" alt="">
                <div class="col">
                    <p class="media-message">{{data['caption']}}</p>
                    <p class="message-time">{{formatDate}}</p>
                </div>
            </div>
    </div>
    </a>

</template>

<script>
import moment from 'moment'
export default {
    props: ['data'],
    computed: {
        formatDate() {
            return moment(this.$props.data['date_shared']).format("MMM Do YY ");

        },
    }
}
</script>