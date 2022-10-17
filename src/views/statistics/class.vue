<template>
  <div class="registe-container">
    <div class="form-wrap myTable">
      <el-form ref="ruleForm">
        <table class="customTable">
          <tbody>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">年龄分布</div></td>
              <td colspan="1" class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('1')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="chart" class="echart" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="td-width-auto tet">
                <div class="analysis">
                  督学平均年龄为56岁；
                </div>
                <div class="analysis">
                  女性督学平均年龄为55岁；
                </div>
                <div class="analysis">
                  男性督学平均年龄为58岁；
                </div>
                <div class="analysis">
                  58%的督学集中在50-60岁，所占比最大；
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">职称分布</div></td>
              <td colspan="1" class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('2')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="chartwo" class="echart" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">学历分布</div></td>
              <td colspan="1" class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('3')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="charsix" class="echart" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">学段分布</div></td>
              <td class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('4')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="charthree" class="echart" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">工作性质</div></td>
              <td colspan="1" class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('5')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="circhart" class="echart" />
                </div>
                <div class="peoplebox">
                  <div v-for="item in tuinum" :key="item.name" class="pobox">
                    <span class="text">{{ item.name }} : </span>
                    <span>{{ item.value }} 人</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="td-width-01 tet"><div class="heiwidth">督学类别</div></td>
              <td colspan="1" class="td-width-auto">
                <div class="delbtn">
                  <el-button type="primary" icon="el-icon-view" @click="datadetails('6')">数据详情</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="circhartwo" class="echart" />
                </div>
                <div class="peoplebox">
                  <div v-for="item in jobnum" :key="item.name" class="pobox">
                    <span class="text">{{ item.name }} : </span>
                    <span>{{ item.value }} 人</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </div>
    <div>
      <el-dialog title="统计数据详情" custom-class="line-dialog" :visible.sync="dialogFormVisible">
        <div class="curbox">
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
            <el-table-column label="ID" align="center">
              <template slot-scope="{row}">
                <span>{{ row.sysUserId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="{row}">
                <span>{{ row.sysUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="{row}">
                <span>{{ row.sysUserSex }}</span>
              </template>
            </el-table-column>
            <el-table-column label="工作区域" align="center">
              <template slot-scope="{row}">
                <span>{{ row.sysRegionName }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="UserAge" prop="sysUserAge" label="年龄" align="center" />
            <el-table-column v-if="JobTitleName" prop="sysJobTitleName" label="职称" align="center" />
            <el-table-column v-if="EducationalName" prop="sysEducationalName" label="学历" align="center" />
            <el-table-column v-if="TeachingSectionName" prop="sysTeachingSectionName" label="学段" align="center" />
            <el-table-column v-if="UserNature" prop="sysUserNature" label="工作性质" align="center" />
            <el-table-column v-if="SupervisionClassName" prop="sysSupervisionClassName" label="督学类别" align="center" />
            <el-table-column label="证书编号" align="center">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.sysUserCertificate }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
          <div class="btnbox">
            <el-button type="primary" icon="el-icon-download">下载数据</el-button>
            <el-button icon="el-icon-close" @click="close()">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { statisticalData, ageReleaseDistributionDetails, postTitleDistributionDetails, educationDistributionDetails, studyingDistributionDetails, jobNatureDistributionDetails, categoryDistributionDetailst } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import * as echarts from 'echarts'
export default {
  name: 'RegisteForm',
  components: { Pagination },
  data() {
    return {
      tuinum: [],
      dialogFormVisible: false,
      list: [],
      total: 1,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      asymList: [56, 77, 88, 57, 110],
      diagnList: [30, 50, 89, 99, 18],
      todayList: ['20-30岁', '30-40岁', '40-50岁', '50-60岁'],
      asymListwo: [56, 77, 88, 57, 10],
      diagnListwo: [30, 50, 89, 99, 8],
      todayListwo: ['幼儿园高级', '小学高级', '中学中级', '副教授（副高）', '教授（正高）'],
      asymListhree: [56, 77, 88, 57, 10, 22],
      diagnListhree: [30, 50, 89, 99, 8, 43],
      todayListhree: ['幼儿园', '小学', '中学', '高中', '职教', '其他'],
      asymLissix: [56, 77, 88, 57, 10],
      diagnLissix: [30, 50, 89, 99, 8],
      todayLissix: ['大专', '本科', '硕士', '博士'],
      diaList: [],
      diaListwo: [
        {
          name: '兼职',
          value: 60.2
        },
        {
          name: '专职',
          value: 20.5
        },
        {
          name: '未聘任',
          value: 19.3
        }
      ],
      jobnum: [],
      UserAge: false,
      JobTitleName: false,
      EducationalName: false,
      TeachingSectionName: false,
      UserNature: false,
      SupervisionClassName: false
    }
  },
  created() {
    // this.getList()
    this.statisticalData()
  },
  mounted() {
  },
  methods: {
    datadetails(id) {
      this.dialogFormVisible = true
      this.listQuery.page = 1
      this.listQuery.limit = 20
      if (id === '1') {
        this.UserAge = true
        this.JobTitleName = false
        this.EducationalName = false
        this.TeachingSectionName = false
        this.UserNature = false
        this.SupervisionClassName = false
        this.getList()
      } else if (id === '2') {
        this.UserAge = false
        this.JobTitleName = true
        this.EducationalName = false
        this.TeachingSectionName = false
        this.UserNature = false
        this.SupervisionClassName = false
        this.getListwo()
      } else if (id === '3') {
        this.UserAge = false
        this.JobTitleName = false
        this.EducationalName = true
        this.TeachingSectionName = false
        this.UserNature = false
        this.SupervisionClassName = false
        this.getListhree()
      } else if (id === '4') {
        this.UserAge = false
        this.JobTitleName = false
        this.EducationalName = false
        this.TeachingSectionName = true
        this.UserNature = false
        this.SupervisionClassName = false
        this.getListfour()
      } else if (id === '5') {
        this.UserAge = false
        this.JobTitleName = false
        this.EducationalName = false
        this.TeachingSectionName = false
        this.UserNature = true
        this.SupervisionClassName = false
        this.getListfive()
      } else if (id === '6') {
        this.UserAge = false
        this.JobTitleName = false
        this.EducationalName = false
        this.TeachingSectionName = false
        this.UserNature = false
        this.SupervisionClassName = true
        this.getListsix()
      }
    },
    close() {
      this.dialogFormVisible = false
    },
    statisticalData() {
      const params = {}
      console.log(this.todayList)
      statisticalData(params).then(res => {
        this.todayList = res.data.age.nameValues
        this.asymList = res.data.age.womanValues
        this.diagnList = res.data.age.manValues
        this.todayListwo = res.data.postTitle.nameValues
        this.asymListwo = res.data.postTitle.womanValues
        this.diagnListwo = res.data.postTitle.manValues
        this.todayLissix = res.data.education.nameValues
        this.asymLissix = res.data.education.womanValues
        this.diagnLissix = res.data.education.manValues
        this.todayListhree = res.data.studyingField.nameValues
        this.asymListhree = res.data.studyingField.womanValues
        this.diagnListhree = res.data.studyingField.manValues
        this.diaList = res.data.jobNature.view
        this.tuinum = res.data.jobNature.model
        this.diaListwo = res.data.category.view
        this.jobnum = res.data.category.model
        this.indurteyChart()
        this.indurteyChartwo()
        this.indurteyCharthree()
        this.circularChart()
        this.circularChartwo()
        this.indurteyCharsix()
      })
    },
    getList() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      ageReleaseDistributionDetails(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getListwo() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      postTitleDistributionDetails(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getListhree() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      educationDistributionDetails(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getListfour() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      studyingDistributionDetails(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getListfive() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      jobNatureDistributionDetails(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getListsix() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      categoryDistributionDetailst(params.page, params.limit).then(res => {
        console.log(res.data.records.length)
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    indurteyChart() {
      const myChart = echarts.init(this.$refs.chart)
      const option = {
        grid: {
          left: '2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['男性督学', '女性督学'],
          rient: 'vertical',
          left: 'center',
          top: 'bottom'
          //   right: "25%",
        },
        xAxis: {
          data: this.todayList
          // axisLabel: {
          //   interval: 0, //代表显示所有x轴标签显示
          //   rotate: 45, //代表逆时针旋转45度
          // },
        },
        yAxis: {
          type: 'value',
          name: `督\n\n学\n\n人\n\n数\n\n(人)`,
          nameLocation: 'middle',
          nameGap: 35,
          nameRotate: 360
        },
        series: [
          {
            name: '女性督学',
            type: 'bar',
            stack: '业务',
            data: this.asymList,
            itemStyle: {
              normal: {
                color: '#EB7E65',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            name: '男性督学',
            type: 'bar',
            stack: '业务',
            barWidth: 40,
            data: this.diagnList,
            itemStyle: {
              normal: {
                color: '#73A0FA',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    indurteyChartwo() {
      const myChart = echarts.init(this.$refs.chartwo)
      const option = {
        grid: {
          left: '2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['男性督学', '女性督学'],
          rient: 'vertical',
          left: 'center',
          top: 'bottom'
          //   right: "25%",
        },
        xAxis: {
          data: this.todayListwo
          // axisLabel: {
          //   interval: 0, //代表显示所有x轴标签显示
          //   rotate: 45, //代表逆时针旋转45度
          // },
        },
        yAxis: {
          type: 'value',
          name: `督\n\n学\n\n人\n\n数\n\n(人)`,
          nameLocation: 'middle',
          nameGap: 35,
          nameRotate: 360
        },
        series: [
          {
            name: '女性督学',
            type: 'bar',
            stack: '业务',
            data: this.asymListwo,
            itemStyle: {
              normal: {
                color: '#EB7E65',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            name: '男性督学',
            type: 'bar',
            stack: '业务',
            barWidth: 40,
            data: this.diagnListwo,
            itemStyle: {
              normal: {
                color: '#73A0FA',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    indurteyCharsix() {
      const myChart = echarts.init(this.$refs.charsix)
      const option = {
        grid: {
          left: '2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['男性督学', '女性督学'],
          rient: 'vertical',
          left: 'center',
          top: 'bottom'
          //   right: "25%",
        },
        xAxis: {
          data: this.todayLissix
          // axisLabel: {
          //   interval: 0, //代表显示所有x轴标签显示
          //   rotate: 45, //代表逆时针旋转45度
          // },
        },
        yAxis: {
          type: 'value',
          name: `督\n\n学\n\n人\n\n数\n\n(人)`,
          nameLocation: 'middle',
          nameGap: 35,
          nameRotate: 360
        },
        series: [
          {
            name: '女性督学',
            type: 'bar',
            stack: '业务',
            data: this.asymLissix,
            itemStyle: {
              normal: {
                color: '#EB7E65',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            name: '男性督学',
            type: 'bar',
            stack: '业务',
            barWidth: 40,
            data: this.diagnLissix,
            itemStyle: {
              normal: {
                color: '#73A0FA',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    indurteyCharthree() {
      const myChart = echarts.init(this.$refs.charthree)
      const option = {
        grid: {
          left: '2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['男性督学', '女性督学'],
          rient: 'vertical',
          left: 'center',
          top: 'bottom'
          //   right: "25%",
        },
        xAxis: {
          data: this.todayListhree
          // axisLabel: {
          //   interval: 0, //代表显示所有x轴标签显示
          //   rotate: 45, //代表逆时针旋转45度
          // },
        },
        yAxis: {
          type: 'value',
          name: `督\n\n学\n\n人\n\n数\n\n(人)`,
          nameLocation: 'middle',
          nameGap: 35,
          nameRotate: 360
        },
        series: [
          {
            name: '女性督学',
            type: 'bar',
            stack: '业务',
            data: this.asymListhree,
            itemStyle: {
              normal: {
                color: '#EB7E65',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          },
          {
            name: '男性督学',
            type: 'bar',
            stack: '业务',
            barWidth: 40,
            data: this.diagnListhree,
            itemStyle: {
              normal: {
                color: '#73A0FA',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    circularChart() {
      this.$refs.circhart.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhart)
      const option = {
        color: ['rgb(0, 218, 194)', '#6495ED', '#D2691E'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            label: {
              normal: {
                // formatter: `<div>123</div>`,
                formatter: `{aa|{b}}\n{aa|{c}%}`,
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
            data: this.diaList,
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
    circularChartwo() {
      this.$refs.circhartwo.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhartwo)
      const option = {
        color: ['rgb(0, 218, 194)', '#6495ED', '#D2691E'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            label: {
              normal: {
                formatter: '{aa|{b}}\n{aa|{c}%}',
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
            data: this.diaListwo,
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
    }
  }
}
</script>

<style lang="scss" scoped>
.registe-container {
  margin: 0px;
  .form-wrap {
    width:100%;
    margin:10px 10px;
    padding: 20px;
    background-color: #fff;
  }
  .echart {
    width: 100%;
    height: 340px;
    margin: 0 auto;
  }
  .tet {
    text-align: left !important;
    padding-left: 16px;
  }
  .peoplebox {
    text-align: center;
    .pobox {
      display: inline-block;
      padding:0 40px;
      margin-bottom: 30px;
      span {
        display: inline-block;
        font-size: 16px;
        color: rgb(24, 144, 255);
      }
      .text {
        border-bottom: 1px solid rgb(24, 144, 255);
        margin-right: 6px;
      }
    }
  }
}
.pagination-container {
  padding:0 !important;
  margin-top: 16px !important;
}
.btnbox {
  margin-top: 50px;
  text-align: center;
  border-top: 1px solid rgb(231, 236, 241);
  padding-top: 30px;
}
</style>
