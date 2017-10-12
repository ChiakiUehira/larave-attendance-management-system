<template>
  <div>
    <contents-name name="ユーザ一覧" />
    <div class="page">
      <div class="column-2">
        <div class="info">
          <p>ユーザ数: 100</p>
          <p>アクティグユーザ数: 100</p>
          <p>アクティグユーザ数: 100</p>
        </div>
        <div class="controller">
          <el-form label-width="120px">
            <el-form-item label="ユーザ検索">
              <el-autocomplete
                class="inline-input"
                v-model="searchWord"
                :fetch-suggestions="querySearch"
                placeholder="name"
                :trigger-on-focus="false"
                @select="handleSelect"
                icon="search"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="contents">
        <div class="column-3" v-for="user in displayUsers" :key="user.id">
          <user-card :user="user" />
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
        searchWord: ''
      }
    },
    components: {
      UserCard,
      ContentsName
    },
    computed: {
      Users () {
        return this.$store.state.users
      },
      displayUsers () {
        const users = this.$store.state.users
        if (!this.searchWord) {
          return users
        }
        return users.filter((user) => {
          const fullName = this.fullName(user.first_name, user.last_name)
          return fullName.indexOf(this.searchWord) >= 0
        })
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
      fullName (first,last) {
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
        this.searchWord = user.value
      }
    },
    async fetch({app,store}){
      if (!store.state.users) {
        const { data } = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
    }
  }
</script>

<style scoped>
  .info {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 10px;
    width: calc(70% - 10px);
    margin-right: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .controller {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 10px;
    width: 30%;
    display: inline-block;
    vertical-align: top;
  }
  .contents {
    border-radius: 2px;
    background-color: #fff;
    padding: 30px;
  }
  .column-3 {
    width: 32%;
    display: inline-block;
  }
  .column-3:not(:nth-child(3n)) {
    margin-right: 2%;
  }
</style>

