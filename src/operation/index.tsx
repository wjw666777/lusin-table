import { isBoolean, isFunction } from 'lodash-es';
import { IOperation } from '@/types';
import './index.scss';

function getBooleanValue(exec: boolean | ((data: any) => boolean) | undefined, val: any, defaultValue = true) {
  if (isFunction(exec)) {
    return exec(val);
  }
  if (isBoolean(exec)) {
    return exec;
  }
  return defaultValue;
}

export default function operation(operations: Array<IOperation>, data: any) {
  return (
    <div class="k-table__operation-btns">
      {
        operations
          .filter((o) => getBooleanValue(o.display, data))
          .map((
            {
              icon,
              title,
              text,
              render,
              handleClick,
              disabled,
              originalElBtnProps,
              iconPosition = 'left',
            },
          ) => (
            <el-button
              size="mini"
              {...originalElBtnProps}
              title={title || ''}
              onClick={() => !getBooleanValue(disabled, data, false) && handleClick(data)}
              disabled={getBooleanValue(disabled, data, false)}
            >
              {
                render
                  ? render(data)
                  : (
                    <span class={`k-table__operation-btns-icon-${iconPosition}`}>
                      {icon ? <i class={['btn-icon', icon]}/> : ''}
                      <span class="btn-text"> {text || ''}</span>
                    </span>
                  )
              }
            </el-button>
          ))
        }
    </div>
  );
}
