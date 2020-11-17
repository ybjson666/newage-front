import { init } from '@rematch/core';
// import createHashHistory from 'history/createHashHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as models from '@/models';

const createHashHistory=require('history').createHashHistory;
const history = createHashHistory();

// 将connected-react-router集成进rematch，后面可以使用state.router.location 获取到redux中到当前路由信息
// https://github.com/rematch/rematch/issues/578#issuecomment-443087986
// https://codesandbox.io/s/72o3k1z3nq
const reducers = {
  router: connectRouter(history)
};

const store = init({
  models,
  redux: {
    reducers,
    middlewares: [routerMiddleware(history)]
  }
});

export default store;

export {
  history
};

