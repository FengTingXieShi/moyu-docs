import { getDocumentById } from './supabase-client.js';

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id') || null,
  };
}

function showError(message) {
  const container = document.querySelector('.doc-detail-container');
  if (container) {
    container.innerHTML = `<p class="error">${message}</p>`;
  }
}

function renderDocument({ title, content, tags, updated_at }) {
  const titleElement = document.querySelector('.doc-detail-title');
  const contentElement = document.querySelector('.doc-detail-content');
  const tagsElement = document.querySelector('.doc-detail-tags');
  const updatedAtElement = document.querySelector('.doc-detail-updated-at');

  titleElement.textContent = title;
  
  contentElement.innerHTML = marked.parse(content); 

  tagsElement.innerHTML = tags && tags.length > 0
    ? tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')
    : '<span class="doc-tag">无标签</span>';
  
  updatedAtElement.textContent = new Date(updated_at).toLocaleString();
}

document.addEventListener('DOMContentLoaded', async () => {
  const docDetailTitle = document.querySelector('.doc-detail-title');
  const docDetailContent = document.querySelector('.doc-detail-content');
  const docDetailTags = document.querySelector('.doc-detail-tags');
  const docDetailUpdatedAt = document.querySelector('.doc-detail-updated-at');

  if (!docDetailTitle || !docDetailContent || !docDetailTags || !docDetailUpdatedAt) return;

  const { id } = getUrlParams();

  if (!id) {
    showError('文档 ID 无效');
    docDetailTitle.textContent = '文档未找到';
    return;
  }

  try {
    const document = await getDocumentById(id);

    if (!document) {
      showError('文档未找到');
      docDetailTitle.textContent = '文档未找到';
      return;
    }

    renderDocument(document);
  } catch (error) {
    console.error('获取文档失败:', error);
    showError('加载文档详情失败，请稍后重试。');
    docDetailTitle.textContent = '加载文档详情失败，请稍后重试。';
  }
});
