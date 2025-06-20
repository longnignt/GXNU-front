<template>
  <el-container class="dashboard">
    <!-- 头部 -->
    <el-header class="header">
      <div class="header-left">
        <h2>学科数据分析中心</h2>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="goToDetail">明细查询</el-button>
      </div>
    </el-header>

    <!-- 主体内容 -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside class="aside">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">排名分析</span>
          </el-menu-item>
          <!-- 其他菜单项... --> 
        </el-menu>
      </el-aside>

      <!-- 右侧主内容区 -->
      <el-main class="main">
        <!-- 数据概览 -->
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in overviewData" :key="index">
            <el-card class="overview-card">
              <div class="card-content">
                <span class="card-title">{{ item.title }}</span>
                <span class="card-value">{{ item.value }}</span>
                <span class="card-subtitle">{{ item.subtitle }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 图表和详细数据 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="chart-card">
              <div slot="header" class="chart-header">学科水平概览</div>
              <div class="chart-content">
                <!-- 在这里插入你的图表代码 -->
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="chart-card">
              <div slot="header" class="chart-header">学科布局演化 - 2023年</div>
              <div class="chart-content">
                <!-- 在这里插入你的图表代码 -->
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="chart-card">
              <div slot="header" class="chart-header">学科布局 - 各门类学科数</div>
              <div class="chart-content">
                <!-- 在这里插入你的图表代码 -->
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 更多数据展示 -->
        <el-row :gutter="20">
          <!-- 其他数据展示区域 -->
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';

const overviewData = ref([
  { title: '双一流学科数', value: '0个', subtitle: '2022年' },
  { title: '第5轮', value: '2个', subtitle: '2024年' },
  // 其他数据项...
]);

const goToDetail = () => {
  // 跳转到明细查询页面的逻辑
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #001529;
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
  width: 200px;
  background-color: #fff;
  border-right: 1px solid #e4e4e4;
}

.el-menu {
  border-right: none;
}

.el-menu-item.is-active {
  background-color: #eef1f6;
}
</style>