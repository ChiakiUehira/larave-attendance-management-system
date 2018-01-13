<template>
  <div>
    <contents-name name="勤怠管理">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item>勤怠管理</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="users-info-container">
        <div class="contents">
          <div class="head">
            <h1>最新勤怠</h1>
          </div>
          <div>
            <div v-for="attendance in attendances" :key="attendance.id">
              <nuxt-link class="users__body--item" :to="`/management/report/${attendance.id}`">
                <div class="users__body--img">
                  <span v-if="attendance.user.thumbnail"><img :src="attendance.user.thumbnail" alt=""></span>
                  <span v-else><img src="~assets/imgs/noimage.png" alt=""></span>
                </div>
                <span class="users__body--name">{{attendance.user.last_name}} {{attendance.user.first_name}}</span>
                <p class="users__body--time">{{updateTime(attendance.started_at)}}</p>
              </nuxt-link>
            </div>
            <div class="padding" v-if="!isEnd">
              <div class="loading el-icon-loading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from '@/components/UserCard.vue'
  import ContentsName from '@/components/ContentsName.vue'
  import InvitingUser from '~/components/InvitingUser.vue'
  import moment from 'moment'

  export default {
    async fetch ({app, store, route}) {
      const { data } = await app.$http.get('/manager/attendance?limit=20&offset=0')
      store.commit('SET_ALL_USER_ATTENDANCES', data.attendances)
    },
    data () {
      return {
        isFetch: false,
        isEnd: false
      }
    },
    components: {
      ContentsName,
    },
    computed: {
      attendances () {
        return this.$store.state.allUserAttendances
      },
    },
    methods: {
      updateTime(time){
        return moment(time).format('YYYY年MM月DD日')
      },
      fullName (first, last) {
        return `${last}${first}`
      },
      async fetchAttendances (offset) {
        const { data } = await this.$http.get(`/manager/attendance?limit=20&offset=${offset}`)
        return data.attendances
      },
      async onScroll () {
        if (document.body.clientHeight - 50 < (window.innerHeight + window.pageYOffset)) {
          if (!this.isFetch && !this.isEnd) {
            this.isFetch = true
            const attendances = await this.fetchAttendances(this.attendances.length)
            if (!attendances.length) {
              this.isEnd = true
            }
            this.$store.commit('SET_ALL_USER_ATTENDANCES', [...this.attendances,...attendances])
            this.isFetch = false
          }
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped>

  .contents {
    border-radius: 2px;
    background-color: #fff;
  }

  .contents .head {
    padding: 20px;
    border-bottom: solid 1px #efefef;
  }

  .users__body--item {
    padding: 13px 20px;
    display: flex;
    align-items: center;
    color: #5A5E66;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0px 0px 0px 0px #efefef;
    border-bottom: 1px solid #efefef;
  }

  .users__body--item:hover {
    background: #ECF5FF;
  }

  .users__body--item:not(:last-child) {
    border-bottom: solid 1px #efefef;
  }

  .users__body--img {
    display: inline-block;
    vertical-align: middle;
  }

  .users__body--img img {
    width: 50px;
    border-radius: 100%;
    border: solid 5px #EEEEEE;
  }

  .users__body--name {
    vertical-align: middle;
    margin-left: 20px;
  }
  .users__body--time {
    margin-left: auto;
  }

  .padding {
    text-align: center;
    padding: 30px 0;
  }

  .loading {
    font-size: 40px;
    color: #419cff;
  }

  .err {
    text-align: center;
    color: #58a8ff;
    padding: 30px 0;
  }

  .err p {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
</style>

