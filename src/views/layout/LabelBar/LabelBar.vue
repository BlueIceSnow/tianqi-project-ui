<template>
  <div class="wrap" ref="wrap">
    <div class="labelBar">
      <transition
        v-for="tag in tags"
        :key="tag.name"
        name="el-fade-in"
        :appear="true"
        @contextmenu.prevent.native="openMenu($event, tag)"
      >
        <el-tag
          :class="tag.isActive ? 'tagClass activeTag' : 'tagClass'"
          :closable="tag.closable"
          @close="closeTag(tag)"
          @click="openTag(tag)"
          :type="tag.type"
        >
          <span class="circle"></span>{{ tag.name }}
        </el-tag>
      </transition>
    </div>
    <div>
      <ul class="tag-menu" ref="menu" v-show="showMenu">
        <li class="tag-menu-btn" @click="closeTag(undefined)">关闭</li>
        <li class="tag-menu-btn" @click="refreshTag">刷新</li>
        <li class="tag-menu-btn" @click="closeOther">关闭其他</li>
        <li class="tag-menu-btn" @click="closeAll">关闭所有</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const app = getCurrentInstance();
const tags = store.getters['app/tags'];

const showMenu = ref(false);

watch(
  () => store.getters['app/currentOpenTag'],
  (newVal) => {
    console.log(newVal);
    if (!newVal || newVal.url === '') {
      router.push('/');
      return;
    }
    newVal.isActive = true;
    router.push(newVal.url);
  }
);

onMounted(() => {
  const currentRouter = router.currentRoute.value;
  const notCloseableRouter = router
    .getRoutes()
    .filter((rou) => !rou.meta.closeable);
  for (let i = 0; i < notCloseableRouter.length; i++) {
    openTag({
      name: notCloseableRouter[i].meta.title,
      url: notCloseableRouter[i].meta.url,
      closable: notCloseableRouter[i].meta.closeable,
      index: notCloseableRouter[i].meta.index,
    });
  }
  openTag({
    name: currentRouter.meta.title,
    url: currentRouter.meta.url,
    closable: currentRouter.meta.closeable,
    index: currentRouter.meta.index,
  });
});

watch(router.currentRoute, (newVal) => {
  // 监听路由变化
  if (tags.length !== 0) {
    const tag = tags.find((tag) => tag.url === newVal.meta.url);
    if (tag && !tag.isActive) {
      openTag(tag);
    }
  } else {
    const currentRouter = newVal;
    openTag({
      name: currentRouter.meta.title,
      url: currentRouter.meta.url,
      closable: currentRouter.meta.closeable,
      index: currentRouter.meta.index,
    });
  }
});

/**
 * 打开右键菜单
 * @param event
 * @param tag
 */
function openMenu(event, tag) {
  if (!tag.closable) {
    return;
  }
  // 将标签存入 store
  store.commit('app/SET_CURRENT_MENU_TAG', tag);
  // 设置菜单展示位置
  app.refs.menu.style.left = `${event.layerX}px`;
  app.refs.menu.style.top = `${event.layerY}px`;
  showMenu.value = true;
  document.addEventListener('click', closeMenu);
}

function closeMenu() {
  showMenu.value = false;
  document.removeEventListener('click', closeMenu);
}

/**
 * 打开标签
 * @param tag 当前点击的标签
 */
function openTag(tag) {
  store.commit('app/ADD_TAG', tag);
}

/**
 * 关闭标签
 * @param tag
 */
function closeTag(tag) {
  if (!tag) {
    tag = store.getters['app/currentMenuTag'];
  }
  const index = tags.findIndex((el) => el.url === tag.url);
  store.commit('app/REMOVE_TAG', tag);
  if (!tags[index].isActive) {
    if (tags.length !== 0) {
      if (index === 0) {
        openTag(tags[index]);
      } else {
        openTag(tags[index - 1]);
      }
    } else {
      router.push('/');
    }
  }
}

/**
 * 刷新标签
 */
function refreshTag() {
  closeMenu();
}

/**
 * 关闭其他标签
 */
function closeOther() {
  store.commit('app/REMOVE_OTHER');
  closeMenu();
}

/**
 * 关闭所有标签
 */
function closeAll() {
  store.commit('app/REMOVE_ALL');
  closeMenu();
}
</script>

<style lang="scss" scoped>
@import 'styles/size/layout';

.labelBar {
  position: relative;
  width: calc(100% - 10px);
  height: calc(#{$labelBarHeight} - 10px);
  padding: 5px;
  background-color: white;
  line-height: calc(#{$labelBarHeight} - 10px);
  box-shadow: 0 1px 1px gainsboro;
  z-index: 9;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
.tagClass {
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tag-menu {
  width: 80px;
  height: 120px;
  padding: 5px;
  list-style-type: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px gainsboro;
  z-index: 999999999999999999999;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: white;
}
.tag-menu-btn {
  width: 60px;
  height: 100%;
  padding: 3px;
  cursor: pointer;
  text-align: center;
  border-radius: 3px;
}
.tag-menu-btn:hover {
  background-color: aliceblue;
}
.wrap {
  position: relative;
}

.activeTag {
  background-color: rgb(48, 49, 51);
  color: white;
  transition: background-color 1s;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.activeTag::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left-color: white;
}
.activeTag .el-tag .el-icon-close {
  top: 0;
}
</style>
