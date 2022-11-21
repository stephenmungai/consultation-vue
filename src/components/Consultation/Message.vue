<template>
    <div class="message" :class="{'message-sender':isSender}">
        <img src="" alt="" class="sender">
        <div class="message-content">
            <p>{{message.text}}</p>
            <p class="message-time">{{time}}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex';
export default {
    props: ['message'],
    computed: {
        time() {
            return moment(this.$props.message['createdAt']).format('LT')
        },
        ...mapGetters({ user: 'getUser' }),
        isSender() {

            if (this.$props.message['user'] == this.user['id']) {
                return true;
            }

            return false;
        }
    },

}
</script>