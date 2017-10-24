<template>
    <section>
        <contents-name name="ユーザ招待"></contents-name>
        <div class="invite-form">
            <el-form ref="form" label-width="150px">
                <el-form-item label="苗字" required>
                    <el-input placeholder="Please input" v-model="context.last_name"></el-input>
                </el-form-item>
                <el-form-item label="名前" required>
                    <el-input placeholder="Please input" v-model="context.first_name"></el-input>
                </el-form-item>
                <el-form-item label="苗字 (カナ)">
                    <el-input placeholder="Please input" v-model="context.last_name_kana"></el-input>
                </el-form-item>
                <el-form-item label="名前 (カナ)">
                    <el-input placeholder="Please input" v-model="context.first_name_kana"></el-input>
                </el-form-item>
                <el-form-item label="郵便番号">
                    <el-input placeholder="Please input" v-model="context.postal_code"></el-input>
                </el-form-item>
                <el-form-item label="住所">
                    <el-input placeholder="Please input" v-model="context.address"></el-input>
                </el-form-item>
                <el-form-item label="Eメール">
                    <el-input placeholder="Eメール" name="email" v-model="context.email"></el-input>
                </el-form-item>
                <el-form-item label="サムネイル">
                    <uploader :thumbnail="context.thumbnail" @uploaded="uploaded"></uploader>
                </el-form-item>
                <el-form-item label="生年月日">
                    <el-date-picker
                            v-model="context.birthday"
                            type="date"
                            placeholder="Please input">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性別" required>
                    <el-radio-group v-model="context.gender">
                        <el-radio label="male">男性</el-radio>
                        <el-radio label="female">女性</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="電話番号">
                    <el-input placeholder="Please input" v-model="context.tel"></el-input>
                </el-form-item>
                <el-form-item label="役職">
                    <el-input placeholder="Please input" v-model="context.position"></el-input>
                </el-form-item>
                <el-form-item label="グループ">
                    <el-select v-model="context.group_id" placeholder="Select">
                        <el-option
                                v-for="item in groups"
                                action="http://0.0.0.0:3333"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="パスワード">
                    <el-input placeholder="パスワード" v-model="context.password"></el-input>
                </el-form-item>
                <el-form-item label="マネージャフラグ">
                    <el-input placeholder="マネージャフラグ" v-model="context.manager_flag"></el-input>
                </el-form-item>
                <div class="invite-button">
                    <el-button @click="invite" type="primary">招待</el-button>
                </div>
            </el-form>
        </div>
    </section>
</template>
<script>
  import ContentsName from '~/components/ContentsName.vue'
  import Uploader from '~/components/Uploader.vue'
  import moment from 'moment'
  export default {
    components: {
      ContentsName,
      Uploader
    },
    async asyncData({app}){
      const {data} = await app.$http.get('group')
      const groups = data.groups.map((group) => {
        return {value: group.id, label: group.name}
      })
      return {groups: groups}
    },
    data() {
      return {
        context: {
          "last_name": "山田",
          "first_name": "太郎",
          "last_name_kana": "ヤマダ",
          "first_name_kana": "タロウ",
          "email": "mailsend.manager@gmail.com",
          "gender": "male",
          "manager_flag": "normal",
          "password": "pw",
          "postal_code": "000-0000",
          "address": "大阪府大阪市ほげほげ町",
          "thumbnail": "",
          "tel": "123-4567",
          "position": "係長",
          "group_id": "",
          "birthday": ""
        },
        isSend: false
      }
    },
    methods: {
      async invite(){
        if (!this.isSend) {
          this.isSend = true;
          this.$store.commit('SET_IS_LOADING', true)
          this.context.birthday = this.birthdayFormat(this.context.birthday)
          const {data} = await this.$http.post('/manager/invite', this.context).catch(err => {
            if (err.response.data.message === 'overlapping') {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('このEmailアドレスはすでに登録されています。')
              return
            }
            if (!err.response.data.success) {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('招待メールの送信に失敗しました')
            }
          })
          if (data.success) {
            this.isSend = false;
            this.clear();
            this.$store.commit('SET_IS_LOADING', false)
            this.$notify.success('招待メールの送信が完了しました')
          }
        }
      },
      birthdayFormat(birthday){
        return moment(birthday).format("YYYY-MM-DD")
      },
      clear(){
        this.context.last_name = ""
        this.context.first_name = ""
        this.context.last_name_kana = ""
        this.context.first_name_kana = ""
        this.context.email = ""
        this.context.gender = ""
        this.context.manager_flag = ""
        this.context.password = ""
        this.context.postal_code = ""
        this.context.address = ""
        this.context.thumbnail = ""
        this.context.tel = ""
        this.context.position = ""
        this.context.group_id = ""
        this.context.birthday = ""
      },
      handleAvatarSuccess(res, file) {
        this.context.thumbnail = res.dataUrl
        this.$store.commit('SET_IS_LOADING', false)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        this.$store.commit('SET_IS_LOADING', true)
        return isJPG && isLt2M;
      },
      uploaded(dataUrl){
        this.context.thumbnail = dataUrl
      }
    }
  }
</script>

<style scoped>
    .invite-form {
        margin: 0 auto;
        width: 100%;
        position: relative;
        background: #fff;
        box-sizing: border-box;
    }

    .el-form {
        padding: 30px 20px;
    }

    .invite-button {
        margin-left: calc(100% - 60px);
    }
</style>
