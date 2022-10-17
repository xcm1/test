<template>
  <el-dialog title="新建培训课程" custom-class="line-dialog" :visible.sync="dialogVisible.value" width="840px" @close="resetForm('form')">
    <div v-if="dialogVisibletwo.value==true" class="messagebox">
      <div class="icon">！</div>
      <div class="messtext">
        <div class="messtit">退回修改</div>
        <div class="messcont" v-html="dxPxkcShyy" />
      </div>
      <div class="del" @click="del()">×</div>
    </div>
    <div class="form-wrap myTable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <table class="customTable">
          <tr>
            <td class="td-width-01"><div>课程标题</div></td>
            <td colspan="5" class="td-width-auto">
              <div class="input">
                <el-input
                  v-model="ruleForm.courstitle"
                  placeholder="请输入"
                  clearable
                />
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>培训地址</div></td>
            <td colspan="5" class="td-width-auto">
              <div class="input">
                <el-input
                  v-model="ruleForm.trainingaddress"
                  placeholder="请输入"
                  clearable
                />
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>参与人数</div></td>
            <td colspan="2" class="td-width-auto">
              <div class="input">
                <el-input
                  v-model="ruleForm.participantsnum"
                  placeholder="请输入"
                  clearable
                  type="number"
                  min="1"
                />
              </div>
            </td>
            <td class="td-width-03"><div>获得学时</div></td>
            <td colspan="2" class="td-width-auto">
              <div class="input">
                <el-input
                  v-model="ruleForm.credithours"
                  placeholder="请输入"
                  clearable
                  type="number"
                  min="1"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>开始时间</div></td>
            <td colspan="2" class="td-width-auto">
              <div class="input">
                <el-date-picker
                  v-model="ruleForm.starttime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="选择日期时间"
                  :picker-options="startTimeOptions"
                  @focus="clickStartTime"
                />
              </div>
            </td>
            <td class="td-width-03"><div>结束时间</div></td>
            <td colspan="2" class="td-width-auto">
              <div class="input">
                <el-date-picker
                  v-model="ruleForm.endtime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="选择日期时间"
                  :picker-options="endTimeOptions"
                  @focus="clickEndTime"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>培训区域</div></td>
            <td colspan="5" class="td-width-auto te">
              <el-radio-group v-model="ruleForm.radio">
                <el-radio v-for="(item,index) in roleList" :key="index" :label="item.sysCourseLevelId" @change="handleridosChange(item.sysCourseLevelId)">{{ item.sysCourseLevelName }}</el-radio>
              </el-radio-group>
              <!-- <el-checkbox-group v-model="someList">
                <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.lable" @change="handleCheckedRolesChange(someList,item.id)">{{ item.lable }}
                </el-checkbox>
              </el-checkbox-group> -->
              <div v-if="checkshow" class="checkbox">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedRolesChanget">
                  <el-checkbox v-for="(item,index) in cities" :key="index" :label="item.sysRegionId">{{ item.sysRegionName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div>课程内容</div></td>
            <td colspan="5" class="td-width-auto">
              <div class="input">
                <tinymce ref="tinymce" v-model="ruleForm.contented" :height="200" />
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <el-button v-if="id === 3" class="savecl" type="success" icon="el-icon-tickets" @click="ditecourse()">创建课程</el-button>
    <el-button v-else class="savecl" type="success" icon="el-icon-tickets" @click="creatcourse()">创建课程</el-button>
  </el-dialog>
</template>

<script>
import { courseLevelList, quList, establish, update } from '@/api/train'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ComplexTable',
  components: { Tinymce },
  props: {
    dialogVisible: {
      type: Object,
      default() {
        return {
          value: false
        }
      }
    },
    dialogVisibletwo: {
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
    }
  },
  data() {
    return {
      dxPxkcShyy: '',
      someList: [],
      roleList: [],
      checkedCities: [],
      checklist: [],
      cities: [],
      checkbox: '',
      checkshow: false,
      ruleForm: {
        courstitle: '',
        trainingaddress: '',
        participantsnum: '',
        credithours: '',
        starttime: '',
        endtime: '',
        contented: '',
        radio: ''
      },
      startTimeOptions: {},
      endTimeOptions: {},
      rules: {},
      id: ''
    }
  },
  created() {
    // this.someList=[]
    // this.checkbox = 1
    this.sysRegionList()
    this.courseLevelList()
  },
  mounted() {
    this.$nextTick(function() {
      const that = this
      that.$on('childmethod', function() {
        that.$nextTick(function() {
          setTimeout(function() {
            that.resetdetail()
          }, 500)
        })
      })
    })
  },
  methods: {
    resetForm() {
      this.ruleForm.courstitle = ''
      this.ruleForm.endtime = ''
      this.ruleForm.contented = ''
      this.ruleForm.credithours = ''
      this.ruleForm.starttime = ''
      this.ruleForm.radio = ''
      this.checkedCities = []
      this.ruleForm.participantsnum = ''
      this.ruleForm.trainingaddress = ''
      this.checkshow = false
      this.id = ''
      this.$refs['tinymce'].setContent('')
    },
    resetdetail() {
      this.id = this.detail.stateId
      this.ruleForm.courstitle = this.detail.dxPxkcBt
      this.ruleForm.endtime = this.detail.dxPxkcJssj
      this.ruleForm.contented = this.detail.dxPxkcKcnr
      this.ruleForm.credithours = this.detail.dxPxkcKcxs
      this.ruleForm.starttime = this.detail.dxPxkcKssj
      this.ruleForm.radio = this.detail.dxPxkcPxjbId
      this.checkedCities = this.detail.quIds
      this.ruleForm.participantsnum = this.detail.dxPxkcZrs
      this.ruleForm.trainingaddress = this.detail.dxPxkcSkdz
      this.dxPxkcShyy = this.detail.dxPxkcShyy
      if (this.detail.dxPxkcPxjbId === 3) {
        this.checkshow = true
      }
      this.$refs['tinymce'].setContent(this.detail.dxPxkcKcnr)
    },
    clickStartTime() {
      this.startTimeOptions.disabledDate = time => {
        if (this.ruleForm.endtime) {
          if (time.getTime() > new Date(this.ruleForm.endtime).getTime()) {
            return true
          }
          if (time.getTime() < Date.now() - 8.64e7) {
            return true
          }
        } else {
          if (time.getTime() < Date.now() - 8.64e7) {
            return true
          }
        }
      }
    },
    clickEndTime() {
      this.endTimeOptions.disabledDate = time => {
        if (this.ruleForm.starttime) {
          return (
            time.getTime() > Date.now || time.getTime() < new Date(this.ruleForm.starttime).getTime()
          )
        } else {
          return time.getTime() < Date.now()
        }
      }
    },
    handleCheckedRolesChange(someList, id) {
      if (someList.length > 1) {
        const one = someList.splice(1)
        this.someList = one
        this.checkbox = id
      } else if (someList.length === 0) {
        this.checkbox = ''
      } else if (someList.length === 1) {
        this.checkbox = id
      }
      if (this.someList[0] === '联合体培训') {
        this.checkshow = true
      } else {
        this.checkshow = false
        this.checkedCities = []
      }
    },
    handleridosChange(val) {
      if (val === 3) {
        this.checkshow = true
      } else {
        this.checkshow = false
        this.checkedCities = []
      }
    },
    handleCheckedRolesChanget(id) {
    },
    del() {
      this.dialogVisibletwo.value = false
    },
    creatcourse() {
      if (this.ruleForm.courstitle === '') {
        this.$message.error('请填写课程标题')
        return
      } else if (this.ruleForm.trainingaddress === '') {
        this.$message.error('请填写培训地址')
        return
      } else if (this.ruleForm.participantsnum === '') {
        this.$message.error('请填写参与人数')
        return
      } else if (this.ruleForm.credithours === '') {
        this.$message.error('请填写获得学时')
        return
      } else if (this.ruleForm.starttime === '') {
        this.$message.error('请填写课程开始时间')
        return
      } else if (this.ruleForm.endtime === '') {
        this.$message.error('请填写课程结束时间')
        return
      } else if (this.ruleForm.radio === '') {
        this.$message.error('请选择培训区域')
        return
      } else if (this.ruleForm.radio === 3) {
        if (this.checkedCities.length === 0) {
          this.$message.error('请选择培训区域')
          return
        }
      } else if (this.ruleForm.contented === '') {
        this.$message.error('请填写课程内容')
        return
      }
      const params = {
        dxPxkcBt: this.ruleForm.courstitle,
        dxPxkcJssj: this.ruleForm.endtime,
        dxPxkcKcnr: this.ruleForm.contented,
        dxPxkcKcxs: this.ruleForm.credithours,
        dxPxkcKssj: this.ruleForm.starttime,
        dxPxkcPxjbId: this.ruleForm.radio,
        quList: this.checkedCities,
        dxPxkcZrs: this.ruleForm.participantsnum,
        dxPxkcSkdz: this.ruleForm.trainingaddress
      }
      this.listLoading = true
      establish(params).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('getData', '')
        this.dialogVisible.value = false
      })
    },
    ditecourse() {
      if (this.ruleForm.courstitle === '') {
        this.$message.error('请填写课程标题')
        return
      } else if (this.ruleForm.trainingaddress === '') {
        this.$message.error('请填写培训地址')
        return
      } else if (this.ruleForm.participantsnum === '') {
        this.$message.error('请填写参与人数')
        return
      } else if (this.ruleForm.credithours === '') {
        this.$message.error('请填写获得学时')
        return
      } else if (this.ruleForm.starttime === '') {
        this.$message.error('请填写课程开始时间')
        return
      } else if (this.ruleForm.endtime === '') {
        this.$message.error('请填写课程结束时间')
        return
      } else if (this.ruleForm.radio === '') {
        this.$message.error('请选择培训区域')
        return
      } else if (this.ruleForm.radio === 3) {
        if (this.checkedCities.length === 0) {
          this.$message.error('请选择培训区域')
          return
        }
      } else if (this.ruleForm.contented === '') {
        this.$message.error('请填写课程内容')
        return
      }
      const params = {
        dxPxkcBt: this.ruleForm.courstitle,
        dxPxkcJssj: this.ruleForm.endtime,
        dxPxkcKcnr: this.ruleForm.contented,
        dxPxkcKcxs: this.ruleForm.credithours,
        dxPxkcKssj: this.ruleForm.starttime,
        dxPxkcPxjbId: this.ruleForm.radio,
        quList: this.checkedCities,
        dxPxkcZrs: this.ruleForm.participantsnum,
        dxPxkcSkdz: this.ruleForm.trainingaddress,
        kcId: this.detail.id,
        stateId: this.id
      }
      this.listLoading = true
      update(params).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('getData', '')
        this.dialogVisible.value = false
      })
    },
    // 上海市所有区
    sysRegionList() {
      const params = {}
      quList(params).then(res => {
        this.cities = res.data
      })
    },
    courseLevelList() {
      const params = {}
      courseLevelList(params).then(res => {
        this.roleList = res.data
      })
    }
  }
}
</script>
<style>
.titler .el-input--medium .el-input__inner {
    height: 34px !important;
    line-height: 34px !important;
    position: absolute;
    left: 0px;
    top: -22px;
  }
</style>
<style lang="scss" scoped>
  .title {
    border-bottom: 1px solid rgb(223, 230, 236);
  }
  span {
    display: inline-block;
  }
  .titlel {
    width: 20%;
    border-right: 1px solid rgb(223, 230, 236);
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-weight: 700;
  }
  .titler {
    width: 80%;
    padding: 0px 10px;
    position: relative;
    font-weight: 700;
  }
  .titletwo {
    height: 226px;
    .titlel {
      width: 20%;
      border-right: 1px solid rgb(223, 230, 236);
      height: 226px;
      line-height: 226px;
      text-align: center;
    }
  }
  .messagebox {
    width: 100%;
    height: 76px;
    background: rgb(253, 226, 226);
    margin-bottom: 10px;
    position: relative;
    .icon {
      width: 28px;
      height: 28px;
      background: rgb(245, 108, 108);
      color: #fff;
      text-align: center;
      line-height: 28px;
      border-radius: 50%;
      font-size: 16px;
      padding-left: 8px;
      position: absolute;
      left: 20px;
      top: 24px;
    }
    .messtext {
      position: absolute;
      left: 60px;
      top: 16px;
    }
    .messtit {
      color: rgb(245, 108, 108);
      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
    }
    .messcont {
      color: rgb(245, 108, 108);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }
  .del {
    font-size: 24px;
    color: #000;
    position: absolute;
    top: 8px;
    right: 4px;
    cursor: pointer;
  }
  .savecl {
    margin-left: 360px;
    margin-top: 20px;
  }
  .myTable table.customTable .te {
    text-align: left;
    padding-left: 20px;
  }
  .checkbox {
    width: 400px;
    float: right;
  }
</style>
