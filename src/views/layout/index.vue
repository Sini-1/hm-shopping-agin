<template>
  <div>
    <!-- 二级路由出口 -->
     <router-view/>
     <van-tabbar active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item icon="bag-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
     </van-tabbar>
  </div>

</template>

<script>

export default {
  name: 'LayoutIndex'
}
</script>
