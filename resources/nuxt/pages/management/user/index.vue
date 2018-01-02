<template>
  <div>
    <contents-name name="ユーザ一覧">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item>ユーザ一覧</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="users-info-container">
        <inviting-user></inviting-user>

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
            <div class="users__body--item" v-for="user in displayUsers" :key="user.id">
              <nuxt-link :to="`/management/user/${user.id}`">
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
      if (!store.state.invitingUsers){
        const {data} = await app.$http.get('/manager/invite')
        store.commit('SET_INVITING_USERS', data.users)
      }
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
    width: calc(55% - 10px);
    margin-left:10px;
  }
  .contents .head{
    padding:20px;
    border-bottom: solid 1px #efefef;
  }
  .current-users-search{
    padding:20px 20px 0px 20px;
    border-bottom: solid 1px #efefef;
    text-align: right;
  }
  .users__body--item {
    padding: 13px 20px;
    display: block;
    color: #5A5E66;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0px 0px 0px 0px #efefef;
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
  .users__body--img img{
    width: 50px;
    border-radius: 100%;
    border: solid 5px #EEEEEE;
  }
  .users__body--name {
    vertical-align: middle;
    margin-left: 20px;
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

