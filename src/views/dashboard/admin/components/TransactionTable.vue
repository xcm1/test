<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span> 培训课程</span>
      <router-link to="/train-manage/course"><el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button></router-link>
    </div>
    <el-table :data="list" style="width: 100%;padding-top: 8px;">
      <el-table-column label="培训课程名称" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.dxPxkcBt }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dxPxkcKssj }}
        </template>
      </el-table-column>
      <el-table-column label="学时" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.dxPxkcKcxs }}
        </template>
      </el-table-column>
      <el-table-column label="区域" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.quNames }}
        </template>
      </el-table-column>
      <el-table-column label="级别" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.dxPxkcPxjbName }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.stateId | statusFilter">
            {{ row.stateId | statusTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
import { apiDxPxkcPageAdministrationById } from '@/api/home'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'danger',
        2: 'warning',
        3: 'danger',
        4: 'danger',
        5: 'success',
        6: 'info'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        1: '不通过',
        2: '未审核',
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
      // list: null
      list: [
        {
          name: '● 展示交互式原型，或许会成为不错的加分项。......',
          time: '2009/06/21',
          field03: '207',
          field04: '黄浦区',
          field05: '区级',
          status: 'pending'
        },
        {
          name: '● 展示交互式原型，或许会成为不错的加分项。......',
          time: '2009/06/21',
          field03: '207',
          field04: '黄浦区',
          field05: '区级',
          status: 'success'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      apiDxPxkcPageAdministrationById().then(res => {
        console.log(res, '列表数据')
        this.list = res.data.records
      })
    }
  }
}
</script>
