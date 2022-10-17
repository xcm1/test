<template>
  <div>
    <el-dialog
      title="信息详情"
      :visible.sync="dialogVisible"
      width="940px"
      custom-class="line-dialog"
    >
      <div class="dialog-wrap">
        <!-- <div v-if="false"><information-details /></div> -->
        <!--初审-->
        <div v-if="category === '3' || category === '4' || category === '5'"><InformationDetailsFirst /></div>
        <!--复审-->
        <div v-if="category === '6'"><InformationDetailsSecond /></div>
        <div v-if="category === '6'">
          <div class="other-title">其它数据</div>
          <div class="myTable">
            <table class="customTable" style="margin-bottom:0">
              <tbody>
                <tr>
                  <td>
                    <div class="title">笔试成绩</div>
                  </td>
                  <td>
                    435332
                  </td>
                  <td>
                    <el-link type="primary" style="font-size:14px" @click="viewCard">查看准考证</el-link>
                  </td>
                  <td>
                    <div class="title">面试成绩</div>
                  </td>
                  <td>
                    A
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="title">培训次数（场）</div>
                  </td>
                  <td colspan="2">
                    12
                  </td>
                  <td>
                    <div class="title">培训学时</div>
                  </td>
                  <td>
                    212
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button v-if="category === '3'" type="success" icon="el-icon-check" @click="dialogVisible = true">通过初审</el-button>
        <el-button v-if="category === '6'" type="success" icon="el-icon-check" @click="dialogVisible = true">通过复审</el-button>
        <el-button v-if="category === '3' || category === '6'" type="danger" icon="el-icon-back" @click="dialogVisible = true">退回修改</el-button>
        <el-button v-if="category === '3'" type="danger" icon="el-icon-close" @click="dialogVisible = true">不通过</el-button>
        <el-button type="primary" icon="el-icon-download" @click="dialogVisible = true">下载本页</el-button>
        <el-button type="primary" icon="el-icon-printer" @click="dialogVisible = true">打印</el-button>
      </div>

    </el-dialog>
    <admission-card ref="admissionCardDialog" />
  </div>
</template>

<script>
// import InformationDetails from '../components/information-details.vue'
import InformationDetailsFirst from '../../components/information-details-first.vue'
import InformationDetailsSecond from '../../components/information-details-second.vue'
import AdmissionCard from '../../components/admission-card.vue'
export default {
  name: 'InforView',
  components: { InformationDetailsFirst, InformationDetailsSecond, AdmissionCard },
  props: {
    details: {
      type: Object,
      default: function() {
        return {
        }
      }
    }
  },
  data() {
    return {
      info: '',
      dialogVisible: false,
      category: '' // 类别
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        console.log(this.details, 'row')
        this.category = String(this.details.userCategoryId)
      }
    }
  },
  methods: {
    viewCard() {
      this.$refs.admissionCardDialog.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
    .other-title {
        font-weight: bold;
        padding-bottom: 10px;
    }
</style>
