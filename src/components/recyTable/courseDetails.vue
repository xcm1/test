<template>
  <el-dialog title="课程信1息" custom-class="line-dialog" :visible.sync="dialogVisiblethree.value" width="840px" @close="resetForm()">
    <div v-if="dialogVisiblefour.value==true" class="messagebox">
      <div class="icon">！</div>
      <div class="messtext">
        <div class="messtit">不通过</div>
        <div class="messcont" v-html="detail.dxPxkcShyy" />
      </div>
      <div class="del" @click="del()">×</div>
    </div>
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
    <div v-if="detail.stateId ===1" class="richbox">
      <div class="richhead">
        <span class="richtit">审核意见</span>
        <span class="richcont">不通过或退回修改必须填写审核意见</span>
      </div>
      <div>
        <tinymce ref="tinymce" v-model="contented" :height="200" />
      </div>
    </div>
    <el-row>
      <el-button v-if="detail.stateId ===1" class="savecl savete" type="success" icon="el-icon-document-checked" @click="adopt()">确认通过</el-button>
      <el-button v-if="detail.stateId ===1" class="savecl" type="warning" icon="el-icon-delete" @click="fail()">不通过</el-button>
      <el-button v-if="detail.stateId ===1" class="savecl" type="danger" icon="el-icon-document" @click="modification()">退回修改</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { pass, noPass, returnToModify } from '@/api/train'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ComplexTable',
  components: { Tinymce },
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
    }
  },
  props: {
    dialogVisiblethree: {
      type: Object,
      default() {
        return {
          value: false
        }
      }
    },
    dialogVisiblefour: {
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
      contented: ''
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(function() {
      this.$on('childthod', function() {
        this.$nextTick(function() {
          this.tinymceclear()
        })
      })
    })
  },
  methods: {
    resetForm() {
      this.$refs['tinymce'].setContent('')
    },
    tinymceclear() {
      this.$refs['tinymce'].setContent('')
    },
    del() {
      this.dialogVisiblefour.value = false
    },
    adopt() {
      const params = {
        kcId: this.detail.id,
        remark: this.contented
      }
      pass(params).then(res => {
        this.$message({
          message: '审核成功',
          type: 'success'
        })
        this.$emit('getData', '')
        this.dialogVisiblethree.value = false
      })
    },
    fail() {
      if (this.contented === '') {
        this.$message.error('请填写审核意见')
        return
      }
      const params = {
        kcId: this.detail.id,
        remark: this.contented
      }
      noPass(params).then(res => {
        this.$message({
          message: '审核成功',
          type: 'success'
        })
        this.$emit('getData', '')
        this.dialogVisiblethree.value = false
      })
    },
    modification() {
      if (this.contented === '') {
        this.$message.error('请填写审核意见')
        return
      }
      const params = {
        kcId: this.detail.id,
        remark: this.contented
      }
      returnToModify(params).then(res => {
        this.$message({
          message: '审核成功',
          type: 'success'
        })
        this.$emit('getData', '')
        this.dialogVisiblethree.value = false
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
    // margin-left: 360px;
    // margin-top: 20px;
  }
  .savete {
    margin-left: 190px;
    margin-top: 20px;
  }
  .richhead {
    margin-bottom: 20px;
  }
  .richbox {
    padding-top: 20px;
    border-top: 1px solid rgb(223, 230, 236);
    margin-top: 26px;
  }
  .richtit {
    color: rgb(110, 110, 110);
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
  }
  .richcont {
    color: rgb(110, 110, 110);
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin-left: 20px;
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
    background: rgb(255, 237, 237);
    border: 1px solid rgb(255, 219, 219);
    border-radius: 4px;
    color: rgb(255, 73, 73);
    margin: 0 30px;
  }
  .heiwidth {
    font-size: 14px;
    font-weight: 700 !important;
  }
  .tet {
    .text {
      color: rgb(110, 110, 110);
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
    }
  }
</style>
