<template>
  <el-dialog title="课程信息" custom-class="line-dialog" :visible.sync="dialogVisible.value" width="840px">
    <div class="form-wrap myTable">
      <el-form ref="ruleForm">
        <table class="customTable">
          <tr>
            <td class="td-width-01"><div class="delte">删除人</div></td>
            <td colspan="5" class="td-width-auto">
              <div class="input">
                {{ detail.dxPxkcScrName }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="td-width-01"><div class="delte">删除理由</div></td>
            <td colspan="5" class="td-width-auto">
              <div class="input">
                {{ detail.dxPxkcScyy }}
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <div class="form-wrap myTable">
      <el-form ref="ruleForm">
        <table class="customTable">
          <tr>
            <td colspan="5" class="td-width-01 te"><div class="heiwidth">{{ detail.dxPxkcBt }}</div></td>
            <td class="td-width-auto">
              <div class="delbtn">
                已删除
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
                {{ detail.jbName }}
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
  </el-dialog>
</template>

<script>
export default {
  name: 'ComplexTable',
  components: { },
  props: {
    dialogVisible: {
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
    return {}
  },
  created() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .myTable table.customTable .te {
    text-align: left;
    padding-left: 20px;
  }
  .checkbox {
    width: 400px;
    float: right;
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
</style>
