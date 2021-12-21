import { PropType } from 'vue';
import { ITableProps } from './types';

export default {
  data: {
    type: Array,
    default() {
      return [];
    },
  },
  request: {
    type: Object as PropType<ITableProps['request']>,
    default() {
      return {} as PropType<ITableProps['request']>;
    },
  },
  columns: {
    type: Array as PropType<ITableProps['columns']>,
    default() {
      return [] as PropType<ITableProps['columns']>;
    },
  },
  autoRequest: {
    type: Boolean,
    default: true,
  },

  // 配置
  showSelection: {
    type: Boolean,
    default: true,
  },
  selectionWidth: {
    type: [Number, String],
    default: 45,
  },
  columnSelectable: {
    type: Function as PropType<ITableProps['columnSelectable']>,
  },

  defaultColText: {
    type: String,
    default: '--',
  },

  // 工具栏
  showToolbar: Boolean,
  toolbarOperations: {
    type: Array as PropType<ITableProps['toolbarOperations']>,
    default() {
      return [] as PropType<ITableProps['toolbarOperations']>;
    },
  },

  // 分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, sizes, jumper, ->',
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array as PropType<ITableProps['pageSizes']>,
    default() {
      return [10, 20, 30, 40];
    },
  },
  pagerCount: {
    type: Number,
    default: 7,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
};
