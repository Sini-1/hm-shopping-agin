<template>
  <div>
    <!-- 二级路由出口 -->
     <router-view/>
     <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="bag-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
     </van-tabbar>
     <div>这个tabbar要在div内部展现，自己是不具备块标签的实力的哈</div>
  </div>

</template>

<script>

export default {
  name: 'LayoutIndex'
}
</script>
