<template>
  <div class="userClass">
    <div>
      <el-button type="primary" size="small" @click="editRow(true, null)">新增名单</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 160px)">
      <el-table-column
        prop="create_time"
        label="日期"
        width="150">
        <template slot-scope="scope">
          {{parseTimes(scope.row.create_time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tell"
        label="电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="120">
        <template slot-scope="scope">
          {{ getType(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="edit_time"
        width="150"
        label="编辑时间">
        <template slot-scope="scope">
          {{parseTimes(scope.row.edit_time)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(true, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="reqBase.pageIndex"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="reqBase.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      :title="editData.row?'编辑':'新增'"
      :visible.sync="editData.show"
      width="600px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <addFormUser ref="addFormUser" v-if="editData.show" :row="editData.row"></addFormUser>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editRow(false, null)">取 消</el-button>
        <el-button size="small" type="primary" @click="submitUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import addFormUser from './addFormUser'
export default {
  name: 'userlist',
  components:{ addFormUser },
  data() {
    return {
      tableData: [],
      total: 0,
      reqBase:{
        pageSize:10,
        pageIndex:1
      },
      editData:{
        row: null,
        show: false
      }
    }
  },
  methods: {
    getType({type}){
      switch (type){
        case 1:
          return '初试';
        case 2:
          return '增驾';
        default:
          break;
      }
    },
    // 时间转换
    parseTimes(dates, format='{y}-{m}-{d} {h}:{i}:{s}'){
      let time = '';
      if(dates){
        let date = new Date(dates);
        const formatObj = {
          y: date.getFullYear(),
          m: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          i: date.getMinutes(),
          s: date.getSeconds(),
          a: date.getDay()
        };
        time = format.replace(/{([ymdhisa])+}/g, (result, key) => {
          const value = formatObj[key]
          if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
          return value.toString().padStart(2, '0')
        })
      }
      return time;
    },
    handleClose(){
      this.editRow(false, null);
    },
    // 新增、编辑
    editRow(type, row) {
      this.editData.row = row?Object.assign({}, row):row;
      this.editData.show = type;
    },
    // 删除
    deleteRow(row) {
      const vm = this;
      this.$confirm(`确认删除${row.name}？`).then(() => {
        vm.$store.dispatch('lists/delUsers', {id: row.id}).then((res) => {
          if(res.status === 200){
            vm.$message.success(res.msg || '删除成功');
            vm.getList();
          }else {
          }
        })
      }).catch(() => {});
    },
    // 显示条数改变
    handleSizeChange(size) {
      this.reqBase.pageSize = size;
      this.getList();
    },
    // 翻页
    handleCurrentChange(index) {
      this.reqBase.pageIndex = index;
      this.getList();
    },
    getList(){
      let params = this.reqBase;
      this.$store.dispatch('lists/getUsers', params).then((res) => {
        if(res.status === 200){
          this.tableData = res.data;
          this.total = res.total;
        }else {
          this.tableData = [];
        }
      })
    },
    submitUser(){
      const vm = this;
      let obj = this.$refs.addFormUser,
        params = obj.ruleForm;
      vm.$refs.addFormUser.submitForm(valid => {
        if(valid){
          if(vm.editData.row){
            vm.$store.dispatch('lists/editUsers', params).then((res) => {
              if(res.status === 200){
                vm.$message.success(res.msg || '编辑成功');
                vm.editRow(false, null);
                vm.getList();
              }else {
                vm.editRow(false, null);
                vm.$message.error(res.msg || '编辑失败');
              }
            })
          }else {
            vm.$store.dispatch('lists/addUsers', params).then((res) => {
              if(res.status === 200){
                vm.$message.success(res.msg || '新增成功');
                vm.editRow(false, null);
                vm.getList();
              }else {
                vm.editRow(false, null);
                vm.$message.error(res.msg || '新增失败');
              }
            })
          }
        }
      })
    },
    init(){
      this.getList();
    }
  },
  created() {
    this.init();
  },
  mounted() {
  }
}
</script>

<style scoped>
.userClass{

}
.footer{
  width: 100%;
  text-align: right;
  padding-top: 15px;
}
</style>
