<template>
  <div class="app-container tabbox">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="督学" name="du">
        <div>
          <el-select v-model="value" class="filter-item" style="margin-right:14px;width:140px" placeholder="区域">
            <el-option
              v-for="item in options"
              :key="item.sysRegionId"
              :label="item.sysRegionName"
              :value="item.sysRegionName"
            />
          </el-select>
          <el-input v-model="input" placeholder="请输入关键字" style="width: 200px;" class="filter-item" />
          <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search()">
            搜索
          </el-button>
        </div>
        <superintendent ref="super" :list="list" @getData="getData" />
      </el-tab-pane>
      <el-tab-pane label="培训课程" name="course">
        <div>
          <el-select v-model="valuet" class="filter-item" style="margin-right:14px;width:140px" placeholder="区域">
            <el-option
              v-for="item in options"
              :key="item.sysRegionId"
              :label="item.sysRegionName"
              :value="item.sysRegionName"
            />
          </el-select>
          <el-input v-model="inputwo" placeholder="请输入关键字" style="width: 200px;" class="filter-item" />
          <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search()">
            搜索
          </el-button>
        </div>
        <course ref="course" :list="list" @getDatat="getDatat" />
      </el-tab-pane>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-tabs>
  </div>
</template>

<script>
import { sysRegionList, educational, recycleTrainingCourse } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Course from '@/components/recyTable/course' // secondary package based on el-pagination
import Superintendent from '@/components/recyTable/superintendent' // secondary package based on el-pagination
export default {
  name: 'Information',
  components: { Pagination, Course, Superintendent },
  data() {
    return {
      input: '',
      inputwo: '',
      activeName: 'du',
      options: [],
      value: '',
      valuet: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
    this.sysRegionList()
  },
  methods: {
    search() {
      this.listQuery.page = 1
      if (this.activeName === 'du') {
        this.getList()
      } else if (this.activeName === 'course') {
        this.getListw()
      }
    },
    getList() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        quName: this.value,
        keyword: this.input
      }
      educational(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    getData() {
      this.getList()
    },
    getDatat() {
      this.getListw()
    },
    getListw() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        quName: this.valuet,
        keyword: this.inputwo
      }
      recycleTrainingCourse(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    sysRegionList() {
      const params = {}
      sysRegionList(params).then(res => {
        this.options = res.data
      })
    },
    handleClick(tab, event) {
      this.listQuery.page = 1
      if (this.activeName === 'du') {
        this.input = ''
        this.value = ''
        this.$refs.super.clear()
        this.getList()
      } else if (this.activeName === 'course') {
        this.inputwo = ''
        this.valuet = ''
        this.$refs.course.clear()
        this.getListw()
      }
    }
  }
}
</script>
<style>
  .tabbox .el-tabs__content {
    min-height: 700px !important;
  }
</style>
<style lang="scss" scoped>
.page-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

}
  .seach-pad {
    margin-left: 10px !important;
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
</style>
