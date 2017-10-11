<template>
  <div>
    <contents-name name="ユーザ一覧" />
    <div class="page">
      <div class="controller">
        <!-- <el-form ref="form" label-width="120px">
          <el-form-item label="Activity zone">
            <el-select placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
      </div>
      <div class="contents">
        <div class="column-3" v-for="user in users" :key="user.id">
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
    components: {
      UserCard,
      ContentsName
    },
    computed: {
      users () {
        return this.$store.state.users
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
  .page {
    background-color: #fff;
    border-radius: 2px;
  }

  .contents {
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

