<template>
    <UploadModal @closeUpload='showModal=false' v-if='showModal' @upload="upload" />
    <section id="photos-section">
        <div class="photos-title">
            <div class="col">
                <p class="section-title">
                    Photos & Videos
                </p>
                <p class="caption">{{mediaCount}} items</p>
            </div>
            <div class="add-media">
                <i class="fa fa-add" @click="showModal=true"></i>
            </div>
        </div>
        <div class="media-list">
            <MediaCard v-for="medium in media" :key="medium['id']" :data="medium" />
        </div>
    </section>
</template>

<script>

import MediaCard from './MediaCard.vue';
import UploadModal from './UploadModal.vue';
export default {
    data() {
        return {
            media: [],
            showModal: false,

        }
    },
    components: {
        MediaCard,
        UploadModal
    },
    async mounted() {
        var res = await this.$axios.get(`/patients/consultation/media/${this.$route.params.id}/`)
        console.log(res.data)
        if (res.status <= 210) {
            this.media = res.data
        }
    },
    computed: {
        mediaCount() {
            return this.media.length
        }
    },
    methods: {
        async upload({ file, text }) {
            // let formData = new FormData()
            // formData.append('file', file)
            let ticket = this.$route.params['id']
            var res =await  this.$axios.post('patients/media/', { 'file': file, 'caption': text, ticket: ticket }, { headers: { 'Content-Type': 'multipart/form-data' } })
            if (res.status <= 210) {
                this.media.push(res.data)
                this.showModal = false;
            }
        }
    }
}

</script>