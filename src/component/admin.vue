<template>
  <div class="common-layout">
    <el-container class="min-h-screen">
      <!-- 侧边栏，引入 Sidebar 组件 -->
      <el-aside :width="$store.state.asideWidth" class="bg-white border-r shadow-sm">
        <Sidebar :is-collapse="$store.state.asideWidth === '64px'" />
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-container class="flex flex-col">
        <el-header>
          <FHeader @showProfile="showProfile" />
        </el-header>

        <!-- 主体内容区域 -->
        <el-main>
          <!-- 根据 isProfileVisible 决定显示 Profile 组件还是路由匹配的组件 -->
          <Profile v-if="isProfileVisible" @close="hideProfile" />
          <router-view v-else />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 引入 FHeader 组件
import FHeader from "../Layouts/Header.vue";
// 引入 Profile 组件
import Profile from "../Layouts/Profile.vue";
// 引入 Sidebar 组件
import Sidebar from "../Layouts/Sidebar.vue";
// 引入样式文件
import '@/assets/styles/layout.scss';

// 定义响应式变量 isProfileVisible，用于控制是否显示个人资料页面
const isProfileVisible = ref(false);

// 显示个人资料页面的方法
const showProfile = () => {
  isProfileVisible.value = true;
};

// 隐藏个人资料页面的方法
const hideProfile = () => {
  isProfileVisible.value = false;
};
</script>
<style scoped lang="scss"></style>