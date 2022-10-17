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
                  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">区域</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in cities" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllt" :indeterminate="isIndeterminategender" @change="handleCheckAllChanget">性别</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedgender" @change="handleCheckedCitiesChanget">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in gender" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllh" :indeterminate="isIndeterminateeducation" @change="handleCheckAllChangeh">学历</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkededucation" @change="handleCheckedCitiesChangeh">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in education" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllf" :indeterminate="isIndeterminateage" @change="handleCheckAllChangef">年龄</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedeage" @change="handleCheckedCitiesChangef">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in age" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                      <el-checkbox :label="'100'" class="radio-padding">
                        <el-input v-model="input" clearable placeholder="请输入" type="number" min="1" />
                        <span> 至 </span>
                        <el-input v-model="input2" clearable placeholder="请输入" type="number" min="1" />
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllv" :indeterminate="isIndeterminatetitle" @change="handleCheckAllChangev">职称</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedetitle" @change="handleCheckedCitiesChangev">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in title" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAlls" :indeterminate="isIndeterminateorganization" @change="handleCheckAllChanges">编制</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedeorganization" @change="handleCheckedCitiesChanges">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in organization" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllg" :indeterminate="isIndeterminatehonor" @change="handleCheckAllChangeg">其他荣耀</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedehonor" @change="handleCheckedCitiesChangeg">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in honor" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAlli" :indeterminate="isIndeterminatenature" @change="handleCheckAllChangei">工作性质</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedenature" @change="handleCheckedCitiesChangei">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in nature" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllz" :indeterminate="isIndeterminatesuper" @change="handleCheckAllChangez">督学类别</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedesuper" @change="handleCheckedCitiesChangez">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in superr" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>

                  <!-- <el-checkbox-group v-model="checkedesuperchild" @change="handleCheckedCitiesChangezc">
                    <div style=" display: flex;flex-wrap: wrap;width:100px;margin-left: 174px;">
                      <el-checkbox v-for="city in superrchild" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group> -->
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllk" :indeterminate="isIndeterminatetration" @change="handleCheckAllChangek">管理类</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedetration" @change="handleCheckedCitiesChangek">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in tration" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAllm" :indeterminate="isIndeterminatesubject" @change="handleCheckAllChangem">学科类</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedesubject" @change="handleCheckedCitiesChangem">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in subject" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01">
                <div>
                  <el-checkbox v-model="checkAlln" :indeterminate="isIndeterminateguarantee" @change="handleCheckAllChangen">保障类</el-checkbox>
                </div>
              </td>
              <td colspan="7" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="checkedeguarantee" @change="handleCheckedCitiesChangen">
                    <div style=" display: flex;flex-wrap: wrap">
                      <el-checkbox v-for="city in guarantee" :key="city.id" :label="city.name" class="radio-padding">
                        {{ city.name }}
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="td-width-auto te">
                <div>
                  <el-button type="primary" icon="el-icon-pie-chart" @click="echartshow()">根据选择统计数据</el-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
    </div>
    <div>
      <el-dialog title="自定义统计详情" custom-class="line-dialog" :visible.sync="dialogVisiblefive" width="840px" @close="resetForm()">
        <div class="tablesolt">
          <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" :before-leave="beforeLeave" @tab-click="handleClick">
            <el-tab-pane label="图表" name="图表">
              <div v-if="diaList.length > 0" class="echartbox">
                <div class="echarttit">工作区域</div>
                <div ref="circhart" class="cirechart" />
              </div>
              <div v-if="diaListwo.length > 0" class="echartbox">
                <div class="echarttit">性别</div>
                <div ref="circhartwo" class="cirechart" />
              </div>
              <div v-if="educationt.length > 0" class="echartbox">
                <div class="echarttit">学历</div>
                <div ref="circhareducation" class="cirechart" />
              </div>
              <div v-if="aget.length > 0" class="echartbox">
                <div class="echarttit">年龄</div>
                <div ref="circharaget" class="cirechart" />
              </div>
              <div v-if="titlet.length > 0" class="echartbox">
                <div class="echarttit">职称</div>
                <div ref="circhartitlet" class="cirechart" />
              </div>
              <div v-if="organizationt.length > 0" class="echartbox">
                <div class="echarttit">编制</div>
                <div ref="circharorganizationt" class="cirechart" />
              </div>
              <div v-if="honort.length > 0" class="echartbox">
                <div class="echarttit">其他荣耀</div>
                <div ref="circharhonort" class="cirechart" />
              </div>
              <div v-if="naturet.length > 0" class="echartbox">
                <div class="echarttit">工作性质</div>
                <div ref="circharnaturet" class="cirechart" />
              </div>
              <div v-if="superrt.length > 0" class="echartbox">
                <div class="echarttit">督学类别</div>
                <div ref="circharsuperrt" class="cirechart" />
              </div>
              <div v-if="trationt.length > 0" class="echartbox">
                <div class="echarttit">管理类</div>
                <div ref="circhartrationt" class="cirechart" />
              </div>
              <div v-if="subjectw.length > 0" class="echartbox">
                <div class="echarttit">学科类</div>
                <div ref="circharsubjectw" class="cirechart" />
              </div>
              <div v-if="guaranteet.length > 0" class="echartbox">
                <div class="echarttit">保障类</div>
                <div ref="circharguaranteet" class="cirechart" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细数据" name="详细数据">
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
                <el-table-column label="ID" align="center" width="160px">
                  <template slot-scope="{row}">
                    <span>{{ row.sysUserId }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="{row}">
                    <span>{{ row.sysUserName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="性别" align="center">
                  <template slot-scope="{row}">
                    <span class="link-type">{{ row.sysUserSex }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="工作区域" class-name="status-col">
                  <template slot-scope="{row}">
                    <span>{{ row.sysRegionName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="督学类别" class-name="status-col">
                  <template slot-scope="{row}">
                    <span>{{ row.sysSupervisionClassName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="年龄" align="center">
                  <template slot-scope="{row}">
                    <span class="link-type">{{ row.sysUserAge }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane name="CustoBtn">
              <span slot="label">
                <div class="soltbtn">
                  <el-button class="slbt" type="primary" icon="el-icon-download">下载数据</el-button>
                </div>
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { listBox, statisticalDatah, categoryDistributionDetails } from '@/api/train'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import * as echarts from 'echarts'
export default {
  name: 'RegisteForm',
  components: { Pagination },
  data() {
    return {
      ageString: '',
      sumNumber: '',
      input: '',
      input2: '',
      checked: false,
      activeName: '图表',
      dialogVisiblefive: false,
      listLoading: true,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      checkAll: false,
      checkedCities: [],
      diaList: [
        {
          name: '松江区',
          value: 23000
        },
        {
          name: '闵行区',
          value: 73000
        },
        {
          name: '嘉定区',
          value: 17000
        },
        {
          name: '徐汇区',
          value: 33000
        },
        {
          name: '宝山区',
          value: 17000
        },
        {
          name: '虹口区',
          value: 17000
        },
        {
          name: '普陀区',
          value: 17000
        },
        {
          name: '静安区',
          value: 17000
        },
        {
          name: '长宁区',
          value: 17000
        },
        {
          name: '青浦区',
          value: 17000
        },
        {
          name: '崇明区',
          value: 17000
        },
        {
          name: '奉贤区',
          value: 17000
        }
      ],
      diaListwo: [
        {
          name: '男',
          value: 0
        },
        {
          name: '女',
          value: 0
        }
      ],
      educationt: [
        {
          name: '大专',
          value: 23000
        },
        {
          name: '本科',
          value: 7300
        },
        {
          name: '硕士',
          value: 7300
        },
        {
          name: '博士',
          value: 73000
        }
      ],
      aget: [
        {
          name: '30岁-40岁',
          value: 23000
        },
        {
          name: '41岁-50岁',
          value: 7300
        },
        {
          name: '51岁-60岁',
          value: 7300
        },
        {
          name: '61岁-70岁',
          value: 73000
        }
      ],
      titlet: [
        {
          name: '幼儿园高级',
          value: 23000
        },
        {
          name: '小学高级',
          value: 7300
        },
        {
          name: '中学中级',
          value: 7300
        },
        {
          name: '中学高级',
          value: 73000
        },
        {
          name: '副教授',
          value: 7300
        },
        {
          name: '教授',
          value: 7300
        }
      ],
      organizationt: [
        {
          name: '公务员编制',
          value: 23000
        },
        {
          name: '教师编制',
          value: 7300
        },
        {
          name: '其他事业单位编制',
          value: 7300
        },
        {
          name: '其他',
          value: 73000
        }
      ],
      honort: [
        {
          name: '特级教师',
          value: 23000
        },
        {
          name: '特级校（园）长',
          value: 7300
        }
      ],
      naturet: [
        {
          name: '在职',
          value: 23000
        },
        {
          name: '退休',
          value: 7300
        }
      ],
      trationt: [
        {
          name: '学前教育',
          value: 23000
        },
        {
          name: '中小学教育',
          value: 7300
        },
        {
          name: '职业教育',
          value: 7300
        },
        {
          name: '行政管理',
          value: 73000
        },
        {
          name: '其他',
          value: 7300
        }
      ],
      subjectw: [
        {
          name: '幼儿园',
          value: 23000
        },
        {
          name: '小学',
          value: 7300
        },
        {
          name: '初中',
          value: 7300
        },
        {
          name: '高中',
          value: 73000
        },
        {
          name: '其他',
          value: 7300
        }
      ],
      guaranteet: [
        {
          name: '财务管理',
          value: 23000
        },
        {
          name: '设施设备',
          value: 7300
        },
        {
          name: '管理',
          value: 7300
        },
        {
          name: '网络技术开发',
          value: 73000
        },
        {
          name: '审计',
          value: 7300
        }
      ],
      superrt: [
        {
          name: '专职',
          value: 23000
        },
        {
          name: '未聘任',
          value: 7300
        },
        {
          name: '市督学',
          value: 23000
        },
        {
          name: '国家督学',
          value: 7300
        },
        {
          name: '区兼职督学',
          value: 7300
        }
      ],
      cities: [
        { id: '1', label: '松江区' },
        { id: '2', label: '金山区' },
        { id: '3', label: '黄浦区' },
        { id: '4', label: '浦东新区' },
        { id: '5', label: '闵行区' },
        { id: '6', label: '嘉定区' },
        { id: '7', label: '徐汇区' },
        { id: '8', label: '宝山区' },
        { id: '9', label: '虹口区' },
        { id: '10', label: '普陀区' },
        { id: '11', label: '静安区' },
        { id: '12', label: '长宁区' },
        { id: '13', label: '青浦区' },
        { id: '14', label: '崇明区' },
        { id: '15', label: '奉贤区' }
      ],
      isIndeterminate: false,
      checkAllt: false,
      checkedgender: [],
      gender: [
        { id: '1', label: '男' },
        { id: '2', label: '女' }
      ],
      isIndeterminategender: false,
      checkAllh: false,
      checkededucation: [],
      education: [
        { id: '1', label: '大专' },
        { id: '2', label: '本科' },
        { id: '3', label: '硕士' },
        { id: '4', label: '博士' }
      ],
      isIndeterminateeducation: false,
      checkAllf: false,
      checkedeage: [],
      age: [
        { id: '1', label: '30岁-40岁' },
        { id: '2', label: '41岁-50岁' },
        { id: '3', label: '51岁-60岁' },
        { id: '4', label: '61岁-70岁' }
      ],
      isIndeterminateage: false,
      checkAllv: false,
      checkedetitle: [],
      title: [
        { id: '1', label: '幼儿园高级' },
        { id: '2', label: '小学高级' },
        { id: '3', label: '中学中级' },
        { id: '4', label: '中学高级' },
        { id: '5', label: '副教授' },
        { id: '6', label: '教授' }
      ],
      isIndeterminatetitle: false,
      checkAlls: false,
      checkedeorganization: [],
      organization: [
        { id: '1', label: '公务员编制' },
        { id: '2', label: '教师编制' },
        { id: '3', label: '其他事业单位编制' },
        { id: '4', label: '其他' }
      ],
      isIndeterminateorganization: false,
      checkAllg: false,
      checkedehonor: [],
      honor: [
        { id: '1', label: '特级教师' },
        { id: '2', label: '特级校（园）长' }
      ],
      isIndeterminatehonor: false,
      checkAlli: false,
      checkedenature: [],
      nature: [
        { id: '1', label: '在职' },
        { id: '2', label: '退休' }
      ],
      isIndeterminatenature: false,
      checkAllk: false,
      checkedetration: [],
      tration: [
        { id: '1', label: '学前教育' },
        { id: '2', label: '中小学教育' },
        { id: '3', label: '职业教育' },
        { id: '5', label: '行政管理' },
        { id: '4', label: '其他' }
      ],
      isIndeterminatetration: false,
      checkAllm: false,
      checkedesubject: [],
      subject: [
        { id: '1', label: '幼儿园' },
        { id: '2', label: '小学' },
        { id: '3', label: '初中' },
        { id: '5', label: '高中' },
        { id: '4', label: '其他' }
      ],
      isIndeterminatesubject: false,
      checkAlln: false,
      checkedeguarantee: [],
      guarantee: [
        { id: '1', label: '财务管理' },
        { id: '2', label: '设施设备' },
        { id: '3', label: '管理' },
        { id: '5', label: '网络技术开发' },
        { id: '4', label: '审计' }
      ],
      isIndeterminateguarantee: false,
      checkAllz: false,
      checkedesuper: [],
      superr: [
        { id: '1', label: '专职' },
        { id: '2', label: '兼职' },
        { id: '3', label: '未聘任' }
      ],
      isIndeterminatesuper: false,
      checkedesuperchild: [],
      superrchild: [
        { id: '4', name: '市督学' },
        { id: '5', name: '国家督学' },
        { id: '6', name: '区兼职督学' }
      ]
    }
  },
  created() {
    // this.getList()
    this.listBox()
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.activeName = '图表'
    },
    echartshow() {
      this.statisticalDatah()
    },
    statisticalDatah() {
      this.ageString = ''
      if (this.checkedeage.indexOf('100') !== -1) {
        if (this.input === '' || this.input2 === '') {
          this.$message({
            message: '请填写自定义年龄',
            type: 'warning'
          })
          return
        } else {
          this.ageString = this.input + '-' + this.input2 + '岁'
        }
      } else {
        this.ageString = ''
      }
      this.dialogVisiblefive = true
      const params = {
        age: this.checkedeage, // 年龄名称列表
        ageString: this.ageString, // 年龄自定义范围名称
        compiling: this.checkedeorganization, // 编制名称列表
        district: this.checkedCities, // 区域名称列表
        education: this.checkededucation, // 学历名称列表
        elseHonors: this.checkedehonor, // 其他荣誉名称列表
        jobNature: this.checkedenature, // 工作性质名称列表
        jobTitle: this.checkedetitle, // 职称名称列表
        managementClass: this.checkedetration, // 管理类名称列表
        safeguardClass: this.checkedeguarantee, // 保障类名称列表
        sex: this.checkedgender, // 性别名称列表
        speciality: this.checkedesuper, // 督学类别名称列表
        subjectClass: this.checkedesubject // 学科类名称列表
      }
      statisticalDatah(params).then(res => {
        this.sumNumber = res.data.sumNumber.toString()
        this.aget = res.data.age
        this.$nextTick(() => {
          if (this.diaList.length > 0) {
            this.circularChart()
          }
          if (this.diaListwo.length > 0) {
            this.circularChartwo()
          }
          if (this.educationt.length > 0) {
            this.charcirchareducation()
          }
          if (this.aget.length > 0) {
            this.charcirchareaget()
          }
          if (this.titlet.length > 0) {
            this.charcircharetitlet()
          }
          if (this.organizationt.length > 0) {
            this.charcirchareorganizationt()
          }
          if (this.honort.length > 0) {
            this.charcircharehonort()
          }
          if (this.naturet.length > 0) {
            this.charcircharenaturet()
          }
          if (this.superrt.length > 0) {
            this.charcircharesuperrt()
          }
          if (this.trationt.length > 0) {
            this.charcircharetrationt()
          }
          if (this.subjectw.length > 0) {
            this.charcircharesubjectw()
          }
          if (this.guaranteet.length > 0) {
            this.charcirchareguaranteet()
          }
        })
        // this.list = res.data.items
      })
    },

    handleClick(tab, event) {
      this.listQuery.page = 1
      if (tab.name === '详细数据') {
        this.getList()
      }
    },
    getList() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listLoading = true
      categoryDistributionDetails(params.page, params.limit).then(res => {
        this.list = res.data.records
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    listBox() {
      const params = {}
      listBox(params).then(res => {
        this.cities = res.data.district
        this.gender = res.data.sex
        this.education = res.data.education
        this.age = res.data.age
        this.title = res.data.jobTitle
        this.organization = res.data.compiling
        this.honor = res.data.elseHonors
        this.nature = res.data.jobNature
        this.tration = res.data.managementClass
        this.subject = res.data.subjectClass
        this.guarantee = res.data.safeguardClass
        this.superr = res.data.speciality
      })
    },
    beforeLeave(visitName, currentName) {
      if (visitName === 'CustoBtn') {
        return false
      }
    },
    handleCheckAllChange(val) {
      console.log(val)
      const allist = []
      this.cities.map((item) => {
        allist.push(item.name)
      })
      this.checkedCities = val ? allist : []
      this.isIndeterminate = false
      console.log(this.checkedCities)
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.checkedCities)
    },
    handleCheckAllChanget(val) {
      console.log(val)
      const allist = []
      this.gender.map((item) => {
        allist.push(item.name)
      })
      this.checkedgender = val ? allist : []
      this.isIndeterminategender = false
    },
    handleCheckedCitiesChanget(value) {
      const checkedCount = value.length
      this.checkAllt = checkedCount === this.gender.length
      this.isIndeterminategender = checkedCount > 0 && checkedCount < this.gender.length
    },
    handleCheckAllChangeh(val) {
      console.log(val)
      const allist = []
      this.education.map((item) => {
        allist.push(item.name)
      })
      this.checkededucation = val ? allist : []
      this.isIndeterminateeducation = false
    },
    handleCheckedCitiesChangeh(value) {
      const checkedCount = value.length
      this.checkAllh = checkedCount === this.education.length
      this.isIndeterminateeducation = checkedCount > 0 && checkedCount < this.education.length
    },
    handleCheckAllChangef(val) {
      console.log(val)
      const allist = []
      this.age.map((item) => {
        allist.push(item.name)
      })
      allist.push('100')
      this.checkedeage = val ? allist : []
      this.isIndeterminateage = false
      console.log(this.checkedeage)
    },
    handleCheckedCitiesChangef(value) {
      const checkedCount = value.length
      this.checkAllf = checkedCount === this.age.length + 1
      this.isIndeterminateage = checkedCount > 0 && checkedCount < this.age.length + 1
    },
    handleCheckAllChangev(val) {
      console.log(val)
      const allist = []
      this.title.map((item) => {
        allist.push(item.name)
      })
      this.checkedetitle = val ? allist : []
      this.isIndeterminatetitle = false
    },
    handleCheckedCitiesChangev(value) {
      const checkedCount = value.length
      this.checkAllv = checkedCount === this.title.length
      this.isIndeterminatetitle = checkedCount > 0 && checkedCount < this.title.length
    },
    handleCheckAllChanges(val) {
      console.log(val)
      const allist = []
      this.organization.map((item) => {
        allist.push(item.name)
      })
      this.checkedeorganization = val ? allist : []
      this.isIndeterminateorganization = false
    },
    handleCheckedCitiesChanges(value) {
      const checkedCount = value.length
      this.checkAlls = checkedCount === this.organization.length
      this.isIndeterminateorganization = checkedCount > 0 && checkedCount < this.organization.length
    },
    handleCheckAllChangeg(val) {
      console.log(val)
      const allist = []
      this.honor.map((item) => {
        allist.push(item.name)
      })
      this.checkedehonor = val ? allist : []
      this.isIndeterminatehonor = false
    },
    handleCheckedCitiesChangeg(value) {
      const checkedCount = value.length
      this.checkAllg = checkedCount === this.honor.length
      this.isIndeterminatehonor = checkedCount > 0 && checkedCount < this.honor.length
    },
    handleCheckAllChangei(val) {
      console.log(val)
      const allist = []
      this.nature.map((item) => {
        allist.push(item.name)
      })
      this.checkedenature = val ? allist : []
      this.isIndeterminatenature = false
    },
    handleCheckedCitiesChangei(value) {
      const checkedCount = value.length
      this.checkAllg = checkedCount === this.nature.length
      this.isIndeterminatenature = checkedCount > 0 && checkedCount < this.nature.length
    },
    handleCheckAllChangek(val) {
      console.log(val)
      const allist = []
      this.tration.map((item) => {
        allist.push(item.name)
      })
      this.checkedetration = val ? allist : []
      this.isIndeterminatetration = false
    },
    handleCheckedCitiesChangek(value) {
      const checkedCount = value.length
      this.checkAllg = checkedCount === this.tration.length
      this.isIndeterminatetration = checkedCount > 0 && checkedCount < this.tration.length
    },
    handleCheckAllChangem(val) {
      console.log(val)
      const allist = []
      this.subject.map((item) => {
        allist.push(item.name)
      })
      this.checkedesubject = val ? allist : []
      this.isIndeterminatesubject = false
    },
    handleCheckedCitiesChangem(value) {
      console.log(value)
      const checkedCount = value.length
      this.checkAllm = checkedCount === this.subject.length
      this.isIndeterminatesubject = checkedCount > 0 && checkedCount < this.subject.length
    },
    handleCheckAllChangen(val) {
      console.log(val)
      const allist = []
      this.guarantee.map((item) => {
        allist.push(item.name)
      })
      this.checkedeguarantee = val ? allist : []
      this.isIndeterminateguarantee = false
    },
    handleCheckedCitiesChangen(value) {
      const checkedCount = value.length
      this.checkAlln = checkedCount === this.guarantee.length
      this.isIndeterminateguarantee = checkedCount > 0 && checkedCount < this.guarantee.length
    },
    handleCheckAllChangez(val) {
      const allist = []
      const allistwo = []
      this.superr.map((item) => {
        allist.push(item.name)
      })
      this.superrchild.map((item) => {
        allistwo.push(item.name)
      })
      this.checkedesuper = val ? allist : []
      this.checkedesuperchild = val ? allistwo : []
      this.isIndeterminatesuper = false
    },
    handleCheckedCitiesChangez(value) {
      console.log(value)
      if (value.includes('兼职') && this.checkedesuperchild.length === 0) {
        this.superrchild.map((item) => {
          this.checkedesuperchild.push(item.name)
        })
      } else if (value.includes('兼职') === false) {
        this.checkedesuperchild = []
      }
      const checkedCount = value.length
      this.checkAllz = checkedCount === this.superr.length
      this.isIndeterminatesuper = checkedCount > 0 && checkedCount < this.superr.length
      console.log(this.checkedesuper)
      console.log(this.checkedesuperchild)
    },
    handleCheckedCitiesChangezc(value) {
      if (value.length > 0 && this.checkedesuper.includes('兼职') === false) {
        this.checkedesuper.push('兼职')
      } else if (value.length === 0) {
        this.checkedesuper = this.checkedesuper.filter(item => item !== '兼职')
      }
      if (this.checkedesuper.length === 3 && this.checkedesuperchild.length === 3) {
        this.checkAllz = true
        this.isIndeterminatesuper = false
      } else {
        this.checkAllz = false
        this.isIndeterminatesuper = true
      }
    },
    circularChart() {
      this.$refs.circhart.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhart)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: this.sumNumber,
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                // formatter: `<div>123</div>`,
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
    },
    charcirchareducation() {
      this.$refs.circhareducation.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhareducation)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.educationt,
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
    charcirchareaget() {
      this.$refs.circharaget.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharaget)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.aget,
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
    charcircharetitlet() {
      this.$refs.circhartitlet.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhartitlet)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.titlet,
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
    charcirchareorganizationt() {
      this.$refs.circharorganizationt.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharorganizationt)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.organizationt,
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
    charcircharehonort() {
      this.$refs.circharhonort.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharhonort)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.honort,
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
    charcircharenaturet() {
      this.$refs.circharnaturet.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharnaturet)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.naturet,
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
    charcircharesuperrt() {
      this.$refs.circharsuperrt.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharsuperrt)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.superrt,
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
    charcircharetrationt() {
      this.$refs.circhartrationt.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circhartrationt)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.trationt,
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
    charcircharesubjectw() {
      this.$refs.circharsubjectw.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharsubjectw)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.subjectw,
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
    charcirchareguaranteet() {
      this.$refs.circharguaranteet.setAttribute('_echarts_instance_', '')
      const myChart = echarts.init(this.$refs.circharguaranteet)
      const option = {
        title: {
          show: true,
          text: '总计',
          subtext: '400',
          top: 185,
          left: 375,
          textAlign: 'center',
          z: 0,
          textStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          },
          subtextStyle: {
            fontSize: '26',
            fontWeight: 'bold',
            color: 'rgb(110, 110, 110)'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              normal: {
                formatter: '{aa|{c}}',
                rich: {
                  aa: {
                    color: 'rgba(0, 0, 0, 0.65)',
                    padding: [2, 0],
                    fontSize: 16
                  }
                }
              }
            },
            center: ['63%', '50%'],
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
            data: this.guaranteet,
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
<style>
  .tablesolt .el-tabs__item {
    height: 50px !important;
    line-height: 50px !important;
  }
</style>
<style lang="scss" scoped>
.registe-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  background: #fff;
  min-height: calc(100vh - 84px);
  .form-wrap {
    width: 100%;
    margin: 10px 20px;
    padding: 10px 20px;
    background-color: #fff;
  }
  .radio-padding {
    width: 120px;
    line-height: 36px;
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
  .soltbtn {
    margin-left: 450px;
  }
  .pagination-container {
    padding:0 !important;
    margin-top: 16px !important;
  }
  .cirechart {
    width: 600px;
    height: 430px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
  }
  .echartbox {
    border: 1px solid rgb(223, 230, 236);;
  }
  .echarttit {
    width: 100%;
    height: 40px;
    background:rgb(231, 236, 241);
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: rgb(110, 110, 110);
  }
</style>
