<template>
  <el-dialog title="课程信息" custom-class="line-dialog" :visible.sync="dialogVisiblefive.value" width="840px">
    <div class="form-wrap myTable">
      <el-form ref="ruleForm">
        <table class="customTable">
          <tr>
            <td colspan="5" class="td-width-01 te"><div class="heiwidth">{{ detail.dxPxkcBt }}</div></td>
            <td class="td-width-auto">
              <div>
                <el-tag :type="detail.stateId | statusFilter">
                  {{ detail.stateId | statusTextFilter }}
                </el-tag>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="td-width-auto te">
              <div v-html="detail.dxPxkcKcnr" />
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>培训地址</div></td>
            <td colspan="5" class="td-width-auto te">
              <div class="input">
                {{ detail.dxPxkcSkdz }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>培训时间</div></td>
            <td colspan="5" class="td-width-auto te">
              <div class="input">
                {{ detail.dxPxkcKssj }} 至 {{ detail.dxPxkcJssj }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>学时</div></td>
            <td colspan="2" class="td-width-auto te">
              <div class="input">
                {{ detail.dxPxkcKcxs }}
              </div>
            </td>
            <td class="td-width-03"><div>参与人数</div></td>
            <td colspan="2" class="td-width-auto te">
              <div class="input">
                {{ detail.dxPxkcDqrs }}/{{ detail.dxPxkcZrs }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>区域级别</div></td>
            <td colspan="2" class="td-width-auto te">
              <div class="input">
                {{ detail.dxPxkcPxjbName }}
              </div>
            </td>
            <td class="td-width-03"><div>区域</div></td>
            <td colspan="2" class="td-width-auto te">
              <div class="input">
                {{ detail.quNames }}
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <div class="echartbox">
      <div ref="circhart" class="cirechart" />
    </div>
    <div class="tablesolt">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" :before-leave="beforeLeave" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
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
            <el-table-column label="姓名" align="center" width="160px">
              <template slot-scope="{row}">
                <span>{{ row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="{row}">
                <span>{{ row.userSex }}</span>
              </template>
            </el-table-column>
            <el-table-column label="工作区域" align="center">
              <template slot-scope="{row}">
                <span>{{ row.quName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="证书编号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.userCertificate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.userPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="{row}">
                <el-tag :type="row.isSign | statusFiltert">
                  {{ row.isSign }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-tab-pane>
        <el-tab-pane name="CustoBtn">
          <span slot="label">
            <div class="soltbtn">
              <span class="downtext">下载导入签到模版</span>
              <!-- <el-button class="slbt" type="primary" icon="el-icon-edit"> -->
              <span>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button type="primary">点击上传</el-button>
                </el-upload>
              </span>
              <!-- </el-button> -->
              <el-button class="slbt" type="primary" icon="el-icon-download">下载数据</el-button>
            </div>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
import * as echarts from 'echarts'
import { selectKcSign } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
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
    },
    statusFiltert(status) {
      const statusMap = {
        '已签': 'success',
        '未签': 'info'
      }
      return statusMap[status]
    }
  },
  props: {
    dialogVisiblefive: {
      type: Object,
      default() {
        return {
          value: false
        }
      }
    },
    detail: {
      type: Object,
      default() {
        return {
          value: {}
        }
      }
    },
    dialist: {
      type: Array,
      default() {
        return {
          value: []
        }
      }
    }
  },
  data() {
    return {
      isSign: '',
      content1: '',
      tabMapOptions: [
        { label: '全部', key: 'CN' },
        { label: '已签', key: 'US' },
        { label: '未签', key: 'USt' }
      ],
      activeName: 'CN',
      listLoading: true,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // this.circularChart()
    this.$nextTick(function() {
      this.$on('child', function() {
        this.$nextTick(function() {
          this.activeName = 'CN'
          this.isSign = ''
          this.getList()
        })
      })
    })
  },
  methods: {
    test() {
      this.$nextTick(() => {
        this.circularChart()
      })
    },
    circularChart() {
      this.$refs.circhart.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhart)
      const option = {
        color: ['rgb(0, 218, 194)', 'rgb(230, 166, 230)'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40', '50%'],
            label: {
              normal: {
                // formatter: `<div>123</div>`,
                formatter: '{aa|{b}}\n{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  },
                  bb: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    fontSize: 16
                  }
                }
              }
            },
            labelLine: {
              length: 15,
              length2: 0,
              maxSurfaceAngle: 80,
              normal: {
                lineStyle: {
                  color: 'rgb(230, 166, 230)' // 改变标示线的颜色
                }
              }
            },
            data: this.dialist,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    },
    handleClick(tab, event) {
      if (tab.name === 'CN') {
        this.listQuery.page = 1
        this.isSign = ''
        this.getList()
      } else if (tab.name === 'US') {
        this.listQuery.page = 1
        this.isSign = '已签'
        this.getList()
      } else if (tab.name === 'USt') {
        this.listQuery.page = 1
        this.isSign = '未签'
        this.getList()
      }
    },
    getList() {
      const params = {
        isSign: this.isSign,
        kcId: this.detail.id,
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      this.listLoading = true
      selectKcSign(params).then(res => {
        this.list = res.data.records
        this.total = res.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    beforeLeave(visitName, currentName) {
      if (visitName === 'CustoBtn') {
        return false
      }
    }
  }
}
</script>
<style>
  .tablesolt .el-tabs__item {
    height: 50px !important;
    line-height: 50px !important;
  }
</style>
<style lang="scss" scoped>
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
  .echartbox {
    text-align: center;
  }
  .cirechart {
    width: 360px;
    height: 360px;
    display: inline-block
  }
  .myTable table.customTable .te {
    text-align: left;
    padding-left: 20px;
  }
  .te span {
    line-height: 30px;
  }
  .delte {
    color: red;
  }
  .delbtn {
    background: rgb(231, 250, 240);
    border: 1px solid rgb(208, 245, 224);
    border-radius: 4px;
    color: rgb(19, 206, 102);
    margin: 0 30px;
  }
  .heiwidth {
    font-size: 14px;
    font-weight: 700 !important;
  }
  .soltbtn {
    margin-left: 180px;
  }
  .slbt {
    margin-left: 12px;
  }
  .downtext {
    color: #1890ff;
    margin-right: 16px;
  }
  .upload-demo {
    display: inline-block !important;
  }
</style>
