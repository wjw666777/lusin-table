let $KTable = {};

const setConfig = (option: any): void => {
  $KTable = option;
};

const getConfig = (): any => $KTable;

export {
  getConfig,
  setConfig,
};
