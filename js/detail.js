import { getDocumentById } from './supabase-client.js';

// 解析 URL 参数
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id') || null,
  };
}

// 显示错误信息
function showError(message) {
  const container = document.querySelector('.doc-detail-container');
  if (container) {
    container.innerHTML = `<p class="error">${message}</p>`;
  }
}

// 渲染文档数据
function renderDocument({ title, content, tags, updated_at }) {
  const titleElement = document.querySelector('.doc-detail-title');
  const contentElement = document.querySelector('.doc-detail-content');
  const tagsElement = document.querySelector('.doc-detail-tags');
  const updatedAtElement = document.querySelector('.doc-detail-updated-at');

  if (titleElement) titleElement.textContent = title;
  if (contentElement) contentElement.innerHTML = marked.parse(content); // 假设使用 marked 库渲染 Markdown
  if (tagsElement) tagsElement.innerHTML = tags && tags.length > 0
    ? tags.map(tag => `<span class="tag">${tag}</span>`).join('')
    : '<span class="tag">无标签</span>';
  if (updatedAtElement) updatedAtElement.textContent = `更新时间：${new Date(updated_at).toLocaleString()}`;
}

// 页面初始化
document.addEventListener('DOMContentLoaded', async () => {
  const docDetailTitle = document.querySelector('.doc-detail-title');
  const docDetailContent = document.querySelector('.doc-detail-content');
  const docDetailTags = document.querySelector('.doc-detail-tags');
  const docDetailUpdatedAt = document.querySelector('.doc-detail-updated-at');

  // 如果容器或主要元素不存在，则直接退出
  if (!docDetailTitle || !docDetailContent || !docDetailTags || !docDetailUpdatedAt) return;

  // 获取 URL 参数中的文档 ID
  const { id } = getUrlParams();

  if (!id) {
    showError('文档 ID 无效');
    docDetailTitle.textContent = '文档未找到';
    return;
  }

  try {
    // 从 Supabase 获取文档数据
    const document = await getDocumentById(id);

    if (!document) {
      showError('文档未找到');
      docDetailTitle.textContent = '文档未找到';
      return;
    }

    // 渲染数据到页面
    renderDocument(document);
  } catch (error) {
    console.error('获取文档失败:', error);
    showError('加载文档详情失败，请稍后重试。');
    docDetailTitle.textContent = '加载文档详情失败，请稍后重试。';
  }
});
