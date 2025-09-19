<template>
  <div class="researchers-page">
    <!-- 上半部分：卡片区域 -->
    <div class="cards-section">
      <el-row :gutter="20" justify="start">
        <el-col
          v-for="researcher in researchers"
          :key="researcher.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <researcher-card :researcher="researcher" />
        </el-col>
      </el-row>
    </div>

    <!-- 下半部分：分页区域 -->
    <div class="pagination-section">
      <el-pagination
        layout="prev, pager, next"
        :total="totalResearchers"
        :current-page="currentPage"
        @current-change="loadResearchers"
      />
    </div>
  </div>
</template>

<script>
import ResearcherCard from './components/ResearcherCard.vue';

export default {
  name: 'ResearcherList',
  components: { ResearcherCard },
  data() {
    return {
      allResearchers: [
        {
          id: 1,
          name: '张三',
          title: '教授',
          department: '计算机科学系',
          expertise: ['人工智能', '机器学习'],
          publications: 85,
          profileImage: 'https://via.placeholder.com/150',
          bio: '张三教授在人工智能领域有超过20年研究经验，主要研究方向包括机器学习',
          contact: {
            email: 'zhangsan@example.com',
            phone: '138-1234-5678'
          }
        },
        {
          id: 2,
          name: '李四',
          title: '副教授',
          department: '数据科学系',
          expertise: ['大数据分析', '数据挖掘'],
          publications: 56,
          profileImage: 'https://via.placeholder.com/150',
          bio: '李四副教授专注于大数据分析和数据挖掘领域，已发表多篇高水平论文。',
          contact: {
            email: 'lisi@example.com',
            phone: '139-8765-4321'
          }
        },
        {
          id: 3,
          name: '王五',
          title: '讲师',
          department: '软件工程系',
          expertise: ['软件架构', 'Web开发'],
          publications: 32,
          profileImage: 'https://via.placeholder.com/150',
          bio: '王五讲师在软件架构设计和Web开发领域有丰富经验，教授多门相关课程。',
          contact: {
            email: 'wangwu@example.com',
            phone: '137-5555-6666'
          }
        }
      ],
      researchers: [],
      totalResearchers: 0,
      currentPage: 1,
      researchersPerPage: 6
    };
  },
  mounted() {
    this.totalResearchers = this.allResearchers.length;
    this.loadResearchers(1);
  },
  methods: {
    loadResearchers(page) {
      const startIndex = (page - 1) * this.researchersPerPage;
      const endIndex = startIndex + this.researchersPerPage;
      this.researchers = this.allResearchers.slice(startIndex, endIndex);
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
.researchers-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 占满整个视口高度 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 上半部分：卡片区域 */
.cards-section {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

/* 卡片行布局 */
.cards-section .el-row {
  margin-bottom: 20px;
}

/* 下半部分：分页区域 */
.pagination-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
}

/* 分页组件样式 */
.pagination-section .el-pagination {
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>