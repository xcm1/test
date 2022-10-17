<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="input" clearable style="width:200px;" class="filter-item" />
      <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <div class="tongji">
        <span>我的总获得学时</span>
        &nbsp;<span class="tt">{{ totahours }}</span>&nbsp;
        <span>我在本期</span>
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">复检时间是首次注册时间的三年后。 <br>根据管理要求，在复检时间段内获取 120学时，为达标条件</div>
          <span class="fu">复检时间</span>
        </el-tooltip>
        <span>段内已获得学时</span>
        &nbsp;<span class="tt">{{ credithours }}</span>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="学时获取时间" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { selectDxPxjlPage, selectBasicByUserId } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {
  },
  data() {
    return {
      input: '',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      totahours: '0',
      credithours: '0'
    }
  },
  created() {
    this.getList()
    this.selecBasicByUserId()
  },
  methods: {
    getList() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        keyword: this.input
      }
      this.listLoading = true
      selectDxPxjlPage(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    selecBasicByUserId() {
      const params = {}
      selectBasicByUserId(params).then(res => {
        this.totahours = res.data.sumPeriod
        this.credithours = res.data.recheckPeriod
      })
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
  .app-container {
    background: #fff;
    min-height: calc(100vh - 84px)
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
.seach-pad {
  margin-left: 10px !important;
}
.tongji {
  float:right
}
.tt {
  background: rgb(230, 247, 255);
  border: 1px solid rgb(145, 213, 255);
  display: inline-block;
  padding:4px 7px;
  border-radius: 2px;
  color: rgb(24, 144, 255)
}
.fu {
  color:rgb(25, 137, 250);
}
</style>
