<template>
  <div>
    <contents-name name="ユーザ一覧">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item>ユーザ一覧</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="column-2">
        <div class="controller">
          <nuxt-link to="/management/user/invite">
            <div class="invite-button el-icon-message"> ユーザ招待</div>
          </nuxt-link>
        </div>
      </div>

      <div class="users-info-container">
        <inviting-user></inviting-user>

        <div class="contents">
          <el-form class="current-users-search">
            <el-form-item label="ユーザ検索">
              <el-autocomplete
                  class="inline-input"
                  v-model="search.word"
                  :fetch-suggestions="querySearch"
                  placeholder="name"
                  :trigger-on-focus="false"
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
            <div class="user-wrap" v-for="user in displayUsers" :key="user.id">
              <nuxt-link :to="`/management/user/${user.id}`">
                <div class="user">
                  <span class="group">{{user.group.name}} - {{user.position}}</span>
                  <h1>{{user.last_name}}{{user.first_name}}</h1>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <div class="err">
              <p>User Not Found !</p>
              <icon scale="8" name="frown-o"></icon>
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
  .user{
    padding:5px;
    border-bottom:solid 5px #f8f8f8;
  }
  .user:hover{
    background:#f8f8f8;
  }
  .user h1{
    font-size: 17px;
    color: #8a8a8a;
    letter-spacing: 1.5px;
    padding: 8px 10px;
    position: relative;
  }
  .user h1:before{
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
  .group{
    color: #8a8a8a;
    display: block;
    font-size: 12px;
  }
  .invite-button {
    background-color: #334257;
    color: #b2bfcd;
    cursor: pointer;
    transition: .3s;
    padding: 15px;
    border-radius: 3px;
    font-size: 14px;
    margin-left: auto;
    width: 120px;
    display: block;
  }

  .invite-button:hover {
    background-color: #48576a;
  }

  .controller {
    border-radius: 2px;
    background-color: #fff;
    margin-bottom: 10px;
    padding:15px;
    width: 100%;
    display: inline-block;
    vertical-align: top;
  }

  .users-info-container {
    display: flex;
  }

  .contents {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px;
    width: 63%;
    margin-left:2%;
  }

  .err {
    text-align: center;
    color: #334257;
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .err p {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
</style>

