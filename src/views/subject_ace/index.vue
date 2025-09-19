<!-- SubjectEvaluation.vue -->
<template>
  <div class="evaluation-container">
    <div class="header">
      <h1 class="title">学科评估结果</h1>
      <div class="filters">
        <el-select v-model="selectedYear" placeholder="选择年份" class="filter-item">
          <el-option label="2023年" value="2023"></el-option>
          <el-option label="2022年" value="2022"></el-option>
          <el-option label="2021年" value="2021"></el-option>
        </el-select>
        <el-select v-model="selectedCategory" placeholder="选择类别" class="filter-item">
          <el-option label="理工类" value="理工类"></el-option>
          <el-option label="文史类" value="文史类"></el-option>
          <el-option label="医学类" value="医学类"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>

    <div class="stats-summary">
      <div class="stat-card">
        <div class="stat-icon" style="background-color: #E8F5E9;">
          <i class="el-icon-trophy" style="color: #4CAF50;"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">98</div>
          <div class="stat-label">优秀学科</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background-color: #E3F2FD;">
          <i class="el-icon-medal" style="color: #2196F3;"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">156</div>
          <div class="stat-label">参评学科</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon" style="background-color: #FFF3E0;">
          <i class="el-icon-star-on" style="color: #FF9800;"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">89.5%</div>
          <div class="stat-label">满意度</div>
        </div>
      </div>
    </div>

    <!-- 新增可视化图表区域 -->
    <div class="charts-container">
      <div class="chart-card">
        <div class="chart-header">
          <h3>学科等级分布</h3>
        </div>
        <div ref="levelChart" class="chart-content"></div>
      </div>
      
      <div class="chart-card">
        <div class="chart-header">
          <h3>学科类别分布</h3>
        </div>
        <div ref="categoryChart" class="chart-content"></div>
      </div>
    </div>

    <div class="evaluation-table">
      <el-table 
        :data="evaluationData" 
        style="width: 100%" 
        :row-class-name="tableRowClassName"
        v-loading="loading"
      >
        <el-table-column prop="rank" label="排名" width="80" align="center">
          <template #default="scope">
            <div class="rank-cell">
              <span v-if="scope.row.rank === 1" class="rank-badge gold">1</span>
              <span v-else-if="scope.row.rank === 2" class="rank-badge silver">2</span>
              <span v-else-if="scope.row.rank === 3" class="rank-badge bronze">3</span>
              <span v-else class="rank-normal">{{ scope.row.rank }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="subject" label="学科名称" width="200">
          <template #default="scope">
            <div class="subject-cell">
              <i :class="getSubjectIcon(scope.row.category)" class="subject-icon"></i>
              <span>{{ scope.row.subject }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="category" label="学科类别" width="120" align="center"></el-table-column>
        
        <el-table-column prop="score" label="评估得分" width="120" align="center">
          <template #default="scope">
            <div class="score-cell">
              <el-progress 
                :percentage="scope.row.score" 
                :stroke-width="10" 
                :show-text="false"
                :color="getScoreColor(scope.row.score)"
              ></el-progress>
              <span class="score-text">{{ scope.row.score }}分</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="level" label="评估等级" width="120" align="center">
          <template #default="scope">
            <div class="level-cell" :class="getLevelClass(scope.row.level)">
              {{ scope.row.level }}
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="trend" label="趋势" width="100" align="center">
          <template #default="scope">
            <div class="trend-cell">
              <i :class="scope.row.trend > 0 ? 'el-icon-top' : 'el-icon-bottom'" 
                 :style="{ color: scope.row.trend > 0 ? '#4CAF50' : '#F44336' }"></i>
              <span :style="{ color: scope.row.trend > 0 ? '#4CAF50' : '#F44336' }">
                {{ Math.abs(scope.row.trend) }}
              </span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="mini" @click="viewDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="学科评估详情" v-model="dialogVisible" width="70%">
      <div v-if="selectedSubject" class="detail-content">
        <div class="detail-header">
          <h2>{{ selectedSubject.subject }} 评估报告</h2>
          <div class="detail-rank">
            <span class="rank-badge" :class="getRankClass(selectedSubject.rank)">
              {{ selectedSubject.rank }}
            </span>
          </div>
        </div>
        
        <div class="detail-charts">
          <div class="chart-item">
            <h3>各项指标得分</h3>
            <div ref="radarChart" class="chart-container"></div>
          </div>
          
          <div class="chart-item">
            <h3>历史趋势</h3>
            <div ref="lineChart" class="chart-container"></div>
          </div>
        </div>
        
        <div class="detail-info">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="学科类别">{{ selectedSubject.category }}</el-descriptions-item>
            <el-descriptions-item label="评估等级">
              <span class="level-cell" :class="getLevelClass(selectedSubject.level)">
                {{ selectedSubject.level }}
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="评估得分">{{ selectedSubject.score }}分</el-descriptions-item>
            <el-descriptions-item label="排名变化">
              <span :style="{ color: selectedSubject.trend > 0 ? '#4CAF50' : '#F44336' }">
                {{ selectedSubject.trend > 0 ? '↑' : '↓' }} {{ Math.abs(selectedSubject.trend) }}
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="评估时间">{{ selectedSubject.time }}</el-descriptions-item>
            <el-descriptions-item label="评估机构">{{ selectedSubject.institution }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="exportReport">导出报告</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'SubjectEvaluation',
  data() {
    return {
      selectedYear: '2023',
      selectedCategory: '',
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 156,
      dialogVisible: false,
      selectedSubject: null,
      levelChart: null,
      categoryChart: null,
      evaluationData: [
        {
          rank: 1,
          subject: '计算机科学与技术',
          category: '理工类',
          score: 95,
          level: 'A+',
          trend: 2,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 2,
          subject: '临床医学',
          category: '医学类',
          score: 93,
          level: 'A+',
          trend: -1,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 3,
          subject: '机械工程',
          category: '理工类',
          score: 91,
          level: 'A',
          trend: 0,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 4,
          subject: '中国语言文学',
          category: '文史类',
          score: 89,
          level: 'A',
          trend: 3,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 5,
          subject: '经济学',
          category: '文史类',
          score: 87,
          level: 'A',
          trend: -2,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 6,
          subject: '数学',
          category: '理工类',
          score: 85,
          level: 'B+',
          trend: 1,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 7,
          subject: '物理学',
          category: '理工类',
          score: 82,
          level: 'B+',
          trend: 0,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 8,
          subject: '历史学',
          category: '文史类',
          score: 80,
          level: 'B',
          trend: -1,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 9,
          subject: '化学',
          category: '理工类',
          score: 78,
          level: 'B',
          trend: 2,
          time: '2023-10-15',
          institution: '教育部评估中心'
        },
        {
          rank: 10,
          subject: '哲学',
          category: '文史类',
          score: 75,
          level: 'B',
          trend: 0,
          time: '2023-10-15',
          institution: '教育部评估中心'
        }
      ]
    }
  },
  mounted() {
    this.initCharts();
  },
  beforeDestroy() {
    if (this.levelChart) {
      this.levelChart.dispose();
    }
    if (this.categoryChart) {
      this.categoryChart.dispose();
    }
  },
  methods: {
    search() {
      this.loading = true;
      // 模拟搜索
      setTimeout(() => {
        this.loading = false;
        // 重新初始化图表以反映筛选后的数据
        this.initCharts();
      }, 500);
    },
    
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    
    viewDetail(row) {
      this.selectedSubject = row;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.initDetailCharts();
      });
    },
    
    initCharts() {
      // 初始化等级分布饼图
      this.initLevelChart();
      
      // 初始化类别分布柱状图
      this.initCategoryChart();
    },
    
    initLevelChart() {
      if (!this.$refs.levelChart) return;
      
      if (this.levelChart) {
        this.levelChart.dispose();
      }
      
      this.levelChart = echarts.init(this.$refs.levelChart);
      
      // 统计各等级数量
      const levelCount = {};
      this.evaluationData.forEach(item => {
        levelCount[item.level] = (levelCount[item.level] || 0) + 1;
      });
      
      const levelData = Object.keys(levelCount).map(level => ({
        name: level,
        value: levelCount[level]
      }));
      
      const levelOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: '学科等级分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: levelData
          }
        ]
      };
      
      this.levelChart.setOption(levelOption);
    },
    
    initCategoryChart() {
      if (!this.$refs.categoryChart) return;
      
      if (this.categoryChart) {
        this.categoryChart.dispose();
      }
      
      this.categoryChart = echarts.init(this.$refs.categoryChart);
      
      // 统计各类别数量
      const categoryCount = {};
      this.evaluationData.forEach(item => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
      });
      
      const categories = Object.keys(categoryCount);
      const counts = categories.map(cat => categoryCount[cat]);
      
      const categoryOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: categories,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '学科数量',
            type: 'bar',
            barWidth: '60%',
            data: counts,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      };
      
      this.categoryChart.setOption(categoryOption);
    },
    
    initDetailCharts() {
      // 雷达图
      const radarChart = echarts.init(this.$refs.radarChart);
      const radarOption = {
        tooltip: {},
        radar: {
          indicator: [
            { name: '师资力量', max: 100 },
            { name: '科研成果', max: 100 },
            { name: '人才培养', max: 100 },
            { name: '学术声誉', max: 100 },
            { name: '国际影响', max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          data: [{
            value: [90, 95, 85, 88, 75],
            name: '各项指标'
          }]
        }]
      };
      radarChart.setOption(radarOption);
      
      // 折线图
      const lineChart = echarts.init(this.$refs.lineChart);
      const lineOption = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['2019', '2020', '2021', '2022', '2023']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [85, 87, 89, 92, 95],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#409EFF' },
          areaStyle: { opacity: 0.3 }
        }]
      };
      lineChart.setOption(lineOption);
    },
    
    exportReport() {
      this.$message.success('报告导出成功！');
    },
    
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'first-row';
      } else if (rowIndex === 1) {
        return 'second-row';
      } else if (rowIndex === 2) {
        return 'third-row';
      }
      return '';
    },
    
    getSubjectIcon(category) {
      const icons = {
        '理工类': 'el-icon-cpu',
        '文史类': 'el-icon-reading',
        '医学类': 'el-icon-first-aid-kit'
      };
      return icons[category] || 'el-icon-collection';
    },
    
    getScoreColor(score) {
      if (score >= 90) return '#4CAF50';
      if (score >= 80) return '#2196F3';
      if (score >= 70) return '#FF9800';
      return '#F44336';
    },
    
    getLevelClass(level) {
      const levelMap = {
        'A+': 'level-a-plus',
        'A': 'level-a',
        'B+': 'level-b-plus',
        'B': 'level-b'
      };
      return levelMap[level] || '';
    },
    
    getRankClass(rank) {
      if (rank === 1) return 'gold';
      if (rank === 2) return 'silver';
      if (rank === 3) return 'bronze';
      return '';
    }
  }
}
</script>

<style scoped>
.evaluation-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.filters {
  display: flex;
  gap: 15px;
}

.filter-item {
  width: 120px;
}

.stats-summary {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 24px;
}

.stat-info .stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

.stat-info .stat-label {
  font-size: 14px;
  color: #909399;
}

/* 新增图表容器样式 */
.charts-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-header h3 {
  margin: 0 0 15px 0;
  color: #303133;
}

.chart-content {
  width: 100%;
  height: 300px;
}

.evaluation-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.rank-cell {
  display: flex;
  justify-content: center;
}

.rank-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.rank-badge.gold {
  background: linear-gradient(135deg, #FFD700, #FFA500);
}

.rank-badge.silver {
  background: linear-gradient(135deg, #C0C0C0, #A9A9A9);
}

.rank-badge.bronze {
  background: linear-gradient(135deg, #CD7F32, #A0522D);
}

.rank-normal {
  font-weight: bold;
  color: #409EFF;
}

.subject-cell {
  display: flex;
  align-items: center;
}

.subject-icon {
  margin-right: 8px;
  color: #409EFF;
}

.score-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-text {
  margin-top: 5px;
  font-weight: bold;
}

.level-cell {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}

.level-a-plus {
  background-color: #4CAF50;
  color: white;
}

.level-a {
  background-color: #2196F3;
  color: white;
}

.level-b-plus {
  background-color: #FF9800;
  color: white;
}

.level-b {
  background-color: #9E9E9E;
  color: white;
}

.trend-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-cell i {
  margin-right: 3px;
}

.pagination-container {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.detail-charts {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-item {
  flex: 1;
}

.chart-item h3 {
  margin-bottom: 15px;
  color: #303133;
}

.chart-container {
  width: 100%;
  height: 300px;
}

/deep/ .first-row {
  background-color: #fff8e1;
}

/deep/ .second-row {
  background-color: #f5f5f5;
}

/deep/ .third-row {
  background-color: #ffecb3;
}

.dialog-footer {
  text-align: right;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
  }
  
  .stats-summary {
    flex-direction: column;
  }
  
  .charts-container {
    flex-direction: column;
  }
  
  .detail-charts {
    flex-direction: column;
  }
}
</style>