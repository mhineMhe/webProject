export default {
    routes: [
        {

            path: '/HomePage',
            name: 'HomePage',
            component: resolve => require(['modules/basic/Register&LoginPage.vue'], resolve),
            meta: {
                tokenRequired: false
            }

        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: resolve => require(['modules/basic/Dashboard.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/personalinformation',
            name: 'personalinformation',
            component: resolve => require(['modules/basic/PersonalInfo.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/copyProfile',
            name: 'copyProfile',
            component: resolve => require(['modules/basic/copyProfile.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/profileUser',
            name: 'profileUser',
            component: resolve => require(['modules/basic/profileUser.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/authorizationForm',
            name: 'authorizationForm',
            component: resolve => require(['modules/basic/authPage.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/dashboardPartneredUser',
            name: 'dashboardPartneredUser',
            component: resolve => require(['modules/basic/DashboardPartneredUser.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: '/viewAuth',
            name: 'viewAuth',
            component: resolve => require(['modules/basic/viewAuthPage.vue'], resolve),
            meta: {
                tokenRequired: true
            }
        }
    ]
}