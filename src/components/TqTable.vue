<template>
  <div class="wrap">
    <div style="padding-bottom: 10px" class="header-wrap">
      <el-button type="primary" icon="el-icon-plus" @click="saveWinOpen">
        <span v-html="`新增${props.mainName}`"></span>
      </el-button>
      <el-button type="primary" icon="el-icon-minus" @click="batchRemove"
        >批量删除
      </el-button>

      <div
        v-for="(column, index) in searchColumns"
        :key="index"
        class="condition-wrap"
      >
        <el-input
          v-if="column.type === 'input'"
          :key="index"
          :placeholder="column.label"
          v-model="componentData.searchCondition[column.column]"
        ></el-input>
        <el-select
          v-if="column.type === 'select'"
          :key="index"
          v-model="componentData.searchCondition.parentId"
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
          :key="index"
          inline-prompt
          :inactive-text="column?.switch?.off"
          :active-text="column?.switch?.on"
          v-model="componentData.searchCondition[column.column]"
        ></el-switch>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="searchHandler">
        搜索
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh-left"
        @click="resetSearchHandler"
        >重置
      </el-button>
    </div>
    <div class="body-wrap">
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
            <el-button type="text" size="medium" @click="edit(scope.row)"
              >编辑
            </el-button>
            <el-button type="text" size="medium" @click="remove(scope.row.id)"
              >删除
            </el-button>
            <el-button
              type="text"
              size="small"
              v-for="(option, index) in options.filter(
                (option) => !option.inMore
              )"
              :key="index"
              :icon="option.icon"
              @click="option.method(scope.row)"
              ><span v-html="option.name"></span>
            </el-button>
            <el-button
              type="text"
              size="medium"
              v-if="options.find((option) => option.inMore)"
            >
              <el-dropdown>
                <span class="el-button--text el-button el-button--medium">
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
    </div>
    <div class="footer-wrap">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="pageSizeChangeHandler"
        @current-change="pageChangeHandler"
      >
      </el-pagination>
    </div>

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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, render, h, computed, watch } from 'vue';
import __ from 'lodash';

const loading = ref(false);
const formRef = ref();
const props = defineProps([
  'mainName',
  'columns',
  'condition',
  'rules',
  'methods',
  'options',
]);

let needDeleteIdArray = [];

const currentPage = ref(1);
const pageSizes = reactive([5, 10, 15, 20, 25]);
const pageSize = ref(5);
const totalSize = ref(0);
const options = props.options || [];
const editColumns = [];
const tableColumns = [];
const searchColumns = [];
const editForm = {};
const searchCondition = {};
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
  if (props.columns[i].search) {
    searchColumns.push(props.columns[i]);
    // 判断是不是select，如果是则获取其下拉选项
    if (props.columns[i].option) {
      props.columns[i].option
        .method(props.columns[i].option.condition)
        .then((res) => {
          selectOptions[props.columns[i].column] = [
            ...props.columns[i].option.default,
            ...res.row,
          ];
        });
    }
    __.set(
      searchCondition,
      props.columns[i].column,
      props.columns[i].default || props.columns[i].default === null
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
  searchCondition: new Proxy(__.cloneDeep(searchCondition), handler),
  ruleForm: new Proxy(__.cloneDeep(editForm), handler),
});

watch(componentData.searchCondition, (newVal) => {
  console.error(newVal);
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
}
/**
 * 查询数据信息
 */
function list() {
  loading.value = true;
  componentData.tableData.splice(0, componentData.tableData.length);
  console.log(props.methods);
  props.methods
    .list({
      ...props.condition,
      ...componentData.searchCondition,
      page: currentPage.value,
      size: pageSize.value,
    })
    .then((res) => {
      componentData.tableData.push(...res.rows);
      totalSize.value = res.total;
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
  rowCopy.deleted = rowCopy?.deleted?.value;
  rowCopy.closeable = rowCopy?.closeable?.value;
  componentData.ruleForm = new Proxy(rowCopy, handler);
}

/**
 * 删除菜单
 */
function remove(id) {
  props.methods
    .remove(id, {
      ...props.condition,
      ...componentData.searchCondition,
      page: currentPage.value,
      size: pageSize.value,
    })
    .then((res) => {
      componentData.tableData.splice(0, componentData.tableData.length);
      componentData.tableData.push(...res.rows);
      totalSize.value = res.total;
    });
}

/**
 * 批量删除菜单
 */
function batchRemove() {
  props.methods
    .batchRemove(needDeleteIdArray.toString(), {
      ...props.condition,
      ...componentData.searchCondition,
      page: currentPage.value,
      size: pageSize.value,
    })
    .then((res) => {
      componentData.tableData.splice(0, componentData.tableData.length);
      componentData.tableData.push(...res.rows);
      totalSize.value = res.total;
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
 * 当前页发生变更
 * @param current
 */
function pageChangeHandler(current) {
  list();
}

/**
 * 页大小发生变更
 * @param currentPageSize
 */
function pageSizeChangeHandler(currentPageSize) {
  pageSize.value = currentPageSize;
  list();
}

/**
 * 条件搜索
 */
function searchHandler() {
  currentPage.value = 1;
  list();
}
function resetSearchHandler() {
  currentPage.value = 1;
  componentData.searchCondition = new Proxy(
    __.cloneDeep(searchCondition),
    handler
  );
  list();
}
</script>

<style scoped lang="scss">
.form-wrap {
  padding: 10px;
}

:deep(.el-drawer__body) {
  overflow-y: scroll;
}
.wrap {
  height: 100%;
  overflow-y: auto;
}

.header-wrap {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 8%;
}
.body-wrap {
  height: 80%;
  overflow-y: auto;
}
.footer-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: calc(12% - 20px);
}
.condition-wrap {
  padding: 5px;
}
</style>
