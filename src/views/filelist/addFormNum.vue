<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="min">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="编号" prop="file_number">
      <el-input v-model="ruleForm.file_number"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="ruleForm.remark"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      name: "addFormNum",
      props:{
        row:{
          type: Object
        }
      },
      data(){
        return{
          ruleForm:{
            name:'',
            file_number:'',
            remark:''
          },
          rules:{
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            file_number: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 10, max: 12, message: '长度在 10 到 12 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        submitForm(callback) {
          this.$refs['ruleForm'].validate((valid) => {
            callback(valid);
          });
        },
        resetForm() {
          this.$refs['ruleForm'].resetFields();
        },
        init(){
          this.ruleForm = Object.assign({}, this.row);
        }
      },
      mounted(){
        if(this.row){
          this.init()
        }
      }
    }
</script>

<style scoped>

</style>
