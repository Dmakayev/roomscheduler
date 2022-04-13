<template>
  <div class="login">
    <h1>NDUS Portal Log In</h1>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <v-btn @click="login">Log In</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?username=${this.username}&password=${this.password}`
      )
      if(result.status==200 && result.data.length > 0){
        localStorage.setItem("user-info", JSON.stringify(result.data))
        this.$router.push({name: 'Home'})
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #378add;
  border-radius: 25px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  border: 25px solid #378add;
  width: 500px;
}

.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  background-color: #fff;
  border-radius: 25px;
  outline-color: #fff;
}

.login button {
  margin-top: 5px;
  width: 320px;
  height: 40px;
  color: black;
  cursor: pointer;
}

.login h1 {
  font-size: 20px;
  color: white;
  padding-bottom: 15px;
}
</style>