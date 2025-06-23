<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>学科水平</h1>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left: Chart Area -->
      <div class="chart-area">
        <div id="scatter" style="width: 100%; height: 100%;"></div>
      </div>

      <!-- Right: Selection Area -->
      <div class="selection-area">
        <div class="ranking-method">
          <span>排名方式：</span>
          <label><input type="radio" value="absolute" checked> 绝对排名</label>
          <label><input type="radio" value="relative"> 相对排名</label>
        </div>

        <div class="advantage-standard">
          <span>优势学科标准：</span>
          <label><input type="radio" value="top5"> 前5名 (0)</label>
          <label><input type="radio" value="top10"> 前10名 (0)</label>
          <label><input type="radio" value="top25"> 前25名 (4)</label>
          <label><input type="radio" value="top50" checked> 前50名 (8)</label>
        </div>

        <div class="subject-category">
          <span>学科门类：</span>
          <label><input type="checkbox" checked> 人文艺术</label>
          <label><input type="checkbox" checked> 社会科学</label>
          <label><input type="checkbox" checked> 理工农医</label>
          <label><input type="checkbox" checked> 交叉学科</label>
          <!-- 更多学科门类 -->
        </div>

        <div class="subject-level">
          <span>学科点层次：</span>
          <label><input type="checkbox" checked> 博士点</label>
          <label><input type="checkbox" checked> 硕士点</label>
        </div>
      </div>
    </div>

    <!-- Bottom: Table Area -->
    <div class="table-area">
      <table>
        <thead>
          <tr>
            <th>学科代码</th>
            <th>学科名称</th>
            <th>学科点层次</th>
            <th>当前排名</th>
            <th>全国博士点数</th>
            <th>排名百分位段</th>
            <th>第四轮学科评估</th>
            <th>学科热度</th>
            <th>学科贡献</th>
            <th>学科定位</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0101</td>
            <td>哲学</td>
            <td>硕士点</td>
            <td>72 / 135</td>
            <td>55</td>
            <td>前54%</td>
            <td>未上榜</td>
            <td>28 / 100</td>
            <td>19 / 30</td>
            <td>大雁型</td>
          </tr>
          <!-- 更多数据行 -->
           <tr>
            <td>0101</td>
            <td>哲学</td>
            <td>硕士点</td>
            <td>72 / 135</td>
            <td>55</td>
            <td>前54%</td>
            <td>未上榜</td>
            <td>28 / 100</td>
            <td>19 / 30</td>
            <td>大雁型</td>
          </tr>

          <tr>
            <td>0101</td>
            <td>哲学</td>
            <td>硕士点</td>
            <td>72 / 135</td>
            <td>55</td>
            <td>前54%</td>
            <td>未上榜</td>
            <td>28 / 100</td>
            <td>19 / 30</td>
            <td>大雁型</td>
          </tr>

          <tr>
            <td>0101</td>
            <td>哲学</td>
            <td>硕士点</td>
            <td>72 / 135</td>
            <td>55</td>
            <td>前54%</td>
            <td>未上榜</td>
            <td>28 / 100</td>
            <td>19 / 30</td>
            <td>大雁型</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      // 散点图数据
      scatterData: [
        { name: '世史', value: [30, 20] },
        { name: '软件', value: [40, 25] },
        // 更多数据点
      ]
    };
  },
  mounted() {
    this.initScatterChart();
  },
  methods: {
    initScatterChart() {
      const scatterChart = echarts.init(document.getElementById('scatter'));
      const option = {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          name: '学科热度',
          min: 0,
          max: 200,
          splitLine: { show: false }
        },
        yAxis: {
          name: '第四轮学科排名',
          min: 0,
          max: 200,
          splitLine: { show: false }
        },
        series: [{
          type: 'scatter',
          data: this.scatterData,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
          },
          label: {
            formatter: '{b}',
            position: 'right'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5
          }
        }]
      };
      scatterChart.setOption(option);
      window.addEventListener('resize', () => {
        scatterChart.resize();
      });
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}

.main-content {
  display: flex;
  flex: 1;
}

.chart-area {
  flex: 2;
  border: 1px solid #ddd;
}

.selection-area {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
}

.table-area {
  flex: none;
  overflow-x: auto;
  border: 1px solid #ddd;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>