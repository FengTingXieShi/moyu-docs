import { getDocumentById } from '../supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
  const docDetailTitle = document.querySelector('.doc-detail-title');
  const docDetailContent = document.querySelector('.doc-detail-content');
  const docDetailTags = document.querySelector('.doc-detail-tags');
  const docDetailUpdatedAt = document.querySelector('.doc-detail-updated-at');

  if (!docDetailTitle || !docDetailContent || !docDetailTags || !docDetailUpdatedAt) return;

  // 从 URL参数中获取文档ID
  const urlParams = new URLSearchParams(window.location.search);
  const docId = urlParams.get('id');

  if (!docId) {
    docDetailTitle.textContent = '文档未找到';
    return;
  }

  async function loadDocument() {
    try {
      const document = await getDocumentById(docId);
      if (!document) {
        docDetailTitle.textContent = '文档未找到';
        return;
      }
      docDetailTitle.textContent = document.title;
      docDetailContent.innerHTML = document.content || '暂无正文内容';
      docDetailTags.innerHTML = document.tags && document.tags.length > 0
        ? document.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')
        : '<span class="doc-tag">无标签</span>';
      docDetailUpdatedAt.textContent = `更新时间：${new Date(document.updated_at).toLocaleString()}`;
    } catch (error) {
      console.error('加载文档详情失败:', error);
      docDetailTitle.textContent = '加载文档详情失败，请稍后重试。';
    }
  }

  loadDocument();
});
