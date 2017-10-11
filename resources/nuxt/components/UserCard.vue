<template>
  <div class="user">
    <nuxt-link :to="`/user/${user.id}`">
      <div class="cell image">
        <img src="https://placehold.jp/100x100.png" alt="">
      </div>
      <div class="cell profile">
        <h1>{{`${user.last_name} ${user.first_name}`}}</h1>
        <hr>
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
    border: 1px solid #cccccc;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 30px;
    -webkit-transition: ease .3s;
    -moz-transition: ease .3s;
    transition: ease .3s;
    width: 100%;
    position: relative;
  }
  .user:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .user .cell {
    display: inline-block;
    vertical-align: top;
  }
  .user .cell.image {
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .user .cell.image img {
    width: 100%;
  }
  .user .cell.profile {
    width: calc(100% - 100px);
    margin-left: 100px;
    padding: 10px 15px;
    box-sizing: border-box;
  }
  .user hr {
    border:0;
    border-bottom: 2px solid #f5f5f5;
  }
  .user a {
    display: block;
    height: 100px;
  }
  .user h1 {
    font-size: 17px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 0;
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
