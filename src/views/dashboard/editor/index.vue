<template>
  <div class="dashboard-editor-container">
    <panel-group :user-data="userData" />

    <el-row :gutter="24">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { apiGetHomeBasicByUserId } from '@/api/home'
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    TransactionTable
  },
  data() {
    return {
      userData: {} // 用户数据
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      apiGetHomeBasicByUserId().then(res => {
        console.log(res, '用户数据')
        this.userData = res.data
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
