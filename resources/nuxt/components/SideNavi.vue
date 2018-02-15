<template>
  <div>
    <el-menu class="el-menu-vertical" :router="true" :collapse="isCollapse" text-color="#8a8a8a">
      <div class="profile">
        <div class="profile__image">
          <nuxt-link :to="`/me`">
            <div v-if="me.thumbnail" class="thumbnail">
              <img :src="me.thumbnail" alt="">
              <div :style="{backgroundColor: displayColor}" class="state">
              </div>
            </div>
            <div v-else>
              <img src="~assets/imgs/noimage.png" alt="">
            </div>
          </nuxt-link>
        </div>
      </div>
      <el-menu-item index="/">
        <icon name="home"></icon>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="/state">
        <icon name="clock-o"></icon>
        <span slot="title">State</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <icon name="user"></icon>
        <span slot="title">Users</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <icon name="bar-chart"></icon>
        <span slot="title">Report</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <icon name="list"></icon>
        <span slot="title">News</span>
      </el-menu-item>
      <el-menu-item v-if="isManeger" index="/management">
        <icon name="cog"></icon>
        <span slot="title">Management</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        Color: "#909399",
        type: {'primary': '#409EFF', 'warning': '#E6A23C', 'success': '#67C23A', 'info': '#909399'}
      }
    },
    mounted(){
      this.$client.emit('user', this.me.id)
      this.$client.on(this.me.id, (state) => {
        if (state === 1) {
          this.Color = this.type['primary']
          this.$store.commit('SET_USER_TYPE',{id: this.me.id, type: 'primary'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.me.id, isActive: true})
        }
        if (state === 2) {
          this.Color = this.type['warning']
          this.$store.commit('SET_USER_TYPE',{id: this.me.id, type: 'warning'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.me.id, isActive: false})
        }
        if (state === 3) {
          this.Color = this.type['success']
          this.$store.commit('SET_USER_TYPE',{id: this.me.id, type: 'success'})
          this.$store.commit('IS_ACTIVATE_USER', {id: this.me.id, isActive: false})
        }
        if(!state || state === 0){
          this.Color = this.type['info']
          this.$store.commit('SET_USER_TYPE',{id: this.me.id, type: 'info'})
        }
      })
    },
    computed: {
      isCollapse () {
        return this.$store.state.device !== 'pc'
      },
      isManeger () {
        return this.$store.state.isManager
      },
      me () {
        return this.$store.state.me
      },
      displayColor(){
          const index = this.$store.state.users.findIndex((user) => {
            return this.me.id == user.id
          })
          const user = this.$store.state.users[index]

          if (user.type) {
            this.Color = this.type[user.type]
          } else {
            if (user.attendances[0] && user.attendances[0].ended_at == null) {
              if (user.attendances[0].rest[0] && user.attendances[0].rest[0].ended_at == null) {
                this.$store.commit('SET_USER_TYPE', {id: user.id, type: 'warning'})
                this.Color = this.type['warning']
              } else {
                this.$store.commit('SET_USER_TYPE', {id: user.id, type: 'primary'})
                this.Color = this.type['primary']
              }
            } else {
              this.$store.commit('SET_USER_TYPE', {id: user.id, type: 'info'})
              this.Color = this.type['info']
            }
          }
          return this.Color
      }
    }
  }
</script>
<style>
  .el-menu {
    border-radius: 0;
  }

  .el-menu-vertical {
    position: fixed;
    top: 0;
    left: 0;
    /* important */
    height: 110%;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
  }
</style>

<style scoped>
  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
    margin-right: 5px;
    width: 24px;
    text-align: center;
  }

  .thumbnail {
    position: relative;
  }

  .state {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: solid 3px #eee;
  }

  .profile {
    text-align: center;
    padding: 20px 0 20px;
    background: #f9f9f9;
    border-bottom: 1px solid #e6e6e6;
  }

  .profile__image {
    width: 100px;
    display: inline-block;
  }

  .profile__image img {
    border: 5px solid #eeeeee;
    border-radius: 100%;
  }

  @media screen and (max-width: 959px) {
    .profile__image {
      width: 50px;
    }
    .state{
      width:20px;
      height:20px;
    }
  }
</style>
