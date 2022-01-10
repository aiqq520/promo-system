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
                component: './home',
                // hideInMenu: true,
              },
              {
                name: '属性管理',
                icon: 'appstore',
                path: '/property',
                routes: [
                  {
                    name: '属性项列表',
                    path: '/property/propertyKey',
                    component: './Property/propertyKey'
                  },
                  {
                    name: '属性值列表',
                    path: '/property/propertyValue',
                    component: './Property/propertyValue'
                  }
                ]
              },
              {
                name: '类目管理',
                icon: 'database',
                path: '/category',
                routes: [
                  {
                    name: '类目属性管理',
                    path: '/category/property',
                    component: './Category/property'
                  },
                  {
                    name: '类目经营者列表',
                    path: '/category/manager',
                    component: './Category/manager'
                  },
                  {
                    name: '类目管理',
                    path: '/category/move',
                    component: './Category/move'
                  }
                ],
              },
              {
                name: '前台类目',
                icon: 'tags',
                path: '/frontCategory',
                component: './FrontCategory'
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
                path: '/indexConfig',
                component: './IndexConfig'
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
