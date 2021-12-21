<template>
  <div class="test">
    <k-table
      ref="kTable"
      stripe
      border
      highlight-current-row
      @cell-click="testClick"
      show-toolbar
      show-pagination
      :columns="columns"
      :page-size="5"
      :page-sizes="[5, 10, 15, 20]"
      pagination-layout="total, prev, pager, next, sizes, jumper"
      :request="request"
      v-model:selections="selections"
      :toolbar-operations="toolbarOps"
    >
      <template #toolbarLeft>
        <span>hello left</span>
      </template>
    </k-table>
  </div>
</template>

<script lang="tsx">
// eslint-disable-next-line import/no-extraneous-dependencies
import Axios from 'axios';
import { ref, watch } from 'vue';
import { IColumn, ITableRequest } from '@/types';

export default {
  name: 'test-table',
  setup() {
    const kTable = ref<any>(null);
    const param: Record<string, any> = {
    };
    const instance = Axios.create(param);
    const requestMethod = (params: any) => instance.get(
      'http://localhost/_api/SiteLog/list?SiteId=06603eb1-1a20-ecab-1bfd-9237faf28d4a',
      {
        params,
        ...{
          headers: {
            // eslint-disable-next-line max-len
            Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjFjZmZlYmY3LWM1NWYtN2E3Yy00ZDVhLTcxODBlNzQwZmQzMiIsImlwIjoiMTY7MTU4PjU7YTg8PmQiLCJleHAiOjE2MzExNzExNDh9.HAnm5BxcdVex7fh4iitxfXq4eVDBxS28KhUj8Y9zrwU',
          },
        },
      },
    ).then((response: any) => response.data);

    function testClick() {
      // console.log('dddddd');
      kTable.value.tableRef.clearSelection();
    }

    const columns: Array<IColumn> = [
      {
        label: 'actionType',
        prop: 'actionType',
        renderCell(d: any) {
          return <span style="color: red;">{d.actionType}</span>;
        },
      },
      {
        label: 'itemName',
        prop: 'itemName',
        formatter(d: any) {
          return d.itemName;
        },
      },
      {
        label: '名字2',
        prop: 'userName',
        sortable: true,
      },
      {
        label: '操作',
        prop: 'dd',
        operations: [
          {
            text: '删除',
            handleClick() {
              console.log('dd');
            },
            icon: 'el-icon-upload',
          },
          {
            text: 'gggg',
            handleClick(data: any) {
              console.log('dd', data);
            },
            icon: 'el-icon-upload',
            iconPosition: 'right',
          },
        ],
      },
    ];

    const selections = ref([]);
    watch(() => selections.value, () => {
      console.log(selections.value.length);
    });

    const toolbarOps = [
      {
        text: '删除',
        handleClick() {
          console.log('dd');
        },
        icon: 'el-icon-upload',
        display() {
          return selections.value.length > 0;
        },
      },
      {
        text: 'gggg',
        handleClick(data: any) {
          console.log('dd', data);
        },
        icon: 'el-icon-upload',
        iconPosition: 'right',
        disabled() {
          return selections.value.length === 0;
        },
      },
    ];

    const request: ITableRequest = {
      method: requestMethod,
      selfParams: {
        id: 444,
      },
    };

    return {
      kTable,
      testClick,
      columns,
      request,
      selections,
      toolbarOps,
    };
  },
};
</script>

<style scoped>
.test {
  display: flex;
  flex-grow: 1;
  width: 100%;
}
</style>
