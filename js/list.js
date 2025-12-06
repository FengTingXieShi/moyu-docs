import { getDocuments } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', () => {
  const docsList = document.querySelector('.docs-list');
  if (!docsList) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get('q') || '';

  async function loadDocuments() {
    try {
      let query = supabase.from('documents').select('*');
      
      if (searchKeyword) {
        query = query.or(`title.ilike.%${searchKeyword}%,summary.ilike.%${searchKeyword}%,content.ilike.%${searchKeyword}%`);
      }
      
      const { data: documents, error } = await query;
      if (error) throw error;

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
            ${doc.tags?.map(tag => `<span class="doc-tag">${tag}</span>`).join('') || '<span class="doc-tag">无标签</span>'}
          </div>
          <div class="doc-updated-at">更新时间：${new Date(doc.updated_at).toLocaleString()}</div>
        </div>
      `).join('');
    } catch (error) {
      console.error('加载文档失败:', error);
      docsList.innerHTML = '<p class="load-error">加载失败，请稍后重试。</p>';
    }
  }

  loadDocuments();
});
