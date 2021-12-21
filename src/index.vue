<script lang="tsx">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
} from 'vue';
import { ITableProps } from '@/types';
import tableProps from './table-props';
import pagination from './pagination/index';
import useRequest, { destroyRequestObj } from './use-request';
import table from './table';
import toolbar from './toolbar';
import { destroyModel } from './use-model';
import { setConfig } from './config';

export default defineComponent({
  name: 'k-table',
  props: tableProps,
  setup(props: ITableProps, { emit, slots, expose }) {
    const { tableElement, selections, tableRef } = table(props);

    const { toolbarElement } = toolbar(props, selections, slots);

    const { requestData } = useRequest(props);

    expose({
      tableRef,
      requestData,
    });

    const { paginationElement } = pagination(props);

    const KTableConfig = getCurrentInstance()?.appContext.config.globalProperties.$KTable;
    setConfig(KTableConfig);

    watch(() => selections.value, () => {
      emit('update:selections', selections.value);
    });

    onMounted(async () => {
      await requestData();
    });

    onBeforeUnmount(() => {
      destroyModel();
      destroyRequestObj();
    });

    return () => (
      <div class="k-table">
        {
          props.showToolbar ? toolbarElement() : ''
        }
        {
          tableElement()
        }
        {
          props.showPagination ? paginationElement() : ''
        }
      </div>
    );
  },
});
</script>

<style lang="scss">
.k-table {
  width: 100%;
}
</style>
