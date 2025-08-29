import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Products from '../views/Products.vue';
import ProductDetail from '../views/ProductDetail.vue';
import MyProducts from '../views/MyProducts.vue';
import AddProduct from '../views/AddProduct.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    props: {
        apiUrl: 'http://localhost:8000/api/products/',
        title: 'Все товары'
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-products',
    name: 'MyProducts',
    component: MyProducts,
    props: {
        apiUrl: 'http://localhost:8000/api/products/mine/',
        title: 'Мои товары'
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const accessToken = localStorage.getItem('access_token');

  if (requiresAuth && !accessToken) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;