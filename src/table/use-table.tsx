import {
  get, isFunction, isNull, isUndefined,
} from 'lodash-es';
import {
  IColumn, IOperation, ITableProps, renderFn,
} from '@/types';
import useColumn from './use-column';
import operation from '../operation';

export default function useTable(props: ITableProps) {
  const { selectable } = useColumn(props);

  function getColValue<T = any>(
    data: T,
    prop: string,
    useDefault: boolean | undefined,
    defaultText: string | undefined,
  ) {
    const value = get(data, prop);
    const noData = isNull(value) || isUndefined(value) || value === '';
    return noData && useDefault ? (defaultText || props.defaultColText) : value;
  }

  const selectionElement = () => (
    <el-table-column
      type="selection"
      align="center"
      width={props.selectionWidth}
      selectable={selectable}
    />
  );

  const userRenderColumnElement = (renderCell: renderFn, scope: any) => (
    <span>{renderCell(scope.row)}</span>);

  const operationsColumnElement = (operations: Array<IOperation>, scope: any) => (
    operation(operations, scope.row)
  );

  const normalColumnElement = ({
    formatter,
    prop,
    useDefaultColText,
    defaultColText,
  }: IColumn, scope: any) => (
    <span>
      {isFunction(formatter)
        ? formatter(scope.row)
        : getColValue(scope.row, prop, useDefaultColText, defaultColText)}
    </span>
  );

  return {
    selectionElement,
    userRenderColumnElement,
    operationsColumnElement,
    normalColumnElement,
  };
}
