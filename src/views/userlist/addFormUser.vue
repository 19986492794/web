<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="min">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="初考/增驾" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择初考/增驾">
        <el-option label="初考" :value="1"></el-option>
        <el-option label="增驾" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="ruleForm.tell"></el-input>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="ruleForm.qq"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="ruleForm.remark"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      name: "addForm",
      props:{
        row:{
          type: Object
        }
      },
      data(){
        return{
          ruleForm:{
            name:'',
            type: 1,
            tell:'',
            qq:'',
            address:'',
            remark:''
          },
          rules:{
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            type: [
              { required: true, message: '请选择', trigger: 'change' }
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
          this.init();
        }
      }
    }
</script>

<style scoped>

</style>
