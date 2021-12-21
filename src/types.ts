export type DefaultRow = any;

export type renderFn = <T = any>(data: T) => any;

export interface IAnyObject {
  [propName: string]: any;
}

interface IOperation<T = any> {
  text?: string;
  title?: string;
  className?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  render?: renderFn;
  handleClick: (data: T) => void;
  disabled?: boolean | ((data: T) => boolean);
  display?: boolean | ((data: T) => boolean);
  originalElBtnProps?: {
    size?: 'medium' | 'small' | 'mini';
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    autofocus?: boolean;
  }
}

interface IColumn<T = DefaultRow> {
  label: string;
  prop: string;
  width?: number | string;
  minWidth?: number | string;
  fixed?: string | boolean;
  renderHeader?: (data: any) => any;
  sortable?: true | false | 'custom';
  sortMethod?: (a: any, b: any) => number;
  sortBy?: string | Array<string> | ((row: any, index: number) => any);
  sortOrders?: Array<any>;
  resizable?: boolean;
  showOverflowTooltip?: boolean;
  align?: string
  headerAlign?: string
  display?: boolean | ((col: IColumn) => boolean);
  className?: string;
  labelClassName?: string;
  reserveSelection?: boolean;
  renderCell?: renderFn;
  formatter?: (data: T) => string | number | boolean;
  defaultColText?: string;
  useDefaultColText?: boolean;
  operations?: Array<IOperation<T>>;
}

interface PaginationParamsName {
  pageNo: string;
  pageSize: string;
}

interface IDataPaths {
  data: string;
  total: string;
  pageCount?: string;
}

interface ITableRequest {
  method: (params: any) => Promise<any>;
  selfParams?: IAnyObject;
  paginationParamsName?: PaginationParamsName;
  responsePath?: IDataPaths;
}

interface ITableProps<T = DefaultRow> {
  data: T[];
  columns: Array<IColumn>;
  showSelection: boolean;
  selectionWidth: number | string;
  columnSelectable: ((row: any, index: number) => boolean) | undefined;
  defaultColText: string;
  showPagination: boolean | undefined;
  paginationLayout: string;
  pageSize: number;
  pageSizes: Array<number>;
  pagerCount: number;
  hideOnSinglePage: boolean;
  request: ITableRequest;
  showToolbar: boolean | undefined,
  toolbarOperations?: Array<IOperation<T>>;
}

interface IKTableInstallOptions {
  request?: {
    paginationParamsName?: PaginationParamsName;
    responsePath?: IDataPaths;
  }
}

export type {
  IOperation,
  IColumn,
  ITableRequest,
  ITableProps,
  IKTableInstallOptions,
};
