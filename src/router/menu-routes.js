/**
 * Created by gnnt on 2018/4/10.
 */

import Page from '@/page/page.vue'
import PageOne from '@/page/page1.vue'
import PageTwo from '@/page/page2.vue'

export default [
    {
        path: '',
        component: Page
    },
    {
        path: '/nav/first',
        component: PageOne
    },
    {
        path: '/nav/second',
        component: PageTwo
    }
]