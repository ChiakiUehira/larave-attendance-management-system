<template>
  <div class="user">
    <div class="cell image">
      <div v-if="user.thumbnail">
        <img :src="user.thumbnail" alt="">
      </div>
      <div v-else>
        <img src="~assets/imgs/noimage.png" alt="">
      </div>
    </div>
    <div class="cell profile">
      <span class="group" v-if="user.group">{{user.group.name}} - {{user.position}}</span>
      <span class="group" v-else>未所属</span>
      <h1>{{`${user.last_name} ${user.first_name}`}}</h1>
      <hr>
      <div class="condition">
        <el-tag class="tag" :type="displayType">{{displayState}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['user'],
    name: 'user-card',
    mounted(){
      this.$client.on(this.user.id, (state) => {
        if (state === 1) {
          this.type = 'primary'
          this.state = '出勤中'
          this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'primary'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.user.id, isActive: true})
        }
        if (state === 2) {
          this.type = 'warning'
          this.state = '休憩中'
          this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'warning'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.user.id, isActive: false})
        }
        if (state === 3) {
          this.type = 'success'
          this.state = '退勤済み'
          this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'success'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.user.id, isActive: false})
        }
        if(!state){
          this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'info'})
        }
      })
    },
    data(){
      return {
        state: '未出勤',
        type: 'info',
        isActive: false
      }
    },
    computed: {
      displayState(){
        if (this.user.attendances[0] && this.user.attendances[0].ended_at == null) {
          if(this.user.attendances[0].rest[0] && this.user.attendances[0].rest[0].ended_at == null){
            this.state = '休憩中'
          }else{
            this.state = '出勤中'
            this.$store.commit('IS_ACTIVATE_USER', {id: this.user.id, isActive: true})
          }
        }
        return this.state
      },
      displayType(){
        this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'info'})
        if (this.user.attendances[0] && this.user.attendances[0].ended_at == null) {
          if(this.user.attendances[0].rest[0] && this.user.attendances[0].rest[0].ended_at == null) {
            this.type = 'warning'
            this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'warning'})
          }else{
            this.type = 'primary'
            this.$store.commit('SET_USER_TYPE',{id: this.user.id, type: 'primary'})
          }
        }
        return this.type
      }
    }
  }
</script>

<style scoped>
  .user {
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    margin-bottom: 30px;
    -webkit-transition: ease .3s;
    -moz-transition: ease .3s;
    transition: ease .3s;
    width: 100%;
    position: relative;
  }

  .user:hover {
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
    padding: 11.5px;
  }

  .user hr {
    border: 0;
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

  @media screen and (max-width: 767px) {
    .user .cell.image {
      width: 62.5px;
    }

    .user .cell.profile {
      width: calc(100% - 62.5px);
      margin-left: 62.5px;
    }
  }
</style>
