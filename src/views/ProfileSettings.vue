<template>


    <body>
        <link rel="stylesheet" type="text/css"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <section class="">
            <div class="container">
                <!-- <h1 class="mb-5">Account Settings</h1> -->
                <div class="bg-white shadow rounded-lg d-block d-sm-flex">
                    <div class="profile-tab-nav border-right">
                        <div class="p-4">
                            <div class="img-circle text-center mb-3">
                                <input type="file" ref="file" style="display: none" @change="onFileChange">
                                <img v-if="profile" :src="profileImage" alt="Image" @click="$refs.file.click()"
                                    style="width:5em;height:5em;">
                            </div>
                        </div>
                        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                            aria-orientation="vertical">
                            <a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab"
                                aria-controls="account" aria-selected="true">
                                <i class="fa fa-home text-center mr-1"></i>
                                Account
                            </a>
                            <a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab"
                                aria-controls="password" aria-selected="false">
                                <i class="fa fa-key text-center mr-1"></i>
                                Password
                            </a>

                        </div>
                    </div>
                    <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="account" role="tabpanel"
                            aria-labelledby="account-tab">
                            <h3 class="mb-4">Account Settings</h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>First Name</label>
                                        <input type="text" v-model="fname" class="form-control" v-if="profile">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Last Name</label>
                                        <input type="text" v-model="lname" class="form-control" v-if="profile">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Phone number</label>
                                        <input type="text" v-model="phone_number" class="form-control" v-if="profile">
                                    </div>
                                </div>


                            </div>
                            <div>
                                <button class="btn btn-primary" @click="updateProfile">Update</button>
                                <button class="btn btn-light">Cancel</button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                            <h3 class="mb-4">Password Settings</h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Old password</label>
                                        <input type="password" class="form-control" v-model="old_password">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>New password</label>
                                        <input type="password" class="form-control" v-model="new_password1">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Confirm new password</label>
                                        <input type="password" class="form-control" v-model="new_password2">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary" @click="updatePassword">Update</button>
                                <button class="btn btn-light">Cancel</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </section>

    </body>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            fname: "",
            lname: "",
            phone_number: "",
            old_password: "",
            new_password1: "",
            new_password2: "",
            pic: null
        }
    },
    computed: {
        ...mapGetters({ user: 'getUser' }),
        profile() {
            return this.user['profile']
        },
        profileImage() {
            if (this.pic != null) {
                return URL.createObjectURL(this.pic)
            }
            if (this.profile['image'] == null) {
                return "data:image/png;base64,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"

            }
            else {
                return this.profile['image']
            }
        }

    },
    methods: {
        async updateProfile() {

            var res = await this.$axios.post('auth/update/profile/', { image: this.pic, first_name: this.fname, last_name: this.lname, phone_number: this.phone_number },
            { headers: { 'Content-Type': 'multipart/form-data' }});

            if (res.status <= 210) {
                this.$store.dispatch('populateUser');
            }
        },
        async updatePassword() {
            var res = await this.$axios.post('auth/password/change/', {
                old_password: this.old_password,
                new_password1: this.new_password1,
                new_password2: this.new_password2
            })
            console.log(res.data)
            if (res.status <= 210) {
                console.log("Password change success");
            }
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            this.pic = files[0];
        },
    },

    async mounted() {
        let user = await this.$store.dispatch('populateUser');
        console.log(user)
        this.fname = user['profile']['first_name'];
        this.lname = user['profile']['last_name'];
        this.phone_number = user['profile']['phone_number'];
    },

    async created() {
        await this.$store.dispatch('populateUser');
    }
}

</script>
