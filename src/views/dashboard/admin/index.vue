<template>
  <div class="dashboard-editor-container">
    <panel-group :statistic-data="statisticData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { apiGetHomeStatisticData, apiUserCreateYearMonthStatistic } from '@/api/home'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145, 91, 154, 162, 140, 145]
//   }
// }
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
      lineChartData: {},
      listLoading: false,
      statisticData: {} // 统计数据
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      apiGetHomeStatisticData().then(res => {
        console.log(res, '统计数据')
        this.statisticData = res.data
      })
      apiUserCreateYearMonthStatistic().then(res => {
        console.log(res, '图表数据')
        const lastYear = []
        for (const key in res.data.lastYear) {
          lastYear.push(res.data.lastYear[key])
        }
        console.log(lastYear, 'lastYear')
        const thisYear = []
        for (const key in res.data.thisYear) {
          thisYear.push(res.data.thisYear[key])
        }
        console.log(thisYear, 'thisYear')
        this.lineChartData = {
          expectedData: lastYear,
          actualData: thisYear
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
