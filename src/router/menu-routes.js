/**
 * Created by gnnt on 2018/4/10.
 */

import Page from '@/page/page.vue'
import PageOne from '@/page/trade/page1.vue'
import PageTwo from '@/page/trade/page2.vue'
import PageThree from '@/page/trade/page3.vue'
import PageFour from '@/page/trade/page4.vue'

export default [
    {
        path: '',
        component: Page
    },
    {
        path: '/nav/1',
        component: PageOne
    },
    {
        path: '/nav/2',
        component: PageTwo
    },
    {
        path: '/nav/3',
        component: PageThree
    },
    {
        path: '/nav/4',
        component: PageFour
    }
]