<template>
  <div style="padding-bottom: 10px" class="menu">
    <el-button type="primary" icon="el-icon-plus" @click="saveWinOpen">
      <span v-html="`新增${props.mainName}`"></span>
    </el-button>
    <el-button type="primary" icon="el-icon-minus" @click="batchRemove"
      >批量删除
    </el-button>
  </div>
  <el-table
    v-loading="loading"
    ref="tableRef"
    :data="componentData.tableData"
    style="width: 100%"
    row-key="id"
    border
    @selection-change="rowSelectedChangeHandle"
  >
    <el-table-column type="selection" />
    <el-table-column
      v-for="(column, index) in tableColumns"
      :label="column.label"
      :prop="column.column"
      :key="index"
      :show-overflow-tooltip="true"
      :sortable="column.sortable"
    >
      <template #default="scope" v-if="column.slot">
        <slot :name="column.slot" :row="scope.row"></slot>
      </template>
      <template #default="scope" v-else-if="column.option">
        <span
          v-html="
            selectOptions[column.column]?.find(
              (option) => option.id === scope.row.parentId
            )?.name || '未知'
          "
        ></span>
      </template>
    </el-table-column>
    <el-table-column :fixed="false" label="操作">
      <template #default="scope">
        <el-button type="text" size="small" @click="edit(scope.row)"
          >编辑
        </el-button>
        <el-button type="text" size="small" @click="remove(scope.row.id)"
          >删除
        </el-button>
        <el-button
          type="text"
          size="small"
          v-for="(option, index) in options.filter((option) => !option.inMore)"
          :key="index"
          :icon="option.icon"
          @click="option.method(scope.row)"
          ><span v-html="option.name"></span>
        </el-button>
        <el-button
          type="text"
          size="small"
          v-if="options.find((option) => option.inMore)"
        >
          <el-dropdown>
            <span class="el-button--text el-button el-button--small">
              更多<i class="el-icon-arrow-down"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(option, index) in options"
                  :key="index"
                  :icon="option.icon"
                  @click="option.method(scope.row)"
                  ><span v-html="option.name"></span
                ></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    v-model="componentData.isShow"
    :title="
      componentData.isEdit ? `编辑${props.mainName}` : `新增${props.mainName}`
    "
    size="50%"
    @close="clearForm"
  >
    <div class="form-wrap">
      <el-form
        ref="formRef"
        :model="componentData.ruleForm"
        :rules="props.rules"
        label-width="80px"
      >
        <el-form-item
          v-for="(column, index) in editColumns"
          :label="column.label"
          :prop="column.column"
          :key="index"
        >
          <template v-if="column.formSlot">
            <slot
              :name="column.formSlot"
              :column="column"
              :form="componentData.ruleForm"
            ></slot>
          </template>
          <template v-else>
            <el-input
              v-if="column.type === 'input'"
              v-model="componentData.ruleForm[column.column]"
            ></el-input>
            <el-select
              v-if="column.type === 'select'"
              v-model="componentData.ruleForm.parentId"
              :placeholder="column.label"
            >
              <el-option
                v-for="(option, index) in selectOptions[column.column]"
                :key="index"
                :label="option[column.option.key]"
                :value="option[column.option.value]"
              />
            </el-select>
            <el-switch
              v-if="column.type === 'switch'"
              inline-prompt
              :inactive-text="column?.switch?.off"
              :active-text="column?.switch?.on"
              v-model="componentData.ruleForm[column.column]"
            ></el-switch>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm()"
            v-html="componentData.isEdit ? '更新' : '添加'"
          ></el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import __ from 'lodash';

const loading = ref(false);
const formRef = ref();
const tableRef = ref();
const props = defineProps([
  'mainName',
  'columns',
  'condition',
  'rules',
  'methods',
  'options',
]);

let needDeleteIdArray = [];
const options = props.options || [];
const editColumns = [];
const tableColumns = [];
const editForm = {};
const selectOptions = reactive({});
for (let i = 0; i < props.columns.length; i++) {
  if (props.columns[i].isEdit) {
    editColumns.push(props.columns[i]);
    // 判断是不是select，如果是则获取其下拉选项
    if (props.columns[i].option) {
      if (props.columns[i].option.method) {
        props.columns[i].option
          .method(props.columns[i].option.condition)
          .then((res) => {
            selectOptions[props.columns[i].column] = [
              ...props.columns[i].option.default,
              ...res.row,
            ];
          });
      } else {
        selectOptions[props.columns[i].column] = [
          ...props.columns[i].option.default,
        ];
      }
    }
    __.set(
      editForm,
      props.columns[i].column,
      props.columns[i].default
        ? props.columns[i].default
        : props.columns[i].type === 'switch'
        ? false
        : ''
    );
  }
  if (props.columns[i].hidden) {
    __.set(
      editForm,
      props.columns[i].column,
      props.columns[i].default
        ? props.columns[i].default
        : props.columns[i].type === 'switch'
        ? false
        : ''
    );
  }
  if (props.columns[i].isShow) {
    tableColumns.push(props.columns[i]);
  }
}

const handler = {
  get(target, propKey) {
    if (typeof propKey === 'string' && propKey.indexOf('.') !== -1) {
      return __.get(target, propKey);
    }
    return Reflect.get(target, propKey);
  },
  set(target, propKey, value) {
    if (typeof propKey === 'string' && propKey.indexOf('.') !== -1) {
      return __.set(target, propKey, value);
    }
    return Reflect.set(target, propKey, value);
  },
};

const initForm = new Proxy(__.cloneDeep(editForm), handler);

const componentData = reactive({
  isShow: true,
  isEdit: false,
  tableData: [],
  ruleForm: new Proxy(__.cloneDeep(editForm), handler),
});

onMounted(() => {
  componentData.isShow = false;
  list();
});

/**
 * 行选中变更触发事件
 */
function rowSelectedChangeHandle(selection) {
  needDeleteIdArray = [];
  needDeleteIdArray.push(...selection.map((item) => item.id));
  console.log(selection);
}
/**
 * 查询数据信息
 */
function list() {
  componentData.tableData.splice(0, componentData.tableData.length);
  loading.value = true;
  props.methods.list(props.condition).then((res) => {
    const tree = buildTree(res.row, -1);
    componentData.tableData.push(...tree);
    loading.value = false;
  });
}

/**
 * 添加窗体打开
 */
function saveWinOpen() {
  componentData.isEdit = false;
  componentData.isShow = true;
}

/**
 * 提交数据到后台（修改 OR 添加）
 */
function submitForm() {
  if (componentData.ruleForm.id) {
    // 更新
    props.methods.update(componentData.ruleForm).then((res) => {
      list();
      componentData.isShow = false;
    });
  } else {
    props.methods.save(componentData.ruleForm).then((res) => {
      list();
      componentData.isShow = false;
    });
  }
}

/**
 * 编辑数据
 */
function edit(row) {
  componentData.isEdit = true;
  componentData.isShow = true;
  // 先将表单置为空
  clearForm();
  const rowCopy = __.cloneDeep(row);
  rowCopy.deleted = rowCopy.deleted.value;
  rowCopy.closeable = rowCopy.closeable.value;
  componentData.ruleForm = new Proxy(rowCopy, handler);
}

/**
 * 删除菜单
 */
function remove(id) {
  props.methods.remove(id, props.condition).then((res) => {
    const tree = buildTree(res.row, -1);
    componentData.tableData.splice(0, componentData.tableData.length);
    componentData.tableData.push(...tree);
  });
}

/**
 * 批量删除菜单
 */
function batchRemove() {
  props.methods
    .batchRemove(needDeleteIdArray.toString(), props.condition)
    .then((res) => {
      const tree = buildTree(res.row, -1);
      console.log(res);
      componentData.tableData.splice(0, componentData.tableData.length);
      componentData.tableData.push(...tree);
    });
}

/**
 * 重置表单
 */
function resetForm() {
  formRef.value.resetFields();
}

/**
 * 清空表单
 */
function clearForm() {
  // 将表单置为初始状态
  componentData.ruleForm = __.cloneDeep(initForm);
  // 重置一次所有字段
  resetForm();
}

/**
 * 构建树结构
 * @param list
 * @param parentId
 */
function buildTree(list, parentId) {
  const root = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === parentId) {
      root.push(list[i]);
      const children = buildTree(list, list[i].id);
      list[i].children = children;
    }
  }
  return root;
}
</script>

<style scoped lang="scss">
.form-wrap {
  padding: 10px;
}

:deep(.el-drawer__body) {
  overflow-y: scroll;
}
</style>
