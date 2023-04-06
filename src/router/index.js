import Vue from 'vue';
import Router from 'vue-router';
import DocumentList from '../components/DocumentList.vue';
import RecycleBin from '../components/RecycleBin.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'DocumentList',
    component: DocumentList
  },
  {
    path: '/recycle-bin',
    name: 'RecycleBin',
    component: RecycleBin
  }
];

const router = new Router({
  routes
});

export default router;
