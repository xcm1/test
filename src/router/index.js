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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/trans',
    component: () => import('@/views/error-page/zhong'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: false }
      }
    ]
  },
  {
    path: '/registe',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/registe/index'),
        name: 'Registe',
        meta: { title: '申请注册', icon: 'form', affix: false }
      }
    ]
  },
  {
    path: '/information',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/information/index'),
        name: 'Information',
        meta: { title: '我的督学信息', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: {
  //         title: '首页',
  //         icon: 'el-icon-s-home',
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/registe',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/registe/index'),
  //       name: 'Registe',
  //       meta: {
  //         title: '申请注册',
  //         icon: 'form',
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/information',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/information/index'),
  //       name: 'Information',
  //       meta: {
  //         title: '我的督学信息',
  //         icon: 'documentation',
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/train',
    component: Layout,
    redirect: '/train/curriculum',
    alwaysShow: true, // will always show the root menu
    name: 'Train',
    meta: {
      title: '培训课程',
      icon: 'education',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'curriculum',
        component: () => import('@/views/train/curriculum'),
        name: 'CurriculumTrain',
        meta: {
          title: '培训课程',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'record',
        component: () => import('@/views/train/record'),
        name: 'RecordTrain',
        meta: {
          title: '我的培训记录'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/application',
    component: Layout,
    redirect: '/application/examine',
    alwaysShow: true, // will always show the root menu
    name: 'Application',
    meta: {
      title: '申请管理',
      icon: 'peoples',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'examine',
        component: () => import('@/views/application/examine'),
        name: 'ExamineApplication',
        meta: {
          title: '申请审核',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'interview',
        component: () => import('@/views/application/interview'),
        name: 'InterviewApplication',
        meta: {
          title: '考核面试',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'recheck',
        component: () => import('@/views/application/recheck'),
        name: 'RecheckApplication',
        meta: {
          title: '复检审核',
          roles: ['admin', 'editor']
        }
      }
    ]
  },

  {
    path: '/superintendent',
    component: Layout,
    redirect: '/superintendent/superintendent',
    children: [
      {
        path: 'superintendent',
        component: () => import('@/views/superintendent/index'),
        name: 'Superintendent',
        meta: {
          title: '督学列表',
          icon: 'list',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/train-manage',
    component: Layout,
    redirect: '/train-manage/course',
    alwaysShow: true, // will always show the root menu
    name: 'TrainManage',
    meta: {
      title: '培训管理',
      icon: 'el-icon-s-platform',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'course',
        component: () => import('@/views/train-manage/course'),
        name: 'CourseTrainManage',
        meta: {
          title: '课程列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'record',
        component: () => import('@/views/train-manage/record'),
        name: 'RecordTrainManage',
        meta: {
          title: '学时记录',
          roles: ['admin', 'editor']
        }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/class',
    alwaysShow: true, // will always show the root menu
    name: 'Statistics',
    meta: {
      title: '数据统计',
      icon: 'el-icon-s-data',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'class',
        component: () => import('@/views/statistics/class'),
        name: 'ClassStatistics',
        meta: {
          title: '分类统计',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'custom',
        component: () => import('@/views/statistics/custom'),
        name: 'CustomStatistics',
        meta: {
          title: '自定义统计',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'train',
        component: () => import('@/views/statistics/train'),
        name: 'TrainStatistics',
        meta: {
          title: '培训统计',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/recycle',
    component: Layout,
    redirect: '/recycle/index',
    children: [
      {
        path: 'recycle',
        component: () => import('@/views/recycle/index'),
        name: 'Recycle',
        meta: {
          title: '回收站',
          icon: 'el-icon-delete',
          roles: ['admin', 'editor']
        }
      }
    ]
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
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
