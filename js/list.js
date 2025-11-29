document.addEventListener('DOMContentLoaded', () => {
  const docsList = document.querySelector('.docs-list');
  if (!docsList) return;

  const mockDocs = [
    {
      id: 1,
      title: 'Markdown 语法基础指南',
      summary: '介绍常用的 Markdown 语法，包括标题、列表、链接和代码块的使用方法。',
      tags: ['Markdown', '指南'],
      updatedAt: '2025-11-20'
    },
    {
      id: 2,
      title: '摸鱼文库使用手册',
      summary: '详细说明如何在摸鱼文库中创建、编辑和管理文档，以及社区功能的使用方法。',
      tags: ['教程', '文库'],
      updatedAt: '2025-11-18'
    },
    {
      id: 3,
      title: '前端开发工具推荐',
      summary: '分享常用前端开发工具和插件，提升开发效率和代码质量。',
      tags: ['工具', '前端'],
      updatedAt: '2025-11-15'
    }
  ];

  docsList.innerHTML = mockDocs.map(doc => `
    <div class="doc-item">
      <div class="doc-title">
        <a href="detail.html?id=${doc.id}">${doc.title}</a>
      </div>
      <div class="doc-summary">${doc.summary}</div>
      <div class="doc-tags">
        ${doc.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')}
      </div>
      <div class="doc-updated-at">更新时间：${doc.updatedAt}</div>
    </div>
  `).join('');

  const style = document.createElement('style');
  style.textContent = `
    .doc-item {
      padding: var(--spacing-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-base);
      background-color: var(--color-bg-secondary);
    }
    .doc-title a {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-text-main);
    }
    .doc-title a:hover {
      color: var(--color-primary);
    }
    .doc-summary {
      margin-top: var(--spacing-sm);
      color: var(--color-text-secondary);
      font-size: 14px;
    }
    .doc-tags {
      margin-top: var(--spacing-sm);
    }
    .doc-tag {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-sm);
      margin-right: var(--spacing-xs);
      margin-bottom: var(--spacing-xs);
      font-size: 12px;
      color: var(--color-text-secondary);
      background-color: var(--color-bg-main);
      border: 1px solid var(--color-border);
      border-radius: 4px;
    }
    .doc-updated-at {
      margin-top: var(--spacing-sm);
      font-size: 12px;
      color: var(--color-text-secondary);
    }
  `;
  document.head.appendChild(style);
});
