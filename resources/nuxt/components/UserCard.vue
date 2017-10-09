<template>
  <div class="user">
    <nuxt-link :to="`/user/${user.id}`">
      <div>
        <h1>{{`${user.last_name} ${user.first_name}`}}</h1>
        <hr>
        <p>{{user.email}}</p>
        <span>{{user.updated_at}}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props:['user'],
    name:'user-card',
  }
</script>

<style scoped>
  .user {
    border: 1px solid #d1dbe5;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 30px;
    -webkit-transition: ease .3s;
    -moz-transition: ease .3s;
    transition: ease .3s;
  }
  .user:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .user hr {
    border:0;
    border-bottom: 2px solid #e4e4e4;
  }
  .user a {
    display: block;
    padding: 15px 25px;
  }
  .user h1 {
    font-size: 25px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 0 15px;
  }
  .user p {
    padding: 10px 0;
    color: #8a8a8a;
  }
  .user span {
    color: #8a8a8a;
    display: block;
    text-align: right;
  }
</style>
