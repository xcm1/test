<template>
  <div class="registe-container">
    <div class="form-wrap myTable">
      <el-form ref="ruleForm">
        <table class="customTable">
          <tbody>
            <tr>
              <td colspan="8" class="td-width-auto te">
                <div>
                  培训数据统计
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全部</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in cities" :key="city.sysRegionId" :label="city.sysRegionName" class="radio-padding">
                        {{ city.sysRegionName }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div ref="colchart" class="colchart" />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="tet">
                <div class="echartrend">
                  <div class="text">培训课程总计 551</div>
                  <div ref="colchartwo" class="colchart" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sysRegionList, statisticalDatat } from '@/api/train'
import * as echarts from 'echarts'
export default {
  name: 'RegisteForm',
  components: { },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      content: '',
      regList: [],
      sumList: [],
      nrwData: []
    }
  },
  created() {
    this.sysRegionList()
  },
  mounted() {
  },
  methods: {
    // 上海市所有区
    sysRegionList() {
      this.checkedCitie = []
      const params = {}
      sysRegionList(params).then(res => {
        this.cities = res.data
        this.cities.map((item) => {
          this.checkedCities.push(item.sysRegionName)
        })
        this.statisticalDatat()
      })
    },
    // 图表
    statisticalDatat() {
      const params = {
        strings: this.checkedCities
      }
      statisticalDatat(params).then(res => {
        this.regList = res.data.coursesInTotal.names
        this.sumList = res.data.coursesInTotal.values
        this.nrwData = res.data.coursesInTotalDetail
        this.$nextTick(() => {
          this.columnarChart()
          this.hunrChart()
        })
      })
    },
    handleCheckAllChange(val) {
      console.log(val)
      const allist = []
      this.cities.map((item) => {
        allist.push(item.sysRegionName)
      })
      this.checkedCities = val ? allist : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.checkedCities)
      this.statisticalDatat()
    },
    columnarChart() {
      const myChart = echarts.init(this.$refs.colchart)
      const option = {
        grid: {
          left: '2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          // text: '计数'
        },
        tooltip: {},
        xAxis: {
          data: this.regList,
          axisLabel: {
            interval: 0 // 代表显示所有x轴标签显示
          }
        },
        yAxis: {
          type: 'value',
          name: `计\n\n数`,
          nameLocation: 'middle',
          nameGap: 35,
          nameRotate: 360
        },
        series: [
          {
            data: this.sumList,
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#5B8FF9',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'black',
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
    hunrChart() {
      const myChartwo = echarts.init(this.$refs.colchartwo)
      var xData3 = this.nrwData?.map((item) => item.name)
      const proviceWater = this.nrwData?.map((item) => item.partNumber <= 0 ? 0 : item.partNumber)
      const userWater = this.nrwData?.map((item) => item.applyNumber <= 0 ? 0 : item.applyNumber)
      const userWatert = this.nrwData?.map((item) => item.signNumber <= 0 ? 0 : item.signNumber)
      const lineData = this.nrwData?.map((item) => item.courseNumber <= 0 ? 0 : item.courseNumber)
      var option = {
        tooltip: {
          trigger: 'axis',
          show: true,
          backgroundColor: 'rgba(16, 34, 79, 0.9)',
          borderColor: '#274370',
          textStyle: {
            color: '#fff',
            fontSize: 8
          }
        },
        legend: {
          show: true,
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10,
          // x:'center',
          // y:'bottom',
          padding: [0, 0, 0, 0],
          textStyle: {
            fontSize: 14,
            color: '#ccc'
          }
        },
        grid: {
          left: 30,
          bottom: 20,
          top: 30,
          right: 30,
          containLabel: true
        },
        xAxis: {
          data: xData3,
          // 坐标轴刻度相关设置
          axisTick: {
            show: false
          },
          nameGap: -9,
          // 坐标轴线的相关设置
          axisLine: {
            show: true,
            lineStyle: {
              color: '#414965',
              fontSize: '14px'
            }
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            // 可以设置成 0 强制显示所有标签
            interval: 0,
            textStyle: {
              color: '#7089ba',
              fontSize: '14px'
            },
            margin: 10 // 刻度标签与轴线之间的距离。
          }
        },
        yAxis: [{
          type: 'value',
          // 坐标轴在grid区域中的分隔线
          splitLine: {
            show: false,
            lineStyle: {
              color: '#414965',
              opacity: 0.3
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#7089ba',
              fontSize: '14px'
            }
          }
        },
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#7089ba',
              fontSize: '14px'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#414965',
              opacity: 0.3
            }
          }
        }
        ],
        series: [
          {
            name: '申请参与人数',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              opacity: 0.1,
              normal: {
                show: true,
                color: '#FF8C00',
                barBorderRadius: 0,
                borderWidth: 0
              }
            },
            label: {
              show: true, // 数据不进行显示
              position: 'top',
              distance: 10,
              color: '#000'
            },
            data: proviceWater
          },
          {
            name: '报名人数',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              opacity: 0.1,
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#778899'
                  },
                  {
                    offset: 1,
                    color: '#778899'
                  }
                ]),
                barBorderRadius: 0,
                borderWidth: 0
              }
            },
            label: {
              show: true, // 数据不进行显示
              position: 'top',
              distance: 10,
              color: '#000'
            },
            data: userWater
          },
          {
            name: '签到人数',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              opacity: 0.1,
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#FFD700'
                  },
                  {
                    offset: 1,
                    color: '#FFD700'
                  }
                ]),
                barBorderRadius: 0,
                borderWidth: 0
              }
            },
            label: {
              show: true, // 数据不进行显示
              position: 'top',
              distance: 10,
              color: '#000'
            },
            data: userWatert
          },
          /* 折线图 */
          {
            name: '培训课数',
            type: 'line',
            yAxisIndex: 1,
            z: 15,
            symbol: 'circle',
            // symbolSize: 10,
            itemStyle: {
              normal: {
                color: 'rgb(25, 137, 250)',
                borderColor: 'rgb(25, 137, 250)', // 拐点边框颜色
                lineStyle: {
                  color: 'rgb(25, 137, 250)'// 折线的颜色
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'black',
                    fontSize: 14
                  }
                }
              }
            },
            data: lineData
          }
        ]
      }
      myChartwo.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.registe-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  .form-wrap {
    width: 100%;
    margin: 10px 20px;
    padding: 10px 20px;
    background-color: #fff;
  }
  .radio-padding {
    width: 120px;
  }
  .colchart {
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
  .echartrend {
    .text {
      text-align: center;
      color: rgb(0, 0, 0);
      font-size: 16px;
      font-weight: 400;
      line-height: 14px;
      margin: 10px 0px;
    }
  }
  .tet {
    text-align: left !important;
  }
}
</style>
