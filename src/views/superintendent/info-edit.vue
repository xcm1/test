<template>
  <div>
    <el-dialog
      title="信息编辑"
      :visible.sync="dialogVisible"
      width="940px"
      custom-class="line-dialog"
    >
      <div class="dialog-wrap">
        <div><RegisteForm /></div>
      </div>
      <!-- <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" icon="el-icon-download" @click="dialogVisible = true">下载本页</el-button>
        <el-button type="primary" icon="el-icon-printer" @click="dialogVisible = true">打印</el-button>
      </div> -->

    </el-dialog>
  </div>
</template>

<script>
import RegisteForm from '../registe/components/registeForm.vue'
export default {
  name: 'InfoEdit',
  components: { RegisteForm },
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
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
