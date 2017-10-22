<template>
    <div>
        <contents-name name="ユーザ一覧"/>
        <div class="page">
            <div class="column-2">
                <div class="info">
                    <p>ユーザ数: 100</p>
                    <p>アクティグユーザ数: 100</p>
                    <p>アクティグユーザ数: 100</p>
                    <nuxt-link to="/management/user/invite">
                        <el-button icon="message" class="invite"></el-button>
                    </nuxt-link>
                </div>
                <div class="controller">
                    <el-form label-width="120px">
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
                                <el-option v-for="group in toValueFromGroups" :label="group.label" :value="group.value"
                                           :key="group.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="アクティブ">
                            <el-switch on-text="" off-text="" v-model="search.active"></el-switch>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="contents">
                <div v-if="displayUsers.length">
                    <div class="user-warp" v-for="user in displayUsers" :key="user.id">
                        <user-card :user="user" type="management"/>
                    </div>
                </div>
                <div v-else>
                    <div class="inner">
                        hoge
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import UserCard from '@/components/UserCard.vue'
  import ContentsName from '@/components/ContentsName.vue'
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
      ContentsName
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
          return fullName.indexOf(this.search.word) >= 0
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
      querySearch(queryString, cb) {
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
      handleSelect(user) {
        this.search.word = user.value
      }
    },
    async fetch({app, store}){
      if (!store.state.users) {
        const {data} = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
      if (!store.state.groups) {
        const {data} = await app.$http.get('/group')
        store.commit('SET_GROUPS', data.groups)
      }
    }
  }
</script>

<style scoped>
    .invite{
        margin-top:30px;
    }
    .info {
        border-radius: 2px;
        background-color: #fff;
        padding: 30px;
        margin-bottom: 10px;
        width: calc(100% - 10px - 380px);
        margin-right: 10px;
        display: inline-block;
        vertical-align: top;
        height: 200px;
        color: #48576a;
    }

    .controller {
        border-radius: 2px;
        background-color: #fff;
        padding: 23px 10px 2px;
        margin-bottom: 10px;
        width: 380px;
        display: inline-block;
        vertical-align: top;
    }

    .contents {
        border-radius: 2px;
        background-color: #fff;
        padding: 30px;
    }

    .user-warp {
        width: 32%;
        display: inline-block;
    }

    .user-warp:not(:nth-child(3n)) {
        margin-right: 2%;
    }

    @media screen and (max-width: 1440px) {
        .user-warp {
            width: 49%;
        }

        .user-warp:not(:nth-child(3n)) {
            margin-right: 0;
        }

        .user-warp:not(:nth-child(2n)) {
            margin-right: 2%;
        }
    }
</style>

