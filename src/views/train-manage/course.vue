<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="value" clearable class="filter-item" style="margin-right:14px;width:140px" placeholder="区域">
        <el-option
          v-for="item in options"
          :key="item.sysRegionId"
          :label="item.sysRegionName"
          :value="item.sysRegionName"
        />
      </el-select>
      <el-select v-model="sysPxAuditStatusName" clearable class="filter-item" style="margin-right:14px;width:140px" placeholder="状态">
        <el-option
          v-for="item in optionst"
          :key="item.sysPxAuditStatusId"
          :label="item.sysPxAuditStatusName"
          :value="item.sysPxAuditStatusName"
        />
      </el-select>
      <el-input v-model="input" placeholder="请输入" clearable style="width: 200px;" class="filter-item" />
      <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-left:14px" @click="totaldownloads"><i class="el-icon-download" />下载汇总表</el-button>
      <el-button class="filter-item" type="success" style="margin-left:14px" @click="dialogshow()"><i class="el-icon-folder-add" />创建培训课程</el-button>
      <div class="tongji">
        <span class="filter-item"><i class="el-icon-setting" />设置</span>
      </div>
      <div class="tongji">
        <router-link to="/recycle/recycle" style="margin-left:10px"><span class="filter-item"><i class="el-icon-delete" />回收站</span></router-link>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      :header-cell-style="{
        'background': 'rgb(249, 249, 249)',
        border: '1px solid rgb(234, 234, 234)'
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="培训课程名称" align="center" width="360px">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcBt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcKssj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcJssj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学时" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcKcxs }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quNames }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcPxjbName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.stateId | statusFilter">
            {{ row.stateId | statusTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span v-if="row.stateId === 4" class="look" @click="handleUpdatefouet(row)">查看信息</span>
          <span v-else-if="row.stateId === 1" class="look" @click="handleUpdate(row)">查看信息</span>
          <span v-else-if="row.stateId === 2" class="look" @click="handleUpdatefoue(row)">查看信息</span>
          <span v-else-if="row.stateId === 5" class="look" @click="handleUpdatewo(row)">查看信息</span>
          <span v-else-if="row.stateId === 3" class="look" @click="handleUpdateh(row)">查看信息</span>
          <span v-else-if="row.stateId === 6" class="look" @click="handleUpdatewo(row)">查看信息</span>
          <span class="recovery" @click="delcourse(row.id)"> 删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-checkbox v-model="checked" @change="changecheck">选择全部</el-checkbox>
      <el-button type="primary" style="margin-left:14px" @click="download"><i class="el-icon-download el-icon--right" />下载</el-button>
      <el-button type="danger" @click="delcourseall()"><i class="el-icon-delete el-icon--right" />删除</el-button>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <Createcourse ref="childt" :dialog-visible="dialogVisible" :dialog-visibletwo="dialogVisibletwo" :detail="detail" @getData="getDatat" />
    <Coursedetails ref="childh" :dialog-visiblethree="dialogVisiblethree" :dialog-visiblefour="dialogVisiblefour" :detail="detail" @getData="getDatat" />
    <Coursestatistics ref="child" :dialog-visiblefive="dialogVisiblefive" :detail="detail" :dialist="diaList" />
  </div>
</template>

<script>
import { selectDxPxkcPageAdministration, auditStatusStates, sysRegionList, deletet, deleteBath, statisticSign } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Createcourse from '@/components/recyTable/createCourse'
import Coursedetails from '@/components/recyTable/courseDetails'
import Coursestatistics from '@/components/recyTable/courseStatistics'
export default {
  name: 'ComplexTable',
  components: { Pagination, Createcourse, Coursedetails, Coursestatistics },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        2: 'danger',
        3: 'danger',
        4: 'danger',
        5: 'success',
        6: 'info'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        1: '未审核',
        2: '不通过',
        3: '退回修改',
        4: '未开始',
        5: '进行中',
        6: '已结束'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      diaList: [],
      detail: {},
      input: '',
      list: null,
      total: 0,
      listLoading: true,
      dialogVisible: {
        value: false
      },
      dialogVisibletwo: {
        value: false
      },
      dialogVisiblethree: {
        value: false
      },
      dialogVisiblefour: {
        value: false
      },
      dialogVisiblefive: {
        value: false
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      multipleSelection: [],
      checked: false,
      options: [],
      optionst: [],
      value: '',
      sysPxAuditStatusName: ''
    }
  },
  created() {
    this.getList()
    this.sysRegionList()
    this.auditStatusStates()
  },
  methods: {
    getList() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        keyword: this.input,
        quName: this.value,
        state: this.sysPxAuditStatusName
      }
      this.listLoading = true
      selectDxPxkcPageAdministration(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getDatat() {
      this.getList()
    },
    sysRegionList() {
      const params = {}
      sysRegionList(params).then(res => {
        this.options = res.data
      })
    },
    auditStatusStates() {
      const params = {}
      auditStatusStates(params).then(res => {
        this.optionst = res.data
      })
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    totaldownloads() {
    },
    download() {
    },
    delcour(id, val) {
      const params = {
        integer: id,
        userDeleteCause: val
      }
      this.listLoading = true
      deletet(params).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    deleteBath(val) {
      const params = {
        integers: this.multipleSelection,
        userDeleteCause: val
      }
      this.listLoading = true
      deleteBath(params).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.checked = false
        this.$refs.multipleTable.clearSelection()
        this.getList()
      })
    },
    handleUpdate(row) {
      this.detail = row
      this.dialogVisiblethree.value = true
      this.dialogVisiblefour.value = false
      // this.$refs.childh.$emit('childthod')
    },
    handleUpdatefoue(row) {
      this.detail = row
      this.dialogVisiblethree.value = true
      this.dialogVisiblefour.value = true
      // this.dialogVisiblefour.value = false
    },
    handleUpdatefouet(row) {
      this.detail = row
      this.dialogVisiblethree.value = true
      this.dialogVisiblefour.value = false
    },
    handleUpdatewo(row) {
      this.statisticSign(row.id)
      this.detail = row
      this.dialogVisiblefive.value = true
      // this.$refs.child.getList()
      this.$refs.child.$emit('child')
    },
    handleUpdateh(row) {
      this.detail = row
      this.dialogVisibletwo.value = true
      this.dialogVisible.value = true
      this.$refs.childt.$emit('childmethod')
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.map((item) => {
        this.multipleSelection.push(item.id)
      })
    },
    statisticSign(id) {
      statisticSign(id).then(res => {
        this.diaList = res.data
        this.$refs.child.test()
      })
    },
    changecheck(val) {
      if (val) {
        this.$refs.multipleTable.toggleAllSelection()
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    dialogshow() {
      this.dialogVisible.value = true
      this.dialogVisibletwo.value = false
    },
    delcourse(id) {
      this.$prompt('请输入删除原因?', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 确认删除
        .then(({ value }) => {
          this.delcour(id, value)
        })
        .catch(() => {
        })
    },
    delcourseall() {
      this.$prompt('请输入删除原因?', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 确认删除
        .then(({ value }) => {
          this.deleteBath(value)
        })
        .catch(() => {
        })
    },
    updateData() {}
  }
}
</script>
<style scoped>
  .app-container {
    background: #fff;
    height: 100%;
  }
  .seach-pad {
    margin-left: 10px !important;
  }
  .tongji {
    float:right;
    margin-left: 20px;
    padding-top: 10px;
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
  .look {
    color: rgb(24, 144, 255);
    font-size: 14px;
    cursor: pointer;
  }
  .recovery {
    color: rgb(255, 0, 0);
    font-size: 14px;
    cursor: pointer;
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
</style>
