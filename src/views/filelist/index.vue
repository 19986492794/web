<template>
  <div class="dashboard-container">
    <div>
      <el-button type="primary" size="small" @click="addFileNum(true, null)">新增档案</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 160px)">
      <el-table-column
        prop="create_time"
        label="日期">
        <template slot-scope="scope">
          {{parseTimes(scope.row.create_time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="file_number"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="edit_time"
        label="编辑日期">
        <template slot-scope="scope">
          {{parseTimes(scope.row.edit_time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
        :page-sizes="[2, 10, 20, 30, 40, 50]"
        :page-size="reqBase.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      :title="addObj.row?'编辑':'新增'"
      :visible.sync="addObj.addShow"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <addForm ref="addForm" v-if="addObj.addShow" :row="addObj.row"></addForm>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFileNum(false, null)">取 消</el-button>
        <el-button size="small" type="primary" @click="submitFileNum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addForm from './addFormNum';
import {parseTime} from '@/utils'
export default {
  name: 'filelist',
  props: {},
  components:{ addForm },
  data() {
    return {
      tableData: [],
      total: 0,
      // currentPage: 1,
      reqBase: {
        pageSize: 10,
        pageIndex: 1
      },
      addObj:{
        row: null,
        addShow: false
      }
    }
  },
  methods: {
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
    // 编辑
    editRow(index, row) {
      // console.log('编辑');
      this.addFileNum(true, row);

    },
    // 删除
    deleteRow(index, row) {
      // console.log('删除');
      const vm = this;
      this.$confirm(`确认删除${row.name}？`).then(() => {
          vm.$store.dispatch('lists/delFileNumf', {bid: row.bid}).then((res) => {
            if(res.status === 200){
              vm.$message.success(res.msg || '删除成功');
              vm.getList();
            }else {
            }
          })
        }).catch(() => {});
    },
    // 显示条数改变
    handleSizeChange(index) {
      this.reqBase.pageSize = index;
      this.getList();
    },
    // 翻页
    handleCurrentChange(index) {
      this.getList();
    },
    getList(){
      let params = this.reqBase;
      this.$store.dispatch('lists/getFileNumf', params).then((res) => {
        if(res.status === 200){
          this.tableData = res.data;
          this.total = res.total;
        }else {
          this.tableData = [];
        }
      })
    },
    addFileNum(type=false, row=null){
      this.addObj.row = row?Object.assign({}, row):row;
      this.addObj.addShow = type;
    },
    handleClose(){
      this.addFileNum(false, null);
    },
    submitFileNum(){
      let obj = this.$refs.addForm,
          params = obj.ruleForm;
      obj.submitForm(valid=>{
        if(valid){
          if(this.addObj.row){
            this.$store.dispatch('lists/editFileNumf', params).then((res) => {
              if(res.status === 200){
                this.$message.success(res.msg || '编辑成功');
                this.addFileNum(false, null);
                this.getList();
              }else {
              }
            })
          }else {
            this.$store.dispatch('lists/addFileNumf', params).then((res) => {
              if(res.status === 200){
                this.$message.success(res.msg || '新增成功');
                this.addFileNum(false, null);
                this.getList();
              }else {
              }
            })
          }
        }
      })
    }
  },
  created() {
  },
  mounted() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    /*margin: 30px;*/
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.footer{
  width: 100%;
  text-align: right;
  padding-top: 15px;
}
</style>
