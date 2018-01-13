<template>
  <section>
    <contents-name name="ユーザ招待">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/user/'}">ユーザ一覧</el-breadcrumb-item>
        <el-breadcrumb-item>ユーザ招待</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>

    <div class="invite-wrapper">
      <el-form ref="form" label-width="150px" class="invite-form">
        <div class="collapse-bg">
          <el-collapse value="1" v-for="i in formQuantity" :key="i" class="collapse">
            <el-collapse-item title="招待フォーム" :name="String(i)">
              <invite-form :groups="groups" :context="forms[i - 1]"></invite-form>
              <el-button @click="deleteForm(i - 1)" icon="el-icon-delete" class="form-close" type="danger"></el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-form>
    </div>
    <div class="btns">
      <el-button @click="addForm" type="primary" class="add-form">フォーム追加</el-button>
      <el-button @click="invite" type="primary" class="invite-button">招待</el-button>
    </div>
  </section>
</template>
<script>
  import ContentsName from '~/components/ContentsName.vue'
  import InviteForm from '~/components/InviteForm.vue'
  import moment from 'moment'
  export default {
    components: {
      ContentsName,
      InviteForm
    },
    async asyncData ({app}) {
      const {data} = await app.$http.get('group')
      const groups = data.groups.map((group) => {
        return {value: group.id, label: group.name}
      })
      return {groups}
    },
    data(){
      return {
        isSend: false,
        formQuantity: 1,
        context: {
          'last_name': '',
          'first_name': '',
          'email': 'mailsend.manager@gmail.com',
          'manager_flag': '',
          'position': '',
          'group_id': ''
        },
        forms: []
      }
    },
    created(){
      this.formInit()
    },
    methods: {
      formInit(){
        this.formQuantity = 1
        this.forms = []
        this.forms.push(JSON.parse(JSON.stringify(this.context)))
      },
      addForm(){
        this.formQuantity += 1
        this.forms.push(JSON.parse(JSON.stringify(this.context)))
      },
      deleteForm(index){
        this.formQuantity -= 1
        this.forms.splice(index, 1)
      },
      async invite () {
        if (!this.isSend) {
          this.isSend = true
          this.$store.commit('SET_IS_LOADING', true)
          const {data} = await this.$http.post('/manager/invite', this.users).catch(err => {
            if (!err.response.data.success) {
              this.isSend = false
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error(err.response.data.message)
            }
          })
          if (data.success) {
            this.isSend = false
            this.formInit()
            const {data} = await this.$http.get('/manager/invite')
            this.$store.commit('SET_INVITING_USERS', data.users)
            this.$store.commit('SET_IS_LOADING', false)
            this.$notify.success('招待メールの送信が完了しました')
          }
        }
      }
    }
  }
</script>

<style scoped>
  .invite-button {
    margin-left: 10px;
  }

  .collapse-bg{
    background: #fff;
    padding:40px;
  }
  .collapse {
    margin-bottom: 10px;
  }

  .collapse:last-child {
    margin: 0;
  }

  .form-close {
    display: block;
    margin-left: auto;
  }

  .btns {
    margin-top: 10px;
    background: #fff;
    padding: 10px;
    text-align: right;
  }
</style>