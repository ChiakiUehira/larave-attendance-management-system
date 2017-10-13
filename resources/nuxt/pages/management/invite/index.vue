<template>
    <section>
        <div class="invite-form">
            <table>
                <tr>
                    <th>苗字</th>
                    <td>
                        <el-input placeholder="苗字" v-model="context.last_name"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>名前</th>
                    <td>
                        <el-input placeholder="名前" v-model="context.first_name"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>苗字（カナ）</th>
                    <td>
                        <el-input placeholder="苗字（カナ）" v-model="context.last_name_kana"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>名前（カナ）</th>
                    <td>
                        <el-input placeholder="名前（カナ）" v-model="context.first_name_kana"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>Eメール</th>
                    <td>
                        <el-input placeholder="Eメール" v-model="context.email"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>性別</th>
                    <td>
                        <el-radio class="radio" v-model="context.gender" label="male">男性</el-radio>
                        <el-radio class="radio" v-model="context.gender" label="female">女性</el-radio>
                    </td>
                </tr>
                <tr>
                    <th>給与</th>
                    <td>
                        <el-input placeholder="給与" v-model="context.salary"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>マネージャフラグ</th>
                    <td>
                        <el-input placeholder="マネージャフラグ" v-model="context.manager_flag"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>給与タイプ</th>
                    <td>
                        <el-select placeholder="給与タイプ" v-model="context.salary_type">
                            <el-option
                                    v-for="salary in options.salary"
                                    :key="salary.value"
                                    :label="salary.label"
                                    :value="salary.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="invite-button">
                <el-button @click="invite">招待</el-button>
            </div>
        </div>
    </section>
</template>
<script>
  export default {
    data() {
      return {
        context: {
          "last_name": "山田",
          "first_name": "太郎",
          "last_name_kana": "ヤマダ",
          "first_name_kana": "タロウ",
          "email": "mailsend.manager@gmail.com",
          "gender": "male",
          "salary": "10000",
          "manager_flag": "normal",
          "salary_type": "monthly"
        },
        options: {
          salary: [{
            value: 'Option1',
            label: '分給'
          }, {
            value: 'Option2',
            label: '日給'
          }, {
            value: 'monthly',
            label: '月給'
          }]
        },
        isSend: false
      }
    },
    methods: {
      async invite(){
        if (!this.isSend) {
          this.isSend = true;
          const {data} = await this.$http.post('/manager/invite', this.context).catch(err => {
            if (err.response.data.message === 'overlapping') {
              this.isSend = false;
              this.$notify.error('このEmailアドレスはすでに登録されています。')
              return
            }
            if (!err.response.data.success) {
              this.isSend = false;
              this.$notify.error('招待メールの送信に失敗しました')
            }
          })
          if (data.success) {
            this.isSend = false;
            this.clear();
            this.$notify.success('招待メールの送信が完了しました')
          }
        }
      },
      clear(){
        this.context.last_name = "";
        this.context.first_name = "";
        this.context.last_name_kana = "";
        this.context.first_name_kana = "";
        this.context.email = "";
        this.context.gender = "";
        this.context.salary = "";
        this.context.manager_flag = "";
        this.context.salary_type = ""
      }
    }
  }
</script>

<style scoped>
    .invite-form {
        margin: 0 auto;
        width: 80%;
        padding: 40px 120px;
        position: relative;
    }

    .invite-form table {
        width: 100%;
    }

    .invite-form table th {
        border: 1px solid #d1dbe5;
        width: 20%;
    }

    .invite-form table td {
        padding: 15px;
        border: 1px solid #d1dbe5;
        width: 80%;
    }

    .invite-button {
        margin-top: 20px;
        margin-left: 90%;
    }
</style>