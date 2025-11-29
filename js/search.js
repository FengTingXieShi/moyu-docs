document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const docsList = document.querySelector('.docs-list');

  if (!searchInput || !docsList) return;

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const docItems = docsList.querySelectorAll('.doc-item');

    docItems.forEach(item => {
      const title = item.querySelector('.doc-title a')?.textContent.toLowerCase() || '';
      const summary = item.querySelector('.doc-summary')?.textContent.toLowerCase() || '';
      const isMatch = title.includes(keyword) || summary.includes(keyword);
      item.style.display = isMatch ? 'block' : 'none';
    });
  });
});
