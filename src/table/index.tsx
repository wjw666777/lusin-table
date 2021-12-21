import { getCurrentInstance, ref } from 'vue';
import { isFunction } from 'lodash-es';
import useColumn from './use-column';
import { IColumn, ITableProps } from '@/types';
import useModel from '../use-model';
import useTable from './use-table';
import './index.scss';

interface ISortChangeParam {
  column: IColumn;
  prop: string;
  order: 'ascending' | 'descending';
}

export default function table(props: ITableProps) {
  const { tableModel } = useModel(props);
  const { columns } = useColumn(props);

  const {
    selectionElement,
    userRenderColumnElement,
    operationsColumnElement,
    normalColumnElement,
  } = useTable(props);

  const tableRef = ref<any>({});

  const selections = ref([]);
  function handleSelectionChange(vals: any) {
    selections.value = vals;
  }

  function handleSortChange({ column, prop, order }: ISortChangeParam) {
    console.log(column, prop, order);
  }

  const tableElement = () => (
    <el-table
      {...getCurrentInstance()?.attrs}
      data={tableModel.data}
      ref={tableRef}
      className="k-table__table"
      onSelectionChange={handleSelectionChange}
      onSortChange={handleSortChange}
    >
      {
        props.showSelection && selectionElement()
      }
      {
        columns.value.map((column: IColumn) => (
          <el-table-column
            label={column.label}
            prop={column.prop}
            width={column.width}
            minWidth={column.minWidth}
            sortable={column.sortable}
            fixed={column.fixed}
            renderHeader={column.renderHeader}
            sortMethod={column.sortMethod}
            sortBy={column.sortBy}
            sortOrders={column.sortOrders}
            resizable={column.resizable}
            showOverflowTooltip={column.showOverflowTooltip}
            align={column.align}
            headerAlign={column.headerAlign}
            className={column.className}
            labelClassName={column.labelClassName}
            reserveSelection={column.reserveSelection}
          >
            {{
              default: (scope: any) => {
                if (isFunction(column.renderCell)) {
                  return userRenderColumnElement(column.renderCell, scope);
                }
                if (column.operations) {
                  return operationsColumnElement(column.operations, scope);
                }
                return normalColumnElement(column, scope);
              },
            }}
          </el-table-column>
        ))
      }
    </el-table>
  );

  return {
    tableElement,
    selections,
    tableRef,
  };
}
