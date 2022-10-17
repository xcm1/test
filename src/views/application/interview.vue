<template>
  <div class="app-container page-container">
    <div class="filter-container filter-container-flex">
      <div class="f-left">
        <el-select v-model="listQuery.quName" placeholder="区域" clearable style="width: 90px; margin-right:10px" class="filter-item">
          <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionName" />
        </el-select>
        <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 200px; margin-right:10px" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          下载数据表
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="handleDownload">
          批量导入
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="success" icon="el-icon-postcard" @click="pushExaminee">
          发布准考证
        </el-button>
      </div>
      <div class="f-rihgt">
        <el-button type="text" class="text-mini" icon="el-icon-time" style="color: #555">
          历史数据
        </el-button>
        <router-link to="/recycle/recycle" style="margin-right:10px; margin-left:10px"><el-button type="text" class="text-mini" icon="el-icon-delete-solid" style="color: #555">
          回收站
        </el-button></router-link>
        <el-button type="text" class="text-mini" icon="el-icon-s-tools" style="color: #555" @click="handleDialogVisibleTools">
          设置
        </el-button>
      </div>

    </div>
    <div class="top-head">
      <el-steps :active="state" process-status="wait">
        <el-step title="开始考核" :description="timeData.dxSjdKssj" />
        <el-step title="考核阶段" :description="timeData.dxSjdJdsj" />
        <el-step title="完成考核" :description="timeData.dxSjdWcsj" />
      </el-steps>
    </div>
    <el-table
      ref="multipleTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" align="center" width="50" />
      <el-table-column label="ID" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userSex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作区域" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userJobQy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="准考证号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zkzBh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考场号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zkzKch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="笔试成绩" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cjBscj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机试成绩" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cjJscj }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="140" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="mini" class="text-mini" style="color: #409EFF" @click="handleView(row)">
            查看信息
          </el-button>
          <el-button size="mini" type="text" class="text-mini" style="color: #F56C6C" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-tool-footer">
      <el-checkbox v-model="checked" @change="changecheck">选择全部</el-checkbox>
      <el-button type="primary" icon="el-icon-download" style="margin-left:14px">下载</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="handleDeleteBath">删除</el-button>
      <div style="margin-left:200px; display: inline-block;">
        <el-button type="primary" size="mini" icon="el-icon-upload">成绩批量上传</el-button>
        <el-button type="primary" size="mini" icon="el-icon-download">下载成绩上传模板</el-button>
      </div>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    <!--设置弹窗-->
    <el-dialog
      title="设置"
      :visible.sync="dialogVisibleTools"
      width="600px"
      custom-class="line-dialog"
      :append-to-body="true"
    >
      <div class="card-wrap">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

          <el-form-item label="开始考核" required>
            <el-form-item prop="dxSjdKssj">
              <el-date-picker v-model="ruleForm.dxSjdKssj" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="考核阶段" required>
            <el-form-item prop="dxSjdJdsj">
              <el-date-picker v-model="ruleForm.dxSjdJdsj" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="完成考核" required>
            <el-form-item prop="dxSjdWcsj">
              <el-date-picker v-model="ruleForm.dxSjdWcsj" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogVisibleTools = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
    <!--信息详细弹窗-->
    <info-view ref="dialogView" :details="details" />
  </div>
</template>

<script>
import { apiSysRegionList, apiDeleteUser, apiDeleteUserBath } from '@/api/common'
import { apiTestInterviewList, apiGetInterviewTime, apiUpdateInterviewTime } from '@/api/application'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import InfoView from './components/info-view-interview.vue'

export default {
  name: 'Interview',
  components: { Pagination, InfoView },
  directives: { waves },
  filters: {

  },
  data() {
    return {
      timeData: {},
      regionList: [], // 区域
      dialogVisibleTools: false,
      state: null,
      details: {},
      checked: false,
      tableKey: 0,
      list: null,
      total: 0,
      multipleSelection: [],
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        'keyword': '',
        'quName': '',
        'stateName': '',
        'year': ''
      },
      importanceOptions: [1, 2, 3],
      downloadLoading: false,
      ruleForm: {
        dxSjdKssj: '',
        dxSjdJdsj: '',
        dxSjdWcsj: ''
      },
      rules: {
        dxSjdKssj: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        dxSjdJdsj: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        dxSjdWcsj: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getInterviewTime()
    this.getSysRegionList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      apiTestInterviewList(this.listQuery).then(response => {
        console.log(response, 'list')
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 查询所有区
    getSysRegionList() {
      apiSysRegionList().then(res => {
        console.log(res, '查询所有区')
        this.regionList = res.data
      })
    },
    getInterviewTime() {
      apiGetInterviewTime().then(res => {
        console.log(res, '查询考核面试时间段数据')
        this.timeData = res.data
        this.ruleForm = { ...this.timeData }
        this.state = res.data.integer
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 查看
    handleView(row) {
      this.details = Object.assign({}, row)
      this.$refs.dialogView.dialogVisible = true

      //

      // this.temp = Object.assign({}, row)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleDelete(row, index) {
      // 确认删除
      this.$prompt('请输入删除原因', '确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(({ value }) => {
        const param = {
          'integer': row.id,
          'userDeleteCause': value
        }
        console.log(param)
        apiDeleteUser(param).then(res => {
          console.log(res, '删除')
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        })
      }).catch(() => {

      })
    },
    // 批量删除
    handleDeleteBath() {
      if (this.multipleSelection.length > 0) {
        console.log('批量删除')
        const ids = this.multipleSelection.map(item => {
          return item.id
        })
        console.log(ids, '222')
        this.$prompt('请输入删除原因', '确定批量删除?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(({ value }) => {
          const param = {
            'integers': ids,
            'userDeleteCause': value
          }
          console.log(param)
          apiDeleteUserBath(param).then(res => {
            console.log(res, '删除')
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        }).catch(() => {

        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择'
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // 发布准考证
    pushExaminee() {
      this.$confirm('确定发布准考证?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '发布成功',
          type: 'success',
          duration: 2000
        })
      })
        .catch(() => {
        })
    },
    changecheck(val) {
      if (val) {
        this.$refs.multipleTable.toggleAllSelection()
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            'dxSjdId': this.ruleForm.dxSjdId,
            'dxSjdJdsj': parseTime(this.ruleForm.dxSjdJdsj, '{y}-{m}-{d}'),
            'dxSjdKssj': parseTime(this.ruleForm.dxSjdKssj, '{y}-{m}-{d}'),
            'dxSjdWcsj': parseTime(this.ruleForm.dxSjdWcsj, '{y}-{m}-{d}')
          }
          apiUpdateInterviewTime(param).then(res => {
            console.log(res, '修改')
            if (res.success) {
              this.getInterviewTime()
              this.dialogVisibleTools = false
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDialogVisibleTools() {
      // this.$refs.ruleForm.resetFields()
      this.dialogVisibleTools = true
      // this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  background-color: #fff;
  .top-head {
    padding: 10px 40px;
  }
}
</style>
