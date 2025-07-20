<template>
  <div class="researcher-card">
    <div class="card-content">
      <!-- 头像 -->
      <el-avatar :size="100" :src="researcher.profileImage" class="profile-image"></el-avatar>
      
      <!-- 姓名 -->
      <h3 class="name">{{ researcher.name }}</h3>
      
      <!-- 职称 -->
      <p class="title">{{ researcher.title }}</p>
      
      <!-- 部门 -->
      <p class="department">{{ researcher.department }}</p>
      
      <!-- 研究领域 -->
      <div class="expertise">
        <el-tag 
          v-for="area in researcher.expertise" 
          :key="area"
          type="info"
          size="small"
          effect="plain"
        >#{{ area }}</el-tag>
      </div>
      
      <!-- 发表论文数量 -->
      <p class="publications">发表论文: {{ researcher.publications }}篇</p>
      
      <!-- 联系信息 -->
      <div class="contact-info">
        <p><i class="el-icon-message"></i> {{ researcher.contact.email }}</p>
        <p><i class="el-icon-phone"></i> {{ researcher.contact.phone }}</p>
      </div>
      
      <!-- 简介 -->
      <p class="bio">{{ researcher.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearcherCard',
  props: {
    researcher: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        name: '',
        title: '',
        department: '',
        expertise: [],
        publications: 0,
        profileImage: '',
        bio: '',
        contact: {
          email: '',
          phone: ''
        }
      })
    }
  }
};
</script>

<style scoped>
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
</style>