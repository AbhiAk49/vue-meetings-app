<template>
    <div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1>Sign Up</h1>
                <hr />
                <form name="form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter your Email address"
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
                        <label for="con-password">Confirm Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="con-password"
                            id="con-password"
                            placeholder="Confirm Your password"
                            v-model="form.confirmPassword"
                            @blur="$v.form.confirmPassword.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.confirmPassword),
                                'is-valid': shouldAppendValidClass($v.form.confirmPassword)
                            }"
                        />
                        <div v-if="$v.form.confirmPassword.$error">
                            <div v-if="!$v.form.confirmPassword.required" class="error-message">
                                <small>This field is required</small>
                            </div>
                            <div v-if="!$v.form.confirmPassword.sameAsPassword" class="error-message">
                                <small>Must be same as Password</small>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm mx-2 my-1" @click.prevent="signup" :disabled="$v.form.$invalid" type="submit">Create Account</button>
                        <button class="btn btn-outline-info mx-2 btn-sm " @click=navLogin>Already have an account?</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { email, required, minLength,sameAs } from 'vuelidate/lib/validators'
    import { signup } from '@/services/auth';
    // import config from '@/config';

    export default {
        name: 'AppSignup',
        data() {
            return {
                processing: false,
                form: {
                    email: '',
                    password: '',
                    confirmPassword:''
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
                },
                confirmPassword:{
                    required,
                    sameAsPassword:sameAs('password')
                }
            }
        },
        methods: {
            shouldAppendErrorClass( field ) {
                return field.$error; 
            },
            shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
            signup() {
                this.$v.form.$touch();

                if( !this.$v.form.$invalid ) {
                    signup({ email : this.form.email , password : this.form.password })
                        .then( () => {
                            Vue.$toast.success(
                                `Account has been created.
                                 Login to continue...`,
                             {
                                 timeout:5000
                             });
                            this.$router.push( { name: 'login' } ) 
                            })
                        .catch( error => {
                            Vue.$toast.error(
                               `${error.response.data.message}`,
                            {
                                timeout:5000
                            });
                        });
                } else {
                    console.log( 'invalid input values' );
                    Vue.$toast.error(
                               `Invalid Input Values.Please try again`,
                            {
                                timeout:5000
                            });
                }
            },
            navLogin(){
                this.$router.push({name:'login'})
            }
        }
    }
</script>

<style scoped>
.error-message{
    color: red;
}
</style>