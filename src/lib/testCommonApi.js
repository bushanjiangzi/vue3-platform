import { reactive, ref, watch, watchEffect } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store/index'

const testCommonApi = function() {
  const propsMsg = reactive({
    msg: 'Hello',
    name: 'Jiangzi',
    age: 18
  })
  const myInput = ref()
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
    ElMessageBox.confirm('确认关闭？')
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
    // console.log(transferValue)
    store.commit('setHomeInput', myInput.value)
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
    ElMessage.success('恭喜你，这是一条成功消息')
  }
  const handleClick = function(tab, event) {
    console.log(tab, event)
  }
  const submitUpload = function() {
    uploadTree.value.submit()
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
    propsMsg,
    myInput,
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

export default testCommonApi
