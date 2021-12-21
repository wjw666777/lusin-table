import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import App from './index.vue';
import KTable from '../src/index';

import 'element-plus/lib/theme-chalk/index.css';

createApp(App)
  .use(ElementPlus)
  .use(KTable, {
    request: {
      paginationParamsName: {
        pageNo: 'pageNr',
        pageSize: 'pageSize',
      },
      responsePath: {
        data: 'model.list',
        total: 'model.totalCount',
        pageCount: 'totalPages',
      },
    },
  })
  .mount('#app');
