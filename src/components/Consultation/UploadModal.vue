<template>
    <Modal @close="$emit('closeUpload')">
        <div id="upload-modal">
            <h4>Upload File</h4>

            <div class="form-container">
                <label for="Image">Image</label>
                <input type="file" placeholder="Click to add" @change='onFileChange'>
            </div>
            <div class="form-container">
                <label for="Caption">Details (Optional)</label>
                <input type="text" class="textarea" v-model="text">
            </div>
            <button @click="upload">Send</button>
        </div>
    </Modal>
</template>

<script>
import Modal from '../Modal.vue'

export default {
    components: {
        Modal
    },
    data() {
        return {
            file: null,
            text: ''
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            this.file = files[0];
        },

        upload(){
            this.$emit('upload',{file:this.file,text:this.text})
        }
    }
}

</script>

<style scoped>
button {

    width: 100%;
}
</style>