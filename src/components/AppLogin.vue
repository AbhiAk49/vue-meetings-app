<template>
    <div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1>Login</h1>
                <hr />
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter Registered Email address"
                            v-model="form.email"
                            @blur="$v.form.email.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.email),
                                'is-valid': shouldAppendValidClass($v.form.email)
                            }"
                        />
                        <div v-if="$v.form.email.$error">
                            <div v-if="!$v.form.email.required" class="error-message">
                                <small>The email field is required</small>
                            </div>
                            <div v-if="!$v.form.email.email" class="error-message">
                                <small>Invalid email address</small>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            v-model="form.password"
                            @blur="$v.form.password.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.password),
                                'is-valid': shouldAppendValidClass($v.form.password)
                            }"
                        />
                        <div v-if="$v.form.password.$error">
                            <div v-if="!$v.form.password.required" class="error-message">
                                <small>The password is required</small>
                            </div>
                            <div v-if="!$v.form.password.minLength" class="error-message">
                                <small>Password MUST have at least 8 characters</small>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm mx-2 my-1" @click.prevent="login" :disabled="$v.form.$invalid" type="submit">Login</button>
                        <button class="btn btn-outline-info btn-sm mx-2 " @click=navSignup>Create Account?</button>
                    </div>
                </form>
                <div class="text-muted">
                    <small><strong>NOTE</strong>:Email is "abhiak@example.com",
                     and Password is "abhiAk@49"</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { email, required, minLength } from 'vuelidate/lib/validators'
    //import { login } from '@/services/auth';
    // import config from '@/config';

    export default {
        name: 'AppLogin',
        data() {
            return {
                processing: false,
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        validations: {
            form: {
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 )
                }
            }
        },
        computed:{
                    getName(){
                        return this.$store.state.auth.name;
                    }
        },
        methods: {
            shouldAppendErrorClass( field ) {
                return field.$error; 
            },
            shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
            login() {
                this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
                    this.$store.dispatch('login',this.form )
                        .then( () => {
                            this.$router.push( { name: 'home' } );
                            Vue.$toast.success(
                                `Welcome! ${this.getName}`,
                             {
                                 timeout:5000
                             });

                            } )
                        .catch( error => {
                            Vue.$toast.error(
                               `${error.response.data.message}`,
                            {
                                timeout:5000
                            });
                        });
                } else {
                    //console.log( 'invalid input values' );
                    Vue.$toast.error(
                               `Invalid Input Values.Please try again`,
                            {
                                timeout:5000
                            });
                }
            },
            navSignup(){
                this.$router.push({name:'signup'})
            }
        }
    }
</script>

<style scoped>
.error-message{
    color: red;
}
</style>