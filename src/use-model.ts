import { reactive } from 'vue';
import { ITableProps } from '@/types';

interface ITableModel {
  data: any;
}

interface IPaginationModel {
  total: number,
  currentChange: number,
  pageSize: number,
  pageCount: number,
}

let tableModel: ITableModel | null;
let paginationModel: IPaginationModel | null;

export function destroyModel() {
  tableModel = null;
  tableModel = null;
}

export default function useModel(props: ITableProps) {
  if (!tableModel || !paginationModel) {
    tableModel = reactive({
      data: props.data,
    });

    paginationModel = reactive({
      total: tableModel.data.length,
      currentChange: 1,
      pageSize: props.pageSize,
      pageCount: props.pagerCount,
    });
  }

  return {
    tableModel,
    paginationModel,
  };
}
