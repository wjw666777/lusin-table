import { Slots } from 'vue';
import { ITableProps } from '@/types';
import './index.scss';
import operation from '../operation';

export default function toolbar(props: ITableProps, selections: any, slots: Slots) {
  const toolbarElement = () => (
    <div class="k-table__toolbar">
      {
        slots.toolbarLeft ? slots.toolbarLeft() : ''
      }
      {
        props.toolbarOperations ? operation(props.toolbarOperations, selections) : ''
      }
      {
        slots.toolbarRight ? slots.toolbarRight() : ''
      }
    </div>
  );

  return {
    toolbarElement,
  };
}
