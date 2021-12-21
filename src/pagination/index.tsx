import { ITableProps } from '@/types';
import './index.scss';
import useModel from '../use-model';
import useRequest from '../use-request';

export default function pagination(props: ITableProps) {
  const { paginationModel } = useModel(props);
  const { requestData } = useRequest(props);

  async function handleSizeChange(val: number) {
    paginationModel.pageSize = val;
    await requestData();
  }

  async function handleCurrentChange(val: number) {
    paginationModel.currentChange = val;
    await requestData();
  }

  const paginationElement = () => (
    <div class="k-table__pagination">
      <el-pagination
          total={paginationModel.total}
          layout={props.paginationLayout}
          page-size={paginationModel.pageSize}
          page-sizes={props.pageSizes}
          current-page={paginationModel.currentChange}
          pager-count={paginationModel.pageCount}
          hide-on-single-page={props.hideOnSinglePage}
          onSizeChange={handleSizeChange}
          onCurrentChange={handleCurrentChange}
        />
    </div>
  );

  return {
    paginationElement,
  };
}
