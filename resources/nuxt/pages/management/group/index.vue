<template>
    <div>
        <contents-name>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/company'}">企業詳細</el-breadcrumb-item>
                <el-breadcrumb-item>グループ管理</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>

        <div class="groups">
            <div class="group">
                <el-tag class="group-elm"
                        :key="group.id"
                        v-for="(group,index) in groups"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(index)"
                >
                    {{group.name}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新しく作る</el-button>
            </div>
        </div>

        <div class="users">
            <div class="search">
                <el-select v-model="search.group" placeholder="グループ">
                    <el-option label="選択なし" value=""></el-option>
                    <el-option v-for="group in toValueFromGroups" :label="group.label"
                               :value="group.value"
                               :key="group.id">
                    </el-option>
                </el-select>
            </div>
            <div v-for="user in displayUsers" :key="user.id" class="user-wrap">
                <user-card :user="user"></user-card>
            </div>
        </div>
    </div>
</template>

<script>
  import ContentsName from '~/components/ContentsName.vue'
  import UserCard from '~/components/UserCard.vue'
  export default{
    async fetch ({app, store}){
      const {data} = await app.$http.get('group')
      const obj = await app.$http.get('user')
      store.commit('SET_GROUPS', data.groups)
      store.commit('SET_USERS', obj.data.users)
    },
    computed: {
      groups(){
        return this.$store.state.groups
      },
      users(){
        return this.$store.state.users
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
      displayUsers () {
        let users = this.$store.state.users

        users = users.filter((user) => {
          return this.search.group ? user.group.id === this.search.group : true
        })

        return users
      }
    },
    data(){
      return {
        inputVisible: false,
        inputValue: '',
        search: {
          group: ''
        }
      }
    },
    components: {
      ContentsName,
      UserCard
    },
    methods: {
      handleClose(tag) {
        this.$store.commit('REMOVE_GROUP', tag)
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.$store.commit('UPDATE_GROUPS', {
            company_id: 1,
            created_at: "2017-10-28 01:55:15",
            deleted_at: null,
            detail: "",
            id: 5,
            name: "営業部",
            updated_at: "2017-10-28 01:55:15",
          });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>
    .groups {
        background: #fff;
        padding: 20px;
        margin-bottom: 10px;
    }

    .group {
        width: 70%;
        margin: 0 auto;
    }

    .group-elm {
        /*width: 32%;*/
        /*margin-left:2%;*/
        /*display: inline-block;*/
        /*text-align: center;*/
        /*margin-bottom:10px;*/
    }

    .el-tag {
        margin-left: 10px;
        margin-bottom: 5px;
        margin-top: 5px;
        height: auto;
        line-height: normal;
        font-size: 14px;
        padding: 10px;
        background: #2E3B4C;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: 10px;
        margin-top:10px;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        margin-top:10px;
    }

    .search{
        margin-bottom:20px;
        /*margin-right:auto;*/
        margin-left:auto;
        width:20%;
    }

    .users {
        padding: 30px;
        background: #fff;
    }

    .user-wrap {
        display: inline-block;
        width: 49%;
    }

    .user-wrap:nth-child(odd) {
        margin-left:2%;
    }
</style>

