import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/company/waitReview',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      redirect: '/company/waitReview',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/notify',
    component: Layout,
    redirect: '/notify',
    meta: { title: 'Notify', icon: 'el-icon-message-solid' },
    children: [
      {
        path: '',
        name: 'Notify',
        component: () => import('@/views/notify/AddNotify/index'),
        meta: { title: 'AddNotify', icon: 'el-icon-edit-outline' }
      },
      {
        path: 'list',
        name: 'NotifyList',
        component: () => import('@/views/notify/ReviewNotify/index'),
        meta: { title: 'NotifyList', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  // UserList
  {
    path: '/detailListTables',
    component: Layout,
    redirect: '/detailListTables/seekerList',
    name: 'Details',
    meta: { title: 'UserList', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'seekerList',
        name: 'SeekerList',
        component: () => import('@/views/detailListTables/SeekerList/index'),
        meta: { title: 'SeekerList', icon: 'table' }
      },
      {
        path: 'hrList',
        name: 'HrList',
        component: () => import('@/views/detailListTables/HrList/index'),
        meta: { title: 'HrList', icon: 'table' }
      }
    ]
  },
  // company 相关 /company/waitReview
  {
    path: '/company',
    component: Layout,
    redirect: '/company/accessCompany',
    name: 'Company',
    meta: {
      title: 'Company',
      icon: 'nested'
    },
    children: [
      {
        path: 'alreadyReview',
        component: () => import('@/views/company/AlreadyReviewCompany/index'), // Parent router-view
        name: 'AlreadyReview',
        meta: { title: 'AlreadyReview' }
      },
      {
        path: 'waitReview',
        component: () => import('@/views/company/WaitReviewCompany/index'),
        name: 'WaitReview',
        meta: { title: 'WaitReview' }
      }]
  },
  // extra link
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
