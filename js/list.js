import { getDocuments } from '../supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
  const docsList = document.querySelector('.docs-list');
  if (!docsList) return;

  async function loadDocuments() {
    try {
      const documents = await getDocuments();
      if (documents.length === 0) {
        docsList.innerHTML = '<p class="no-docs">暂无文档，快去创建一篇吧！</p>';
        return;
      }
      docsList.innerHTML = documents.map(doc => `
        <div class="doc-item">
          <div class="doc-title">
            <a href="detail.html?id=${doc.id}">${doc.title}</a>
          </div>
          <div class="doc-summary">${doc.summary || '暂无摘要'}</div>
          <div class="doc-tags">
            ${doc.tags && doc.tags.length > 0 ? doc.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('') : '<span class="doc-tag">无标签</span>'}
          </div>
          <div class="doc-updated-at">更新时间：${new Date(doc.updated_at).toLocaleString()}</div>
        </div>
      `).join('');
    } catch (error) {
      console.error('加载文档列表失败:', error);
      docsList.innerHTML = '<p class="load-error">加载文档列表失败，请稍后重试。</p>';
    }
  }

  loadDocuments();
});
