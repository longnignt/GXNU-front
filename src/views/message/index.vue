<template>
  <div class="news-layout">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-content">
        <div class="logo">
          <el-icon size="30" color="#409EFF"><Management /></el-icon>
          <span class="logo-text">教育资讯</span>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">政策</el-menu-item>
          <el-menu-item index="3">教学</el-menu-item>
          <el-menu-item index="4">科研</el-menu-item>
          <el-menu-item index="5">校园</el-menu-item>
        </el-menu>
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索教育资讯..."
            class="search-input"
            clearable
          >
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </div>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-container class="main-container">
      <!-- 轮播图区域 -->
      <el-main class="main-content">
        <el-carousel 
          height="300px" 
          indicator-position="outside"
          class="news-carousel"
        >
          <el-carousel-item v-for="item in carouselItems" :key="item.id">
            <div class="carousel-item" @click="goToDetail(item)">
              <img :src="item.image" :alt="item.title" class="carousel-image" />
              <div class="carousel-overlay">
                <h3 class="carousel-title">{{ item.title }}</h3>
                <p class="carousel-desc">{{ item.description }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        <!-- 新闻分类标签 -->
        <div class="news-tags">
          <el-tag 
            v-for="tag in newsTags" 
            :key="tag" 
            :type="tag === activeTag ? 'primary' : ''"
            class="tag-item"
            @click="switchTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>

        <!-- 新闻列表 -->
        <div class="news-list">
          <el-row :gutter="20">
            <el-col 
              :span="24" 
              v-for="news in paginatedNews" 
              :key="news.id"
              class="news-item-col"
            >
              <el-card 
                class="news-card" 
                shadow="hover"
                @click="goToDetail(news)"
              >
                <el-row :gutter="20">
                  <el-col :span="6">
                    <img :src="news.image" :alt="news.title" class="news-image" />
                  </el-col>
                  <el-col :span="18">
                    <div class="news-content">
                      <h3 class="news-title">{{ news.title }}</h3>
                      <p class="news-summary">{{ news.summary }}</p>
                      <div class="news-meta">
                        <span class="news-source">{{ news.source }}</span>
                        <span class="news-time">{{ news.time }}</span>
                        <el-tag size="small" class="news-category">{{ news.category }}</el-tag>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20]"
            :small="false"
            :disabled="false"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredNews.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-main>

      <!-- 侧边栏 -->
      <el-aside width="300px" class="sidebar">
        <el-card class="sidebar-card" header="热门资讯">
          <div 
            v-for="(hotNews, index) in hotNewsList" 
            :key="hotNews.id"
            class="hot-news-item"
            @click="goToDetail(hotNews)"
          >
            <span class="hot-rank">{{ index + 1 }}</span>
            <div class="hot-content">
              <h4 class="hot-title">{{ hotNews.title }}</h4>
              <div class="hot-meta">
                <span class="hot-source">{{ hotNews.source }}</span>
                <span class="hot-time">{{ hotNews.time }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="sidebar-card" header="推荐阅读">
          <div 
            v-for="recommend in recommendList" 
            :key="recommend.id"
            class="recommend-item"
            @click="goToDetail(recommend)"
          >
            <img :src="recommend.image" :alt="recommend.title" class="recommend-image" />
            <div class="recommend-content">
              <h4 class="recommend-title">{{ recommend.title }}</h4>
              <p class="recommend-summary">{{ recommend.summary }}</p>
            </div>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Management } from '@element-plus/icons-vue'

// 菜单激活项
const activeIndex = ref('1')
const handleSelect = (key) => {
  console.log('选中菜单项:', key)
}

// 搜索查询
const searchQuery = ref('')

// 轮播图数据 - 教育相关
const carouselItems = ref([
  {
    id: 1,
    title: '新时代教育评价改革总体方案发布',
    description: '教育部发布重要文件，推动教育评价体系改革',
    image: 'https://picsum.photos/800/300?random=101'
  },
  {
    id: 2,
    title: '人工智能在教育领域的应用前景',
    description: 'AI技术如何改变传统教学模式',
    image: 'https://picsum.photos/800/300?random=102'
  },
  {
    id: 3,
    title: '职业教育改革实施方案解读',
    description: '国家推动职业教育高质量发展',
    image: 'https://picsum.photos/800/300?random=103'
  }
])

// 新闻标签 - 教育相关
const newsTags = ref(['全部', '政策', '教学', '科研', '校园', '国际'])
const activeTag = ref('全部')
const switchTag = (tag) => {
  activeTag.value = tag
}

// 新闻列表数据 - 教育相关
const newsList = ref([
  {
    id: 1,
    title: '教育部启动新时代振兴中西部高等教育攻坚行动',
    summary: '为推动中西部高等教育高质量发展，教育部近日启动新时代振兴中西部高等教育攻坚行动...',
    image: 'https://picsum.photos/200/150?random=104',
    source: '中国教育报',
    time: '2023-06-15 10:30',
    category: '政策',
    content: '详细内容...'
  },
  {
    id: 2,
    title: '在线教育平台如何提升教学质量',
    summary: '随着教育数字化转型加速，在线教育平台在教学中的作用日益凸显，如何提升教学质量成为关注焦点...',
    image: 'https://picsum.photos/200/150?random=105',
    source: '教育技术杂志',
    time: '2023-06-14 15:45',
    category: '教学',
    content: '详细内容...'
  },
  {
    id: 3,
    title: '新高考改革在各省份稳步推进',
    summary: '今年新高考改革在多个省份落地实施，各地积极探索适应新高考的教学和管理模式...',
    image: 'https://picsum.photos/200/150?random=106',
    source: '考试院',
    time: '2023-06-13 09:20',
    category: '政策',
    content: '详细内容...'
  },
  {
    id: 4,
    title: '高校毕业生就业形势分析报告发布',
    summary: '最新报告显示，2023年高校毕业生就业形势总体稳定，新兴行业提供更多就业机会...',
    image: 'https://picsum.photos/200/150?random=107',
    source: '就业指导中心',
    time: '2023-06-12 14:10',
    category: '校园',
    content: '详细内容...'
  },
  {
    id: 5,
    title: '教育信息化2.0行动计划取得显著成效',
    summary: '近年来，各地积极推进教育信息化建设，数字化教学资源日益丰富，师生信息素养明显提升...',
    image: 'https://picsum.photos/200/150?random=108',
    source: '教育信息化网',
    time: '2023-06-11 11:55',
    category: '科研',
    content: '详细内容...'
  }
])

// 热门资讯 - 教育相关
const hotNewsList = ref([
  { id: 101, title: '中外合作办学项目质量不断提升', source: '国际教育交流', time: '2小时前' },
  { id: 102, title: '职业教育法修订草案亮点解读', source: '法律与教育', time: '3小时前' },
  { id: 103, title: '教育评价改革推进素质教育发展', source: '教育改革研究', time: '5小时前' },
  { id: 104, title: '高校科研成果转化机制创新', source: '科技创新报', time: '1天前' },
  { id: 105, title: '智慧校园建设标准正式发布', source: '教育信息化', time: '1天前' }
])

// 推荐阅读 - 教育相关
const recommendList = ref([
  {
    id: 201,
    title: '新时代高校人才培养模式创新',
    summary: '探讨高等教育人才培养的新理念和新路径',
    image: 'https://picsum.photos/80/60?random=109'
  },
  {
    id: 202,
    title: '教育公平与质量提升双路径',
    summary: '分析教育公平与质量的关系及提升策略',
    image: 'https://picsum.photos/80/60?random=110'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(5)

const filteredNews = computed(() => {
  let result = newsList.value
  if (activeTag.value !== '全部') {
    result = result.filter(news => news.category === activeTag.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(news => 
      news.title.toLowerCase().includes(query) || 
      news.summary.toLowerCase().includes(query)
    )
  }
  return result
})

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredNews.value.slice(start, end)
})

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 跳转到详情页
const goToDetail = (item) => {
  console.log('查看详情:', item)
  // 这里可以实现路由跳转逻辑
}
</script>

<style scoped>
.news-layout {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: #333;
}

.nav-menu {
  flex: 1;
  border-bottom: none !important;
}

.search-box {
  width: 250px;
  margin-left: 20px;
}

.main-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.news-carousel {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.carousel-item {
  position: relative;
  cursor: pointer;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px;
  color: white;
}

.carousel-title {
  font-size: 24px;
  margin: 0 0 10px 0;
}

.carousel-desc {
  font-size: 16px;
  margin: 0;
}

.news-tags {
  margin-bottom: 20px;
}

.tag-item {
  margin-right: 10px;
  cursor: pointer;
}

.news-list {
  margin-bottom: 20px;
}

.news-item-col {
  margin-bottom: 20px;
}

.news-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.news-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.news-content {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.news-summary {
  color: #666;
  line-height: 1.5;
  flex: 1;
  margin: 0 0 15px 0;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.news-source {
  margin-right: 15px;
}

.news-time {
  margin-right: 15px;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.sidebar {
  padding-left: 20px;
}

.sidebar-card {
  margin-bottom: 20px;
}

.hot-news-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.hot-news-item:last-child {
  border-bottom: none;
}

.hot-rank {
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
  width: 30px;
  flex-shrink: 0;
}

.hot-content {
  flex: 1;
}

.hot-title {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
}

.hot-meta {
  display: flex;
  font-size: 12px;
  color: #999;
}

.hot-source {
  margin-right: 10px;
}

.recommend-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.recommend-item:last-child {
  border-bottom: none;
}

.recommend-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
  flex-shrink: 0;
}

.recommend-title {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
}

.recommend-summary {
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}
</style>