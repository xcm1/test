<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      :data="list"
      border
      :header-cell-style="{
        'background': 'rgb(249, 249, 249)',
        border: '1px solid rgb(234, 234, 234)'
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训课程名称" align="center" width="360px">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcBt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quNames }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.jbName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除理由" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcScyy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除人" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.dxPxkcScrName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span class="look" @click="handleUpdate(row)">
            查看信息
          </span>
          <span class="recovery" @click="recovery(row.id)">恢复</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-checkbox v-model="checked" @change="changecheck">选择全部</el-checkbox>
      <el-button type="primary" style="margin-left:14px" @click="recoveryall()"><i class="el-icon-document-checked" /> 恢复</el-button>
    </div>
    <Recyclingcourses :dialog-visible="dialogVisible" :detail="detail" />
  </div>
</template>

<script>
import { recoverCourse, recoverBathCourse } from '@/api/train'
import Recyclingcourses from '@/components/recyTable/recyclingCourses.vue'
export default {
  name: 'ComplexTable',
  components: { Recyclingcourses },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      multipleSelection: [],
      checked: false,
      dialogVisible: {
        value: false
      },
      detail: {}
    }
  },
  created() {
  },
  methods: {
    handleUpdate(row) {
      this.dialogVisible.value = true
      this.detail = row
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.map((item) => {
        this.multipleSelection.push(item.id)
      })
    },
    clear() {
      this.checked = false
      this.$refs.multipleTable.clearSelection()
    },
    changecheck(val) {
      if (val) {
        this.$refs.multipleTable.toggleAllSelection()
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    recovery(id) {
      this.$confirm('确定恢复?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.recoverCourse(id)
        })
        .catch(() => {
        })
    },
    recoverCourse(id) {
      recoverCourse(id).then(res => {
        this.$message({
          message: '恢复成功',
          type: 'success'
        })
        this.$emit('getDatat', '')
      })
    },
    recoveryall(id) {
      this.$confirm('确定恢复?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.recoverBathCourse()
        })
        .catch(() => {
        })
    },
    recoverBathCourse() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要恢复的课程',
          type: 'success'
        })
        return
      }
      const params = {
        integers: this.multipleSelection
      }
      recoverBathCourse(params).then(res => {
        this.$message({
          message: '批量恢复成功',
          type: 'success'
        })
        this.checked = false
        this.$refs.multipleTable.clearSelection()
        this.$emit('getDatat', '')
      })
    },
    updateData() {}
  }
}
</script>
<style lang="scss" scoped>
  .look {
    color: rgb(24, 144, 255);
    font-size: 14px;
    cursor: pointer;
  }
  .recovery {
    color: rgb(255, 0, 0);
    font-size: 14px;
    cursor: pointer;
  }
</style>
