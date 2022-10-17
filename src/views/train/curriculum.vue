<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="input" placeholder="" clearable style="width: 200px;" class="filter-item" />
      <el-button class="filter-item seach-pad" type="primary" icon="el-icon-search" @click="search()">
        搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :header-cell-style="{
        'background': 'rgb(249, 249, 249)',
        border: '1px solid rgb(234, 234, 234)'
      }"
      border
    >
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
      <el-table-column label="学时">
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
          <span class="look" @click="handleUpdate(row)">
            查看信息
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog title="课程信息" custom-class="line-dialog" :visible.sync="dialogFormVisible">
      <div class="form-wrap myTable">
        <el-form ref="ruleForm">
          <table class="customTable">
            <tr>
              <td colspan="5" class="td-width-01 te"><div class="heiwidth">{{ coursrtitle }}</div></td>
              <td class="td-width-auto">
                <el-tag :type="statusp | statusFilter">
                  {{ statusp | statusTextFilter }}
                </el-tag>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="td-width-auto te">
                <div v-html="content" />
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div>培训地址</div></td>
              <td colspan="5" class="td-width-auto te">
                <div class="input">
                  {{ trainingaddress }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div>培训时间</div></td>
              <td colspan="5" class="td-width-auto te">
                <div class="input">
                  {{ startstime }} 至 {{ endtime }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div>学时</div></td>
              <td colspan="2" class="td-width-auto te">
                <div class="input">
                  {{ credithours }}
                </div>
              </td>
              <td class="td-width-03"><div>参与人数</div></td>
              <td colspan="2" class="td-width-auto te">
                <div class="input">
                  {{ participants }}/{{ allpeople }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div>区域级别</div></td>
              <td colspan="2" class="td-width-auto te">
                <div class="input">
                  {{ regionallevel }}
                </div>
              </td>
              <td class="td-width-03"><div>区域</div></td>
              <td colspan="2" class="td-width-auto te">
                <div class="input">
                  {{ region }}
                </div>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
      <el-button v-if="statusp === 2" class="savecl" type="success" icon="el-icon-tickets" @click="signup">报名</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { selectDxPxkcPageCommon, apply } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: '',
        3: 'success',
        4: 'info',
        5: 'danger',
        6: 'success '
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        1: '已结束',
        2: '我要报名',
        3: '进行中',
        4: '已签到',
        5: '未签到',
        6: '未签到'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      input: '',
      size: '',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      statusp: '1',
      content: '4',
      trainingaddress: '6',
      credithours: '8',
      participants: '9',
      regionallevel: '11',
      region: '12',
      coursrtitle: '',
      startstime: '',
      endtime: '',
      allpeople: '',
      id: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    signup() {
      const params = {
        kcId: this.id
      }
      apply(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '报名成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getList()
        }
      })
    },
    getList() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        keyword: this.input
      }
      selectDxPxkcPageCommon(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.coursrtitle = row.dxPxkcBt
      this.statusp = row.stateId
      this.content = row.dxPxkcKcnr
      this.trainingaddress = row.dxPxkcSkdz
      this.credithours = row.dxPxkcKcxs
      this.participants = row.dxPxkcDqrs
      this.regionallevel = row.dxPxkcPxjbName
      this.region = row.quNames
      this.startstime = row.dxPxkcKssj
      this.endtime = row.dxPxkcJssj
      this.allpeople = row.dxPxkcZrs
      this.id = row.id
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
  .curbox {
    width:100%;
    border: 1px solid rgb(223, 230, 236);
    /* height: 300px; */
  }
  .curtit {
    width:100%;
    border-bottom: 1px solid rgb(223, 230, 236);
    /* height: 38px; */
  }
  .curtitleft {
    display: inline-block;
    border-right: 1px solid rgb(223, 230, 236);
    font-size: 14px;
    line-height: 38px;
    width:80%;
    padding-left: 20px;
  }
  .curtitrig {
    display: inline-block;
    width:20%;
    text-align: center;
  }
  .curtitli {
    background:rgb(230, 247, 255);
    border: 1px solid rgb(145, 213, 255);
    border-radius: 2px;
    color: rgb(24, 144, 255);
    padding: 3px 7px
  }
  .curxli {
    line-height: 38px;
    color: rgb(110, 110, 110);
    font-size: 14px;
    font-weight: 400;
  }
  .curx {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid rgb(223, 230, 236);
  }
  .curb {
    width: 100%;
    border-bottom: 1px solid rgb(223, 230, 236);
  }
  .spl {
    border-right: 1px solid rgb(223, 230, 236);
    display: inline-block;
    line-height: 38px;
    width: 20%;
    color: rgb(110, 110, 110);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    padding-left: 10px;
  }
  .spr {
    display: inline-block;
    line-height: 38px;
    width: 80%;
    padding-left: 10px;
  }
  .currb {
    width: 100%;
    border-bottom: 1px solid rgb(223, 230, 236);
  }
  .curtimebox {
    display: inline-block;
    width: 50%;
    border-right: 1px solid rgb(223, 230, 236);
  }
  .curtimebox .curtimeboxl {
    display: inline-block;
    width: 40%;
    border-right: 1px solid rgb(223, 230, 236);
    line-height: 38px;
    color: rgb(110, 110, 110);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
  .curtimebox .curtimeboxr {
    width: 60%;
    display: inline-block;
    padding-left: 10px;
  }
  .curboxnum {
    display: inline-block;
    border-right: 1px solid rgb(223, 230, 236);
    width: 50%;
  }
  .curboxnum .curtimeboxl {
    width: 40%;
    display: inline-block;
    border-right: 1px solid rgb(223, 230, 236);
    line-height: 38px;
    color: rgb(110, 110, 110);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
  .curboxnum .curtimeboxr {
    width: 60%;
    display: inline-block;
    padding-left: 10px;
  }
  .savecl {
    margin-left: 45%;
    margin-top: 50px;
  }
  .look {
    color: rgb(24, 144, 255);
    font-size: 14px;
    cursor: pointer;
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
  .myTable table.customTable .te {
    text-align: left;
    padding-left: 20px;
  }
  .heiwidth {
    font-size: 14px;
    font-weight: 700 !important;
  }
</style>
