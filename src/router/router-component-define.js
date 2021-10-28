/**
 * 路由定义.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/10/25 15:53:57
 */

const routerComponentDefine = {};

const modules = import.meta.glob('/**.vue');
const importList = Object.keys(modules);
for (let i = 0; i < importList.length; i++) {
  routerComponentDefine[importList[i]] = modules[importList[i]];
}
export default routerComponentDefine;
