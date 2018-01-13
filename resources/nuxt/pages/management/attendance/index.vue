<template>
  <div>
    <contents-name name="ユーザ一覧">
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
          <div v-if="displayUsers.length">
            <div v-for="attendance in displayAttendances" :key="attendance.id">
              <nuxt-link class="users__body--item" :to="`/management/user/${attendance.user.id}`">
                <div class="users__body--img">
                  <span v-if="attendance.user.thumbnail"><img :src="attendance.user.thumbnail" alt=""></span>
                  <span v-else><img src="~assets/imgs/noimage.png" alt=""></span>
                </div>
                <span class="users__body--name">{{attendance.user.last_name}} {{attendance.user.first_name}}</span>
                <p class="users__body--time">{{updateTime(attendance.started_at)}}</p>
              </nuxt-link>
            </div>
            <div class="toList">
              <nuxt-link to="/management/clockin/list" >
                勤怠一覧へ
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <div class="err">
              <p>User Not Found !</p>
              <icon scale="4" name="frown-o"></icon>
            </div>
          </div>
        </div>
        <div class="contents">
          <div class="head">
            <h1>ユーザ一覧</h1>
          </div>
          <el-form class="current-users-search">
            <el-form-item label="ユーザ検索">
              <el-autocomplete
                  class="inline-input"
                  v-model="search.word"
                  :fetch-suggestions="querySearch"
                  placeholder="name"
                  @select="handleSelect"
                  icon="search"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="グループ">
              <el-select v-model="search.group" placeholder="グループ">
                <el-option label="選択なし" value=""></el-option>
                <el-option v-for="group in toValueFromGroups" :label="group.label"
                           :value="group.value"
                           :key="group.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div v-if="displayUsers.length">
            <div v-for="user in displayUsers" :key="user.id">
              <nuxt-link class="users__body--item" :to="`/management/user/${user.id}`">
                <div class="users__body--img">
                  <span v-if="user.thumbnail"><img :src="user.thumbnail" alt=""></span>
                  <span v-else><img src="~assets/imgs/noimage.png" alt=""></span>
                </div>
                <span class="users__body--name">{{user.last_name}} {{user.first_name}}</span>
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <div class="err">
              <p>User Not Found !</p>
              <icon scale="4" name="frown-o"></icon>
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
    data () {
      return {
        search: {
          word: '',
          group: '',
          active: ''
        }
      }
    },
    components: {
      UserCard,
      ContentsName,
      InvitingUser
    },
    computed: {
      groups () {
        return this.$store.state.groups
      },
      toValueFromGroups () {
        const groups = this.$store.state.groups
        return groups.map((group) => {
          return {
            value: group.id,
            label: group.name
          }
        })
      },
      users () {
        return this.$store.state.users
      },
      displayUsers () {
        let users = this.$store.state.users

        users = users.filter((user) => {
          const fullName = this.fullName(user.first_name, user.last_name)
          const fullNameKana = this.fullName(user.first_name_kana, user.last_name_kana)
          return fullName.indexOf(this.search.word) >= 0 || fullNameKana.indexOf(this.search.word) >= 0
        })

        users = users.filter((user) => {
          return this.search.group ? user.group.id === this.search.group : true
        })

        return users
      },
      displayAttendances (){
        let attendances = this.$store.state.attendances
        return attendances
      },
      toValueFormUsers () {
        const users = this.$store.state.users
        return users.map((user) => {
          return {
            value: this.fullName(user.first_name, user.last_name),
            nameKana: this.fullName(user.first_name_kana, user.last_name_kana)
          }
        })
      }
    },
    methods: {
      updateTime(time){
        return moment(time).format('YYYY年MM月DD日')
      },
      fullName (first, last) {
        return `${last}${first}`
      },
      querySearch (queryString, cb) {
        let results = this.toValueFormUsers
        if (queryString) {
          results = this.toValueFormUsers.filter((user) => {
            return (user.value.indexOf(queryString) >= 0 || user.nameKana.indexOf(queryString) >= 0)
          })
        }
        if (results.length) {
          return cb(results)
        }
        return cb(this.toValueFormUsers)
      },
      handleSelect (user) {
        this.search.word = user.value
      }
    },
    async fetch ({app, store}) {
      if (!store.state.users) {
        const {data} = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
      if (!store.state.groups) {
        const {data} = await app.$http.get('/group')
        store.commit('SET_GROUPS', data.groups)
      }
      if (!store.state.invitingUsers) {
        const {data} = await app.$http.get('/manager/invite')
        store.commit('SET_INVITING_USERS', data.users)
      }

      const { data } = await app.$http.get('/attendance/all?limit=10')
      store.commit('SET_ATTENDANCES', data.attendances)
    }
  }
</script>

<style scoped>
  .users-info-container {
    display: flex;
    align-items: flex-start;
  }

  .contents {
    border-radius: 2px;
    background-color: #fff;
    width: 49.5%;
  }
  .toList{
    padding:20px;
    text-align: right;
  }

  .contents:last-child {
    margin-left: 1%;
  }

  .contents .head {
    padding: 20px;
    border-bottom: solid 1px #efefef;
  }

  .current-users-search {
    padding: 20px 20px 0px 20px;
    border-bottom: solid 1px #efefef;
    text-align: right;
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

