/**
 * 通用增删改查.
 *
 * @Program: tq-project-ui
 * @Author: ytq
 * @Date: 2021/10/28 19:10:46
 */
import { onMounted } from 'vue';
import { doGet, doPost, doPut, doDelete } from 'utils/request';

export default function common(url) {
  onMounted(() => {
    console.log('common');
  });
}

function addData() {}

function updateData() {}

function remove() {}

function page() {}
