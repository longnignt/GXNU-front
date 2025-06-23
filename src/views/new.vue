<template>
  <el-container class="dashboard">
    <!-- 头部 -->
    <el-header class="header">
      <div class="header-left">
        <h2>学科数据分析中心</h2>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="goToDetail">个人中心</el-button>
      </div>
    </el-header>

    <!-- 主体内容 -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside class="aside">
          <el-menu  class="el-menu-vertical-demo"   v-model:default-active="activeMenu"  @select="handleMenuSelect">
          <el-sub-menu index="1">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>中心概况</span>
             </div>                                  
          </template>
          <el-menu-item index="1-1">
          <div class="menu-item-content">
          <span>中心简介</span>
          </div>
          </el-menu-item>
          <el-menu-item index="1-2">
          <div class="menu-item-content">
          <span>组织架构</span>
          </div>
          </el-menu-item>
          <el-menu-item index="1-3">
          <div class="menu-item-content">
          <span>研究团队</span>
          </div>
          </el-menu-item>
          </el-sub-menu>


          <el-sub-menu index="2">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>学科概况</span>
             </div>
          </template>
          <el-menu-item index="2-1">
          <div class="menu-item-content">
          <span>学科水平概览</span>
          </div>
          </el-menu-item>
          <el-menu-item index="2-2">
          <div class="menu-item-content">
          <span>学科布局演化</span>
          </div>
          </el-menu-item>
          <el-menu-item index="2-3">
          <div class="menu-item-content">
          <span>学科布局排名</span>
          </div>
          </el-menu-item>
          <el-menu-item index="2-4">
          <div class="menu-item-content">
          <span>学科评估结果</span>
          </div>
          </el-menu-item>
          </el-sub-menu>


          <el-sub-menu index="3">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>专项分析</span>
             </div>
          </template>
          <el-menu-item index="3-1">
          <div class="menu-item-content">
          <span>单个学科建设</span>
          </div>
          </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>情报消息</span>
             </div>
          </template>
          <el-menu-item index="4-1">
          <div class="menu-item-content">
          <span>业界消息</span>
          </div>
          </el-menu-item>
           <el-menu-item index="4-2">
          <div class="menu-item-content">
          <span>学科发展信息</span>
          </div>
          </el-menu-item>
           <el-menu-item index="4-3">
          <div class="menu-item-content">
          <span>双一流建设</span>
          </div>
          </el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="5">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>数据与资源</span>
             </div>
          </template>
          <el-menu-item index="5-1">
          <div class="menu-item-content">
          <span>科学研究</span>
          </div>
          </el-menu-item>
          <el-menu-item index="5-2">
          <div class="menu-item-content">
          <span>人才培养</span>
          </div>
          </el-menu-item>
          <el-menu-item index="5-3">
          <div class="menu-item-content">
          <span>社会服务</span>
          </div>
          </el-menu-item>
          <el-menu-item index="5-4">
          <div class="menu-item-content">
          <span>学科特色与方向</span>
          </div>
          </el-menu-item>
          <el-menu-item index="5-5">
          <div class="menu-item-content">
          <span>国际合作与交流</span>
          </div>
          </el-menu-item>        
          </el-sub-menu>

          <el-sub-menu index="6">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>成果推广</span>
             </div>
          </template>
          <el-menu-item index="6-1">
          <div class="menu-item-content">
          <span>推广宣传</span>
          </div>
          </el-menu-item>
          <el-menu-item index="6-2">
          <div class="menu-item-content">
          <span>第三方成果及资源</span>
          </div>
          </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="7">
          <template #title>
             <div class="menu-item-content">
             <HomeFilled style="width: 1.2em; height: 1.2em; color: white;" />
             <span>用户管理</span>
             </div>
          </template>
          <el-menu-item index="7-1">
          <div class="menu-item-content">
          <span>权限</span>
          </div>
          </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 右侧主内容区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { HomeFilled, Document } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleMenuSelect = (index) => {
  // 根据 index 映射到对应的路由路径
  const routes = {
    '1-1': '/middle', // 学科水平概览
     '2-1':'/order'
  };

  if (routes[index]) {
    router.push(routes[index]);
  }
};
const activeMenu = ref('');
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #030541;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  flex: 1;
  text-align: center;
}

.header-right {
  margin-left: auto;
}

.main {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
}

.overview-card {
  height: 100px;
  text-align: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-title {
  font-size: 14px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
}

.card-subtitle {
  font-size: 12px;
  color: #999;
}

.chart-card {
  height: 300px;
}

.chart-header {
  font-weight: bold;
}

.chart-content {
  height: 240px;
  /* 这里可以放置你的图表 */
}

.aside {
  width: 100px;
  background-color:#030541;
  border-right: none;
}
.el-menu-item {
  position: relative;
  height: 74px;
}
.el-menu {
  border-right: none;
  background-color:#030541
}

.el-menu-item.is-active {
  background-color: #514DEF !important;
}
.menu-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute; /* 设置为绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度与父容器相同 */
  height: 100%; /* 高度与父容器相同 */
}
.menu-item-content span {
  height: 30px;
  width: 64px;
  font-size: 12px;
  color: white;
  text-align: center; /* 文本水平居中 */
  
}
.el-sub-menu .el-menu-item {
  padding-left: 0 !important; /* 确保子菜单项紧靠左侧 */
  background-color: #56577e;
  border: 1px solid rgba(255, 255, 255, 0.2);
} 

.el-sub-menu__title {
  padding-left: 0 !important; /* 确保子菜单标题紧靠左侧 */

}

.el-menu--inline .el-menu-item {
  padding-left: 0 !important; /* 确保内联菜单项紧靠左侧 */
}
.el-menu-item span {
  color: white !important;
}
.el-menu-item span {
  color: white !important;
}
</style> 