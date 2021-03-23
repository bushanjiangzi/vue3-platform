<template>
  <div class="about">
    <!-- 表单 -->
    <h3>表单</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <h3>表格</h3>
    <el-table
      :data="tableData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 轮播图 -->
    <h3>轮播图</h3>
    <div class="block">
      <span class="demonstration">默认 Hover 指示器触发</span>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 步骤条 -->
    <h3>步骤条</h3>
    <el-steps :active="1">
      <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 3" description="这段就没那么长了"></el-step>
    </el-steps>
    <!-- Dialog -->
    <h3>Dialog</h3>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 树组件 -->
    <h3>树组件</h3>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="treeRef"
    ></el-tree>
    <!-- 消息 -->
    <h3>消息</h3>
    <el-button :plain="true" @click="openMessage">成功</el-button>
    <!-- tab栏 -->
    <h3>tab栏</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
    <!-- 下拉框 -->
    <h3>下拉框</h3>
    <el-select v-model="sletctValue" clearable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <!-- 文件上传 -->
    <h3>文件上传</h3>
    <el-upload
      class="upload-demo"
      ref="uploadTree"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <!-- 穿梭器 -->
    <el-transfer
      v-model="transferValue"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      :data="transferData"
    />
  </div>
</template>

<script>
import { reactive, ref, watch, watchEffect, getCurrentInstance } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: 'About',
  setup() {
    const { ctx } = getCurrentInstance()
    const formRef = ref()
    const ruleForm = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })
    const rules = {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
      date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
      type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
      resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
      desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
    }
    const tableData = reactive([
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])
    let search = ref()
    let dialogVisible = ref(false)
    let filterText = ref()
    const treeRef = ref()
    const treeData = reactive([
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ])
    const defaultProps = reactive({
      children: 'children',
      label: 'label'
    })
    let activeName = ref('second')
    const options = reactive([
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      }
    ])
    let sletctValue = ref()
    let uploadTree = ref()
    const fileList = reactive([
      {
        name: 'food.jpeg',
        url:
          'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      },
      {
        name: 'food2.jpeg',
        url:
          'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }
    ])
    let transferData = reactive()
    let transferValue = reactive([])

    const submitForm = function() {
      formRef.value.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetForm = function() {
      formRef.value.resetFields()
    }

    const handleEdit = function(index, row) {
      console.log(index, row)
    }
    const handleDelete = function(index, row) {
      console.log(index, row, row.date)
    }
    const handleClose = function(done) {
      // ElMessageBox.confirm('确认关闭？')
      //   .confirm('确认关闭？')
      //   .then(() => {
      //     done()
      //   })
      //   .catch(() => {})
      ctx
        .$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
    const filterNode = function(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
    watchEffect(() => {
      // treeRef.value.filter(filterText)
      console.log(transferValue)
    })
    watch([filterText], ([newFilter]) => {
      treeRef.value.filter(newFilter)
      console.log(filterText, newFilter)
    })
    const openMessage = function() {
      // ElMessage({
      //   showClose: true,
      //   message: '恭喜你，这是一条成功消息',
      //   type: 'success'
      // })
      // ElMessage.success('恭喜你，这是一条成功消息')
      ctx.$message.success('恭喜你，这是一条成功消息')
    }
    const handleClick = function(tab, event) {
      console.log(tab, event)
    }
    const submitUpload = function() {
      // uploadTree.value.submit()
      console.log(ctx.$refs.uploadTree)
      ctx.$refs.uploadTree.submit()
    }
    const handleRemove = function(file, fileList) {
      console.log(file, fileList)
    }
    const handlePreview = function(file) {
      console.log(file)
    }
    const generateData = () => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const spell = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          spell: spell[index]
        })
      })
      return data
    }
    transferData = generateData()
    const filterMethod = (query, item) => {
      return item.spell.indexOf(query) > -1
    }
    return {
      formRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      tableData,
      search,
      handleEdit,
      handleDelete,
      dialogVisible,
      handleClose,
      filterText,
      treeData,
      defaultProps,
      filterNode,
      treeRef,
      openMessage,
      activeName,
      handleClick,
      options,
      sletctValue,
      fileList,
      uploadTree,
      submitUpload,
      handleRemove,
      handlePreview,
      transferData,
      transferValue,
      filterMethod
    }
  }
}
</script>

<style lang="scss">
.about {
  .block {
    .el-carousel__item {
      h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
      }
      &:nth-child(2n) {
        background-color: #99a9bf;
      }
      &:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
}
</style>
