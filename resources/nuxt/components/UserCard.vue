<template>
  <div class="user">
    <nuxt-link :to="`/user/${user.id}`">
      <div class="cell image">
        <img :src="user.thumbnail" alt="">
      </div>
      <div class="cell profile">
        <span class="group">{{user.group.name}} - {{user.position}}</span>
        <h1>{{`${user.last_name} ${user.first_name}`}}</h1>
        <hr>
        <div>
          <div class="condition">
            <el-tag class="tag" type="gray">退席中</el-tag>
            <i class="icon-rate-face-1"></i>
            不調
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props:['user'],
    name:'user-card',
    data () {
      return {
        option: 2
      }
    }
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
    width: 125px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .user .cell.image img {
    width: 100%;
  }
  .user .cell.profile {
    width: calc(100% - 125px);
    margin-left: 125px;
    padding: 15px 15px;
  }
  .user hr {
    border:0;
    border-bottom: 2px solid #f5f5f5;
    margin-bottom: 15px;
  }
  .user a {
    display: block;
    height: 125px;
  }
  .user h1 {
    font-size: 17px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 10px;
    position: relative;
  }
  .user h1::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 5px;
    height: 50%;
    background-color: #cccccc;
  }
  .user .group {
    color: #8a8a8a;
    display: block;
    font-size: 12px;
  }
  .tag {
    margin-right: 10px;
  }
  .condition {
    color: #99A9BF;
    text-align: right;
  }
  @media screen and (max-width: 767px){
    .user .cell.image {
      width: 62.5px;
    }
    .user .cell.profile {
      width: calc(100% - 62.5px);
      margin-left: 62.5px;
    }
  }
</style>
