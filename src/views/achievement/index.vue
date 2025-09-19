<!-- src/views/PromotionPage.vue -->
<template>
  <div class="promotion-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <el-page-header 
        title="成果推广" 
        content="学科建设成果推广宣传"
        @back="goBack"
      >
        <template #content>
          <span class="page-title">学科建设成果推广宣传</span>
        </template>
        <template #extra>
          <div class="header-actions">
            <el-button type="primary" :icon="Share" @click="sharePage">
              分享
            </el-button>
            <el-button :icon="Download" @click="downloadAll">
              下载全部资料
            </el-button>
          </div>
        </template>
      </el-page-header>
    </div>

    <!-- 主要内容区域 -->
    <el-row :gutter="20" class="main-content">
      <!-- 左侧主要内容 -->
      <el-col :span="17">
        <!-- Banner横幅 -->
        <el-card class="banner-card" shadow="hover">
          <div class="banner-content">
            <div class="banner-text">
              <h2 class="banner-title">引领学科发展，赋能教育创新</h2>
              <p class="banner-subtitle">基于大数据驱动的学科分析与建设指导平台</p>
              <div class="banner-actions">
                <el-button type="primary" size="large" :icon="View">
                  查看详细报告
                </el-button>
                <el-button size="large" :icon="Service">
                  联系我们
                </el-button>
              </div>
            </div>
            <div class="banner-image">
              <el-image
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                fit="cover"
                class="banner-img"
              />
            </div>
          </div>
        </el-card>

        <!-- 核心功能 -->
        <el-card class="section-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>核心功能</h3>
              <el-tag type="success">教育科技融合</el-tag>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="feature-card" shadow="never">
                <el-statistic :value="98" suffix="%">
                  <template #title>
                    <div class="feature-icon">
                      <el-icon><TrendChart /></el-icon>
                    </div>
                    <div class="feature-title">学科发展监测</div>
                  </template>
                  <template #suffix>
                    <div class="feature-desc">准确率提升</div>
                  </template>
                </el-statistic>
                <p class="feature-text">实时监测学科发展动态，提供前瞻性发展建议</p>
              </el-card>
            </el-col>
            
            <el-col :span="8">
              <el-card class="feature-card" shadow="never">
                <el-statistic :value="10000" suffix="+">
                  <template #title>
                    <div class="feature-icon">
                      <el-icon><DataAnalysis /></el-icon>
                    </div>
                    <div class="feature-title">教育数据分析</div>
                  </template>
                  <template #suffix>
                    <div class="feature-desc">数据点处理</div>
                  </template>
                </el-statistic>
                <p class="feature-text">深度挖掘教育数据价值，助力科学决策</p>
              </el-card>
            </el-col>
            
            <el-col :span="8">
              <el-card class="feature-card" shadow="never">
                <el-statistic :value="95" suffix="%">
                  <template #title>
                    <div class="feature-icon">
                      <el-icon><Management /></el-icon>
                    </div>
                    <div class="feature-title">人才培养评估</div>
                  </template>
                  <template #suffix>
                    <div class="feature-desc">满意度提升</div>
                  </template>
                </el-statistic>
                <p class="feature-text">全面评估人才培养质量，优化培养方案</p>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 研究成果时间线 -->
        <el-card class="section-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>教育研究成果</h3>
              <el-tag type="primary">持续更新</el-tag>
            </div>
          </template>
          
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              placement="top"
              :type="index === 0 ? 'primary' : 'info'"
              :size="index === 0 ? 'large' : 'normal'"
              :hollow="index !== 0"
            >
              <el-card shadow="hover">
                <h4>{{ activity.content }}</h4>
                <p>{{ activity.description }}</p>
                <div class="timeline-actions" v-if="activity.resources">
                  <el-button 
                    v-for="(resource, rIndex) in activity.resources" 
                    :key="rIndex"
                    :type="resource.type"
                    size="small"
                    :icon="Download"
                    @click="downloadResource(resource.name)"
                  >
                    {{ resource.name }}
                  </el-button>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>

        <!-- 合作伙伴评价 -->
        <el-card class="section-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>合作伙伴评价</h3>
              <el-tag type="warning">真实反馈</el-tag>
            </div>
          </template>
          
          <el-carousel 
            height="250px" 
            indicator-position="outside"
            arrow="always"
            :autoplay="true"
            :interval="5000"
          >
            <el-carousel-item v-for="(testimonial, index) in testimonials" :key="index">
              <div class="testimonial-content">
                <div class="testimonial-avatar">
                  <el-avatar :size="60" :icon="User" />
                </div>
                <p class="testimonial-text">"{{ testimonial.text }}"</p>
                <p class="testimonial-author">—— {{ testimonial.author }}</p>
                <p class="testimonial-position">{{ testimonial.position }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>

      <!-- 右侧侧边栏 -->
      <el-col :span="7">
        <!-- 教育合作 -->
        <el-card class="sidebar-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>教育合作</h3>
            </div>
          </template>
          
          <div class="contact-content">
            <p>欢迎各级教育机构开展学科建设合作：</p>
            <ul>
              <li>
                <el-icon><School /></el-icon>
                高等院校学科评估与优化
              </li>
              <li>
                <el-icon><Document /></el-icon>
                教育政策效果分析
              </li>
              <li>
                <el-icon><User /></el-icon>
                人才培养质量提升方案
              </li>
              <li>
                <el-icon><DataAnalysis /></el-icon>
                学科建设决策支持系统
              </li>
            </ul>
            
            <el-divider />
            
            <div class="contact-info">
              <h4>联系我们</h4>
              <div class="contact-item">
                <el-icon><Phone /></el-icon>
                <span>电话：XXX-XXXX-XXXX</span>
              </div>
              <div class="contact-item">
                <el-icon><Message /></el-icon>
                <span>邮箱：contact@example.com</span>
              </div>
              <div class="contact-item">
                <el-icon><Location /></el-icon>
                <span>地址：广西师范大学</span>
              </div>
            </div>
            
            <el-button type="primary" class="contact-btn" :icon="Service" block>
              立即咨询
            </el-button>
          </div>
        </el-card>

        <!-- 资源共享 -->
        <el-card class="sidebar-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>教育资源共享</h3>
            </div>
          </template>
          
          <div class="resources-content">
            <el-collapse v-model="activeResource">
              <el-collapse-item title="宣传资料" name="1">
                <div class="resource-item">
                  <el-button type="primary" link :icon="Download" @click="downloadResource('宣传手册')">
                    宣传手册.pdf
                  </el-button>
                  <el-tag size="small">5.2MB</el-tag>
                </div>
                <div class="resource-item">
                  <el-button type="primary" link :icon="Download" @click="downloadResource('宣传PPT')">
                    宣传演示文稿.pptx
                  </el-button>
                  <el-tag size="small">12.8MB</el-tag>
                </div>
              </el-collapse-item>
              
              <el-collapse-item title="研究报告" name="2">
                <div class="resource-item">
                  <el-button type="success" link :icon="Download" @click="downloadResource('研究报告')">
                    学科发展研究报告.pdf
                  </el-button>
                  <el-tag size="small" type="success">8.5MB</el-tag>
                </div>
                <div class="resource-item">
                  <el-button type="success" link :icon="Download" @click="downloadResource('数据分析报告')">
                    教育数据分析报告.pdf
                  </el-button>
                  <el-tag size="small" type="success">15.3MB</el-tag>
                </div>
              </el-collapse-item>
              
              <el-collapse-item title="案例集锦" name="3">
                <div class="resource-item">
                  <el-button type="warning" link :icon="Download" @click="downloadResource('成功案例集')">
                    成功案例集.pdf
                  </el-button>
                  <el-tag size="small" type="warning">22.1MB</el-tag>
                </div>
                <div class="resource-item">
                  <el-button type="warning" link :icon="Download" @click="downloadResource('最佳实践')">
                    最佳实践案例.docx
                  </el-button>
                  <el-tag size="small" type="warning">7.6MB</el-tag>
                </div>
              </el-collapse-item>
            </el-collapse>
            
            <el-alert
              title="资料更新提醒"
              type="info"
              description="我们将定期更新最新的研究成果和案例，请关注下载页面获取最新资料。"
              show-icon
              closable
            />
          </div>
        </el-card>

        <!-- 数据统计 -->
        <el-card class="sidebar-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>平台影响力</h3>
            </div>
          </template>
          
          <div class="stats-content">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-statistic :value="150" title="合作院校">
                  <template #prefix>
                    <el-icon><School /></el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="12">
                <el-statistic :value="85" title="科研项目">
                  <template #prefix>
                    <el-icon><DataAnalysis /></el-icon>
                  </template>
                </el-statistic>
              </el-col>
            </el-row>
            
            <el-row :gutter="10" style="margin-top: 20px;">
              <el-col :span="12">
                <el-statistic :value="5000" title="服务师生">
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="12">
                <el-statistic :value="98" suffix="%" title="满意度">
                  <template #prefix>
                    <el-icon><TrendChart /></el-icon>
                  </template>
                </el-statistic>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  TrendChart,
  DataAnalysis,
  Management,
  Download,
  Document,
  Collection,
  Share,
  View,
  Service,
  User,
  School,
  Phone,
  Message,
  Location
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeResource = ref(['1'])

const activities = ref([
  {
    content: '学科评估指标体系优化',
    timestamp: '2023-05-15',
    description: '构建了更加科学合理的学科评估指标体系，已在多所高校推广应用',
    resources: [
      { name: '指标体系文档', type: 'primary' },
      { name: '应用案例', type: 'success' }
    ]
  },
  {
    content: '教育大数据分析平台上线',
    timestamp: '2023-07-22',
    description: '上线集成化教育数据分析平台，支持多维度教育数据挖掘'
  },
  {
    content: '人才培养质量评估模型发布',
    timestamp: '2023-09-30',
    description: '发布基于产出导向的人才培养质量评估模型，准确率达95%以上'
  },
  {
    content: '区域教育发展研究报告发布',
    timestamp: '2023-11-18',
    description: '完成区域教育发展现状调研，为教育政策制定提供数据支撑'
  }
])

const testimonials = ref([
  {
    text: "通过使用该平台，我校学科建设水平显著提升，第五轮学科评估中多个学科取得突破性进展。",
    author: "李校长",
    position: "某重点大学校长"
  },
  {
    text: "数据分析报告为我们的人才培养方案优化提供了重要参考，学生就业质量明显提升。",
    author: "王院长",
    position: "某高校教务处处长"
  },
  {
    text: "平台的学科发展预测功能非常准确，帮助我们提前布局新兴交叉学科方向。",
    author: "张主任",
    position: "某省教育厅高教处处长"
  }
])

const downloadResource = (resourceName) => {
  ElMessage.success(`正在下载《${resourceName}》，请稍候...`)
  // 实际项目中这里会实现真实的下载逻辑
}

const downloadAll = () => {
  ElMessageBox.confirm(
    '即将下载全部资料包（约50MB），是否继续？',
    '下载确认',
    {
      confirmButtonText: '确认下载',
      cancelButtonText: '取消',
      type: 'info',
    }
  ).then(() => {
    ElMessage.success('开始下载全部资料包，请稍候...')
  }).catch(() => {
    ElMessage.info('已取消下载')
  })
}

const sharePage = () => {
  ElMessage.success('分享链接已复制到剪贴板')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.promotion-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 84px);
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.main-content {
  margin-bottom: 20px;
}

/* Banner样式 */
.banner-card {
  margin-bottom: 20px;
  background: linear-gradient(120deg, #409eff 0%, #1890ff 100%);
  color: white;
  border: none;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.banner-text {
  flex: 1;
}

.banner-title {
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: bold;
}

.banner-subtitle {
  font-size: 16px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.banner-actions {
  display: flex;
  gap: 15px;
}

.banner-image {
  flex: 1;
  max-width: 300px;
}

.banner-img {
  border-radius: 8px;
  width: 100%;
  height: 200px;
}

/* 卡片样式 */
.section-card, .sidebar-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

/* 功能卡片样式 */
.feature-card {
  text-align: center;
  border: none;
  background-color: #f0f8ff;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 32px;
  color: #409eff;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 12px;
  color: #999;
}

.feature-text {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

/* 时间线样式 */
.timeline-actions {
  margin-top: 15px;
}

.timeline-actions .el-button {
  margin-right: 10px;
}

/* 评价卡片样式 */
.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.testimonial-avatar {
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 16px;
  font-style: italic;
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
}

.testimonial-author {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.testimonial-position {
  color: #999;
  font-size: 14px;
}

/* 侧边栏样式 */
.contact-content ul {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.contact-content li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.contact-info {
  margin: 20px 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
}

.contact-btn {
  margin-top: 20px;
}

/* 资源样式 */
.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.resource-item .el-button {
  flex: 1;
  text-align: left;
  justify-content: flex-start;
}

.stats-content {
  padding: 10px 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .banner-content {
    flex-direction: column;
  }
  
  .banner-image {
    max-width: 100%;
  }
  
  .el-col-17, .el-col-7 {
    width: 100%;
  }
  
  .el-col-17 {
    margin-bottom: 20px;
  }
}
</style>