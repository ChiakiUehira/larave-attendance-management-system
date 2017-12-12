<template>
  <div class="invite-form">
      <el-form-item label="苗字" required>
        <el-input placeholder="Please input" v-model="context.last_name"></el-input>
      </el-form-item>
      <el-form-item label="名前" required>
        <el-input placeholder="Please input" v-model="context.first_name"></el-input>
      </el-form-item>
      <el-form-item label="Eメール" required>
        <el-input placeholder="Eメール" name="email" v-model="context.email"></el-input>
      </el-form-item>
      <el-form-item label="役職">
        <el-input placeholder="Please input" v-model="context.position"></el-input>
      </el-form-item>
      <el-form-item label="グループ" required>
        <el-select v-model="context.group_id" placeholder="Select">
          <el-option
              v-for="item in groups"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="マネージャ権限" required>
        <el-radio-group v-model="context.manager_flag">
          <el-radio label="manager">あり</el-radio>
          <el-radio label="normal">なし</el-radio>
        </el-radio-group>
      </el-form-item>
  </div>
</template>

<script>
  export default{
    props:{
      groups:{
        type: Array
      },
      context:{
        type: Object
      }
    }
  }
</script>

<style scoped>
  .invite-form {
    background: #fff;
    box-sizing: border-box;
  }
</style>