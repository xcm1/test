<template>
  <div class="app-container page-container">
    <div class="filter-container filter-container-flex">
      <div class="f-left">
        <el-select v-model="listQuery.quName" placeholder="区域" clearable style="width: 90px; margin-right:10px" class="filter-item">
          <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionName" />
        </el-select>
        <el-select v-model="listQuery.stateName" placeholder="区级考核" clearable style="width: 120px; margin-right:10px" class="filter-item">
          <el-option v-for="item in auditTypeList" :key="item.sysUserAuditStatusId" :label="item.sysUserAuditStatusName" :value="item.sysUserAuditStatusName" />
        </el-select>
        <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 200px; margin-right:10px" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          下载汇总表
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="handleDownload">
          下载打印表
        </el-button>
      </div>
      <div class="f-rihgt">
        <router-link to="/recycle/recycle" style="margin-right:10px"><el-button type="text" class="text-mini" icon="el-icon-delete-solid" style="color: #555">
          回收站
        </el-button></router-link>
        <el-button type="text" class="text-mini" icon="el-icon-s-tools" style="color: #555" @click="handleDialogVisibleTools">
          设置
        </el-button>
      </div>

    </div>
    <div class="top-head">
      <el-steps :active="state" process-status="wait">
        <el-step title="开始复检" :description="timeData.dxSjdKssj" />
        <el-step title="复检阶段" :description="timeData.dxSjdJdsj" />
        <el-step title="完成复检" :description="timeData.dxSjdWcsj" />
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
      <el-table-column label="年龄" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userIdentity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书编号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCertificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近三年学时" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userSumPeriod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="复检时间" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userRecheckTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区级考核" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.userStateId | statusFilter">
            {{ row.userState }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="text" size="mini" class="text-mini" style="color: #409EFF" @click="handleView(row)">
            查看信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-tool-footer">
      <el-checkbox v-model="checked" @change="changecheck">选择全部</el-checkbox>
      <el-button type="primary" icon="el-icon-download" style="margin-left:14px">下载</el-button>
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

          <el-form-item label="开始复检" required>
            <el-form-item prop="dxSjdKssj">
              <el-date-picker v-model="ruleForm.dxSjdKssj" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="复检阶段" required>
            <el-form-item prop="dxSjdJdsj">
              <el-date-picker v-model="ruleForm.dxSjdJdsj" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="完成复检" required>
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
import { apiSysRegionList, apiReviewAuditTypeList } from '@/api/common'
import { apiReviewAuditList, apiGetReviewAuditTime, apiUpdateReviewAuditTime } from '@/api/application'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import InfoView from './components/info-view-recheck.vue'

export default {
  name: 'Recheck',
  components: { Pagination, InfoView },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        14: 'success',
        11: 'info',
        12: 'danger',
        13: 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      timeData: {},
      auditTypeList: [], // 复检审核类型
      regionList: [], // 区域
      dialogVisibleTools: false,
      state: null,
      details: {},
      checked: false,
      tableKey: 0,
      list: null,
      total: 0,
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
    this.getReviewAuditTime()
    this.getSysRegionList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      apiReviewAuditList(this.listQuery).then(response => {
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
      apiReviewAuditTypeList().then(res => {
        console.log(res, '复检审核类型')
        this.auditTypeList = res.data
      })
    },
    getReviewAuditTime() {
      apiGetReviewAuditTime().then(res => {
        console.log(res, '查询复检面试时间段数据')
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
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
        .catch(() => {
        })
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
          apiUpdateReviewAuditTime(param).then(res => {
            console.log(res, '修改')
            if (res.success) {
              this.getReviewAuditTime()
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
