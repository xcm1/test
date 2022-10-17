<template>
  <div class="app-container page-container">
    <div class="filter-container filter-container-flex">
      <div class="f-left">
        <el-select v-model="listQuery.quName" placeholder="区域" clearable style="width: 90px; margin-right:10px" class="filter-item">
          <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionName" />
        </el-select>
        <el-select v-model="listQuery.stateId" placeholder="类别" clearable class="filter-item" style="width: 130px; margin-right:10px">
          <el-option v-for="item in superintendentList" :key="item.sysSupervisionClassId" :label="item.sysSupervisionClassName" :value="item.sysSupervisionClassId" />
        </el-select>
        <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 200px; margin-right:10px" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          下载汇总表
        </el-button>
      </div>
      <div class="f-rihgt">
        <router-link to="/recycle/recycle" style="margin-right:10px"><el-button type="text" class="text-mini" icon="el-icon-delete-solid" style="color: #555">
          回收站
        </el-button></router-link>
        <el-button type="text" class="text-mini" icon="el-icon-s-tools" style="color: #555">
          设置
        </el-button>
      </div>

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
      <el-table-column label="ID" width="110px" align="center">
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
      <el-table-column label="督学类别" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCategory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书编号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCertificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userRegister | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="复检时间" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userRecheckTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="text" size="mini" class="text-mini" style="color: #409EFF" @click="handleView(row)">
            查看信息
          </el-button>
          <el-button size="mini" type="text" class="text-mini" style="color: #67C23A" @click="handleUpdate(row)">
            编辑
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
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    <!--信息详细弹窗-->
    <info-view ref="dialogView" :details="details" />
    <!--信息详细弹窗-->
    <info-edit ref="dialogEdit" :details="details" />
  </div>
</template>

<script>
import { apiSysRegionList, apiSuperintendentListCategoryList, apiDeleteUser, apiDeleteUserBath } from '@/api/common'
import { apiSuperintendentList } from '@/api/superintendent'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import InfoView from './info-view.vue'
import InfoEdit from './info-edit.vue'

export default {
  name: 'Superintendent',
  components: { Pagination, InfoView, InfoEdit },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      regionList: [], // 区域
      superintendentList: [], // 督学类别
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
        'stateId': undefined,
        'year': ''
      },
      importanceOptions: [1, 2, 3],
      downloadLoading: false
    }
  },
  created() {
    this.getSysRegionList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      apiSuperintendentList(this.listQuery).then(response => {
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
      apiSuperintendentListCategoryList().then(res => {
        console.log(res, '督学类别')
        this.superintendentList = res.data
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 修改
    handleUpdate(row) {
      this.details = Object.assign({}, row)
      this.$refs.dialogEdit.dialogVisible = true
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
    changecheck(val) {
      if (val) {
        this.$refs.multipleTable.toggleAllSelection()
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  background-color: #fff;
}
</style>
