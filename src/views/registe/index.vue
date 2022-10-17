<template>
  <div class="app-container page-container">
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    <div class="top-head">
      <el-steps :active="state" align-center process-status="wait">
        <el-step title="信息注册" />
        <el-step title="等待初审" />
        <el-step title="考核面试" />
        <el-step title="等待复审" />
        <el-step title="完成" />
      </el-steps>
      <div>
        <!--提交成功-->
        <div v-if="state === 2" class="my-tips-wrap">
          <div class="icon success"><i class="el-icon-success" /></div>
          <div class="title">提交成功</div>
          <div class="sub-title">您的信息已经提交完成，请您耐心等待。</div>
        </div>
        <!--end 提交成功-->
        <!--不通过-->
        <div v-if="state === 2" class="my-tips-wrap">
          <div class="icon error"><i class="el-icon-error" /></div>
          <div class="title">不通过</div>
          <div class="sub-title">您提交的信息没有通过审核。</div>
        </div>
        <!--end 不通过-->
        <!--考核面试-->
        <div v-if="state === 3" class="my-tips-wrap">
          <div class="icon"><svg-icon icon-class="card" class-name="card-size" /></div>
          <div class="title">考核面试</div>
          <div class="sub-title">您的准考证正在生成中，请您耐心等待。</div>
          <div class="sub-title">您的准考证已经生成，请点击 <el-link type="primary" style="font-size:16px" @click="viewCard">查看准考证</el-link> ，下载或打印。</div>
        </div>
        <!--end 考核面试-->
        <!--等待复审-->
        <div v-if="state === 4" class="my-tips-wrap">
          <div class="icon warning"><i class="el-icon-warning" /></div>
          <div class="title">等待复审</div>
          <div class="sub-title">您参与的开合面试已经通过，请等到中心复审。</div>
        </div>
        <!--end 等待复审-->
      </div>
    </div>
    <div v-if="state === 1" class="registe-wrap">
      <RegisteForm />
    </div>
    <!-- <el-dialog
      title="准考证详情"
      :visible.sync="cardDialogVisible"
      width="500px"
      custom-class="line-dialog"
    >
      <div class="card-wrap">
        <div class="card-head">
          <div class="qrcode">
            <el-image
              style="width: 80px; height: auto"
              :src="qrcodeUrl"
              fit="fill"
            />
          </div>
          <div class="right">
            <h2>准考证</h2>
            <p>2022年上海市督学资格考试（面试）</p>
          </div>
        </div>
        <div class="myTable">
          <table class="customTable" style="margin-bottom:0">
            <tbody>
              <tr>
                <td class="card-td-01" style="padding:0; font-size: 0;">
                  <el-image
                    style="width: 120px; height: auto"
                    :src="imageUrl"
                    fit="fill"
                  />
                </td>
                <td>
                  <div class="user-info">
                    <div class="info-row">
                      <div class="name">姓 名：</div>
                      <div class="info">胡才</div>
                    </div>
                    <div class="info-row">
                      <div class="name">准考证号：</div>
                      <div class="info">2022837</div>
                    </div>
                    <div class="info-row">
                      <div class="name">考 场  号：</div>
                      <div class="info">第一考场</div>
                    </div>
                    <div class="info-row">
                      <div class="name">报到时间：</div>
                      <div class="info">2022年9月20日</div>
                    </div>
                    <div class="info-row">
                      <div class="name">报到地点：</div>
                      <div class="info">上海市督导事务中心2号楼504室</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="notice">
                    考生须知：<br>
                    1.考生须携带准考证和居民身份证。<br>
                    2.考试迟到30分钟将被取消面试资格。<br>
                    3.面试时间为每人8分钟。<br>
                    4.请严格按照遵守考场记录，自觉配合考务人员的工作。<br>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" icon="el-icon-download" @click="cardDialogVisible = true">下载本页</el-button>
        <el-button type="primary" icon="el-icon-printer" @click="cardDialogVisible = true">打印</el-button>
      </div>
    </el-dialog> -->
    <admission-card ref="admissionCardDialog" />
  </div>
</template>

<script>
import { apiApprovalProcess } from '@/api/registe'
import RegisteForm from './components/registeForm.vue'
import AdmissionCard from '../components/admission-card.vue'
export default {
  name: 'Information',
  components: { RegisteForm, AdmissionCard },
  data() {
    return {
      info: {},
      state: 1,
      cardDialogVisible: false,
      qrcodeUrl: require('@/assets/images/qrcode.png'),
      imageUrl: require('@/assets/images/photo.png')
    }
  },
  created() {
    this.getApprovalProcess()
  },
  methods: {
    // 审批流程
    getApprovalProcess() {
      apiApprovalProcess().then(res => {
        console.log(res, '审批流程')
      })
    },
    next() {
      if (this.state++ > 4) this.state = 1
    },
    viewCard() {
      this.$refs.admissionCardDialog.dialogVisible = true
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  .top-head {
    width:100%;
    background-color: #fff;
    padding: 40px 20px;
  }
  // .card-wrap {
  //   .card-head {
  //     display: flex;
  //     padding-bottom: 20px;
  //     .right {
  //       padding-left:20px;
  //       line-height: 1.2;
  //       color: rgb(80, 80, 80);
  //       h2 {
  //         font-size: 30px;
  //         margin: 0;
  //       }
  //       p {
  //         font-size: 20px;
  //         font-weight: bold;
  //         margin: 10px 0;
  //       }
  //     }
  //   }
  //   .notice {
  //     text-align: left;
  //     padding:0 10px;
  //     line-height: 1.8;
  //   }
  //   .card-td-01 {
  //     width:120px;
  //   }
  //   .user-info {
  //     text-align: left;
  //     padding: 0 10px;
  //     .info-row {
  //       display: flex;
  //       .name {
  //         min-width: 80px;
  //         text-align: right;
  //       }
  //     }
  //   }
  // }
  .registe-wrap {
    margin:10px 20px;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
