<template>
  <el-dialog
    title="准考证详情"
    :visible.sync="dialogVisible"
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
      <el-button type="primary" icon="el-icon-download" @click="dialogVisible = true">下载本页</el-button>
      <el-button type="primary" icon="el-icon-printer" @click="dialogVisible = true">打印</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AdmissionCard',
  components: { },
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
      qrcodeUrl: require('@/assets/images/qrcode.png'),
      imageUrl: require('@/assets/images/photo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
    .card-wrap {
    .card-head {
      display: flex;
      padding-bottom: 20px;
      .right {
        padding-left:20px;
        line-height: 1.2;
        color: rgb(80, 80, 80);
        h2 {
          font-size: 30px;
          margin: 0;
        }
        p {
          font-size: 20px;
          font-weight: bold;
          margin: 10px 0;
        }
      }
    }
    .notice {
      text-align: left;
      padding:0 10px;
      line-height: 1.8;
    }
    .card-td-01 {
      width:120px;
    }
    .user-info {
      text-align: left;
      padding: 0 10px;
      .info-row {
        display: flex;
        .name {
          min-width: 80px;
          text-align: right;
        }
      }
    }
  }
</style>
