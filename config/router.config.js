export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login'
          },
          {
            name: '登录',
            path: '/user/login',
            component: './user/login',
          },
          {
            component: './404'
          }
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/index',
              },
              {
                path: '/index',
                name: '欢迎',
                icon: 'smile',
                component: './index',
                // hideInMenu: true,
              },
              {
                name: '商品管理',
                icon: 'database',
                path: '/item/list',
                component: './item/list'
              },
              {
                name: '商品配置',
                path: '/item/detail',
                component: './item/detail',
                hideInMenu: true
              },
              {
                name: '前台类目',
                icon: 'tags',
                path: '/front/category',
                component: './front/category'
              },
              // {
              //   name: '基础配置',
              //   icon: 'copy',
              //   path: '/basicConfig',
              //   component: './BasicConfig'
              // },
              {
                name: '首页配置',
                icon: 'home',
                path: '/home/page',
                component: './home/page'
              },
              {
                name: '基础数据',
                icon: 'read',
                path: '/basedata/list',
                component: './basedata/list'
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ]
  },
  {
    component: './404',
  },
]
