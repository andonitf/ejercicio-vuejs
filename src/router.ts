import Router, { RouteConfig } from 'vue-router';
import { MemberTable, MemberDetail } from './components';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MemberTable
  },
  {
    path: '/:organization',
    component: MemberTable,
    props: true
  },
  {
    path: '/member/:login',
    component: MemberDetail,
    props: true
  }
];

export const router = new Router({
  routes
});
