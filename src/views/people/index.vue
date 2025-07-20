<template>
  <div class="researchers-page">
    <!-- 使用Element Plus的栅格系统布局研究人员卡片 -->
    <el-row :gutter="20" justify="center">
      <!-- 循环渲染研究人员列表 -->
      <el-col 
        v-for="researcher in researchers" 
        :key="researcher.id" 
        :xs="24" :sm="12" :md="8" :lg="6"
      >
        <!-- 使用ResearcherCard组件展示研究人员信息 -->
        <researcher-card :researcher="researcher"/>
      </el-col>
    </el-row>
    
    <!-- 分页组件 -->
    <div class="pagination">
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
/* 页面容器样式 */
.researchers-page {
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 0 20px; /* 内边距 */
}

/* 研究人员卡片样式 */
.researcher-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.researcher-card:hover {
  transform: translateY(-5px);
}

.researcher-card .profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px auto;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.researcher-card .name {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
}

.researcher-card .title {
  font-size: 0.9em;
  color: #666;
  text-align: center;
  margin: 5px 0;
}

.researcher-card .department {
  font-size: 0.9em;
  color: #999;
  text-align: center;
  margin: 5px 0;
}

.researcher-card .expertise {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.researcher-card .expertise .el-tag {
  margin: 0 5px;
}

.researcher-card .publications {
  font-size: 0.9em;
  color: #666;
  text-align: center;
  margin: 10px 0;
}

.researcher-card .contact-info {
  font-size: 0.9em;
  color: #666;
  text-align: center;
  margin: 10px 0;
}

.researcher-card .bio {
  font-size: 0.9em;
  color: #666;
  text-align: justify;
  padding: 0 20px;
  margin: 10px 0;
}

/* 分页组件容器样式 */
.pagination {
  margin-top: 30px; /* 上边距 */
  display: flex; /* 弹性布局 */
  justify-content: center; /* 水平居中 */
}

.pagination .el-pagination {
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>