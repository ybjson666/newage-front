import React from 'react';
import { Route } from 'react-router-dom';
import memoize from 'memoize-one';
import deepEqual from '@/utils/deepEqual';
import Loadable from '@/components/Loadable';
// import BlogArticleList from './pages/BlogArticleList';

// const IframePage = Loadable(() => import('@/pages/IframePage'));
const NotFound = Loadable(() => import('@/pages/Exception/404'));
const TableList = Loadable(() => import('@/pages/TableList'));
const VolunteerList = Loadable(() => import('@/pages/VolunteerList'));
const CheckPendingList = Loadable(() => import('@/pages/CheckPendingList'));
const ActivityList = Loadable(() => import('@/pages/ActivityList'));
const ActivityCheckList = Loadable(() => import('@/pages/ActivityCheckList'));
const WishList = Loadable(() => import('@/pages/WishList'));
const TaskList = Loadable(() => import('@/pages/TaskList'));
const ResourceTypeList = Loadable(() => import('@/pages/ResourceTypeList'));
const ResourceList = Loadable(() => import('@/pages/ResourceList'));
const ResourceOrderList = Loadable(() => import('@/pages/ResourceOrderList'));
const ActivityPracticeList = Loadable(() => import('@/pages/ActivityPractice'));
const ActivityPracticeCheckList = Loadable(() => import('@/pages/ActivityPracticeCheckList'));
const IntegralList = Loadable(() => import('@/pages/IntegralList'));
const OrderSheetType = Loadable(() => import('@/pages/OrderSheetType'));
const OrderSheetCheck = Loadable(() => import('@/pages/OrderSheetCheck'));
const OrderSheetList = Loadable(() => import('@/pages/OrderSheetList'));
const ConfigList = Loadable(() => import('@/pages/ConfigList'));
const TaskConfig = Loadable(() => import('@/pages/TaskConfig'));
const ActvCount = Loadable(() => import('@/pages/ActvCount'));
const ActvCountDetail = Loadable(() => import('@/pages/ActvCountDetail'));
const UserCount = Loadable(() => import('@/pages/UserCount'));
const UserCountDetail = Loadable(() => import('@/pages/UserCountDetail'));
const TaskCount = Loadable(() => import('@/pages/TaskCount'));
const TaskCountDetail = Loadable(() => import('@/pages/TaskCountDetail'));
// 默认路由需要跟后台协商配置
const defaultRoutes = [
  // <Route key="menu" exact path="/:cid/:sid/:id" component={IframePage} />,
  <Route key="VolunteerList" exact path="/" component={VolunteerList} />,
  <Route key="CheckPendingList" exact path="/CheckPendingList" component={CheckPendingList} />,
  <Route key="TableList" exact path="/TableList" component={TableList} />,
  <Route key="ActivityList" exact path="/ActivityList" component={ActivityList} />,
  <Route key="ActivityCheckList" exact path="/ActivityCheckList" component={ActivityCheckList} />,
  <Route key="WishList" exact path="/WishList" component={WishList} />,
  <Route key="TableList" exact path="/TaskList" component={TaskList} />,
  <Route key="ResourceTypeList" exact path="/ResourceTypeList" component={ResourceTypeList} />,
  <Route key="ResourceList" exact path="/ResourceList" component={ResourceList} />,
  <Route key="ResourceOrderList" exact path="/ResourceOrderList" component={ResourceOrderList} />,
  <Route key="ActivityPracticeList" exact path="/ActivityPracticeList" component={ActivityPracticeList} />,
  <Route key="PracticeCheckList" exact path="/PracticeCheckList" component={ActivityPracticeCheckList} />,
  <Route key="IntegralList" exact path="/IntegralList" component={IntegralList} />,
  <Route key="OrderSheetType" exact path="/OrderSheetType" component={OrderSheetType} />,
  <Route key="OrderSheetCheck" exact path="/OrderSheetCheck" component={OrderSheetCheck} />,
  <Route key="OrderSheetList" exact path="/OrderSheetList" component={OrderSheetList} />,
  <Route key="ConfigList" exact path="/ConfigList" component={ConfigList} />,
  <Route key="TaskConfig" exact path="/TaskConfig" component={TaskConfig} />,
  <Route key="ActvCount" exact path="/ActvCount" component={ActvCount} />,
  <Route key="ActvCountDetail" exact path="/ActvCountDetail/:pageid" component={ActvCountDetail} />,
  <Route key="UserCount" exact path="/UserCount" component={UserCount} />,
  <Route key="UserCountDetail" exact path="/UserCountDetail/:pageid" component={UserCountDetail} />,
  <Route key="TaskCount" exact path="/TaskCount" component={TaskCount} />,
  <Route key="TaskCountDetail" exact path="/TaskCountDetail/:pageid" component={TaskCountDetail} />,
  <Route key="404" exact component={NotFound} />
];

/**
 * 生成路由
 * @param {object} nav 顶部菜单数据
 */
const generateRoutes = memoize(nav => {
  const { categories, products } = nav;
  return categories
    .reduce((acc, cur) => {
      if (cur.products.length) {
        for (let i = 0; i < cur.products.length; i++) {
          const _service = products[cur.products[i]];
          // 此处只处理iframe
          if (
            _service &&
            +_service.is_menu === 0 &&
            +_service.is_target !== 1 &&
            +_service.is_iframe === 1
          ) {
            const path = `/${cur.class_key}/${_service.service_key}`;
            // acc.push(<Route key={cur.class_key} exact path={path} component={IframePage} />);
          }
        }
        return acc;
      } else {
        return acc;
      }
    }, [])
    .concat(defaultRoutes);
}, deepEqual);

export default defaultRoutes;
