import { computed } from 'vue';
import { isBoolean, isFunction } from 'lodash-es';
import { IColumn, ITableProps } from '@/types';

export default function useColumn(props: ITableProps<any>) {
  function selectable(row: any, index: number) {
    if (props.columnSelectable) {
      return props.columnSelectable(row, index);
    }
    return true;
  }

  function columnDisplay(col: IColumn) {
    const { display } = col;
    if (isFunction(display)) {
      return display(col);
    }
    if (isBoolean(display)) {
      return display;
    }
    return true;
  }

  const columns = computed<Array<IColumn>>(() => {
    const cols: Array<IColumn> = [];
    props.columns.forEach((item: IColumn) => {
      if (!columnDisplay(item)) {
        return;
      }
      const col: IColumn = {
        ...item,
      };
      col.className = col.className || '';
      cols.push(col);
    });
    return cols;
  });

  return {
    selectable,
    columns,
  };
}
