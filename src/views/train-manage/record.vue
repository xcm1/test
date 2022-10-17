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
      <el-input v-model="input" placeholder="请输入" clearable style="width: 200px;" class="filter-item" />
      <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search()">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-left:14px" @click="totaldownloads"><i class="el-icon-download" />下载汇总表</el-button>
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
      @sort-change="sortChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userSex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作区域" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userJobQy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="督学类别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCategory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userCertificate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总学时" prop="pageviews" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userSumPeriod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="复检学时" prop="author" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userRecheckPeriod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" fixed="right">
        <template slot-scope="{row}">
          <span class="look" @click="handleUpdate(row.id)">
            查看信息
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-checkbox v-model="checked" @change="changecheck">选择全部</el-checkbox>
      <el-button type="primary" style="margin-left:14px" @click="download()"><i class="el-icon-download el-icon--right" />下载</el-button>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="schoolRecord" />
    <el-dialog title="培训记录详情" custom-class="line-dialog" :visible.sync="dialogFormVisible">
      <div class="title">颖状的培训记录详情</div>
      <div class="detailed">颖妆到目前为止已经参与了 {{ sessions }} 场培训，共获得 {{ credithours }} 学时。</div>
      <el-table
        ref="multipleTable"
        :data="listwo"
        border
        :header-cell-style="{
          'background': 'rgb(249, 249, 249)',
          border: '1px solid rgb(234, 234, 234)'
        }"
      >
        <el-table-column label="序号" type="index" align="center" width="80px" />
        <el-table-column label="培训课程名称" align="center" width="360px">
          <template slot-scope="{row}">
            <span>{{ row.dxPxkcBt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训时间">
          <template slot-scope="{row}">
            <span>{{ row.dxPxkcKssj }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域" align="center">
          <template slot-scope="{row}">
            <span>{{ row.quName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学时" class-name="status-col">
          <template slot-scope="{row}">
            <span>{{ row.dxPxkcKcxs }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totaltwo>0" :total="totaltwo" :page.sync="listQuerytwo.page" :limit.sync="listQuerytwo.limit" @pagination="recordDetails" />
    </el-dialog>
  </div>
</template>

<script>
import { sysRegionList, schoolRecord, recordDetails, statisticRecord } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {
  },
  data() {
    return {
      coursrid: '',
      input: '',
      list: null,
      total: 0,
      listLoading: false,
      listwo: null,
      totaltwo: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      listQuerytwo: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      multipleSelection: [],
      checked: false,
      options: [],
      value: '',
      sessions: 0,
      credithours: 0
    }
  },
  created() {
    this.schoolRecord()
    this.sysRegionList()
  },
  methods: {
    schoolRecord() {
      const params = {
        keyword: this.input,
        page: this.listQuery.page,
        size: this.listQuery.limit,
        quName: this.value
      }
      schoolRecord(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    recordDetails(val) {
      const params = {
        page: this.listQuerytwo.page,
        size: this.listQuerytwo.limit,
        userId: this.coursrid
      }
      recordDetails(params).then(res => {
        this.listwo = res.data.records
        this.totaltwo = res.data.total
      })
    },
    statisticRecordt(id) {
      statisticRecord(this.coursrid).then(res => {
        this.sessions = res.data.session
        this.credithours = res.data.period
      })
    },
    sysRegionList() {
      sysRegionList({}).then(res => {
        this.options = res.data
      })
    },
    search() {
      this.listQuery.page = 1
      this.schoolRecord()
    },
    totaldownloads() {
    },
    download() {
    },
    handleUpdate(id) {
      this.dialogFormVisible = true
      this.coursrid = id
      this.recordDetails()
      this.statisticRecordt()
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.map((item) => {
        this.multipleSelection.push(item.id)
      })
    },
    changecheck(val) {
      if (val) {
        this.$refs.multipleTable.toggleAllSelection()
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    sortChange(val) {
    },
    updateData() {}
  }
}
</script>
<style scoped>
  .app-container {
    background: #fff;
    min-height: calc(100vh - 84px)
  }
  .seach-pad {
    margin-left: 10px !important;
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
  .title {
    width: 100%;
    height: 38px;
    line-height: 38px;
    border: 1px solid rgb(223, 230, 236);
    font-size: 14px;
    font-weight: 700;
    padding-left: 20px;
  }
  .detailed {
    width: 100%;
    height: 100px;
    line-height: 38px;
    border-left: 1px solid rgb(223, 230, 236);
    border-right: 1px solid rgb(223, 230, 236);
    font-size: 14px;
    padding-left: 10px;
  }
</style>
