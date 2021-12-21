import { App } from 'vue';
import { merge } from 'lodash-es';
import { IKTableInstallOptions } from '@/types';
import KTable from './index.vue';

export * from './types';

const defaultInstallOpt: IKTableInstallOptions = {} as IKTableInstallOptions;

const install = (app: App, opt?: IKTableInstallOptions): void => {
  app.config.globalProperties.$KTable = merge(defaultInstallOpt, opt || {});
  app.component(KTable.name, KTable);
};

export default {
  install,
};
