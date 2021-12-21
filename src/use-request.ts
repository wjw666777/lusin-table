import { get, isFunction, merge } from 'lodash-es';
import { ITableProps, ITableRequest } from '@/types';
import useModel from './use-model';
import { getConfig } from './config';

let requestObj: ITableRequest | null = {} as ITableRequest;

export function destroyRequestObj() {
  requestObj = null;
}

export default function useRequest(props: ITableProps) {
  const { tableModel, paginationModel } = useModel(props);

  function mergeConfig() {
    const KTableConfig = getConfig();
    const defaultRequestConfig = (KTableConfig && KTableConfig.request) || {};
    merge(requestObj, defaultRequestConfig);
    merge(requestObj, props.request);
  }

  async function requestWithPagination(reqObj: ITableRequest) {
    if (!reqObj.paginationParamsName || !reqObj.responsePath) {
      throw new Error('"request.paginationParamsName" or "request.responsePath" must be provided');
    }

    const { pageSize, pageNo } = reqObj.paginationParamsName;
    const params = {
      [pageNo]: paginationModel.currentChange,
      [pageSize]: paginationModel.pageSize,
    };
    Object.assign(params, requestObj?.selfParams);

    const { data, total, pageCount } = reqObj.responsePath;
    const res = await props.request.method(params);
    const tableData = get(res, data);
    if (tableData) {
      tableModel.data.length = 0;
      tableModel.data.push(...tableData);
      paginationModel.total = get(res, total);
      if (pageCount) {
        paginationModel.pageCount = get(res, pageCount);
      }
    }
  }

  async function requestWithoutPagination(reqObj: ITableRequest) {
    if (!reqObj.responsePath || !reqObj.responsePath.data) {
      throw new Error('"request.responsePath.data" must be provided');
    }
    const params = {};
    Object.assign(params, requestObj?.selfParams);
    const res = await props.request.method(params);
    const tableData = get(res, reqObj.responsePath.data);
    if (tableData) {
      tableModel.data.length = 0;
      tableModel.data.push(...tableData);
    }
  }

  async function requestData() {
    if (!isFunction(props.request.method)) {
      console.warn('request must be a function');
      return;
    }

    requestObj = {} as ITableRequest;
    mergeConfig();

    if (props.showPagination) {
      await requestWithPagination(requestObj);
    } else {
      await requestWithoutPagination(requestObj);
    }
  }

  return {
    requestData,
  };
}
