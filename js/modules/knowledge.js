/**
 * SubQ Bilgi Bankası (Knowledge Base) Controller
 */
import { SUBQ_DATA } from '../data.js';
import { UIController } from './ui.js';
import { fuzzyIncludes } from './searchUtil.js';

export const KnowledgeController = {
  articles: SUBQ_DATA.articles,
  activeFilter: 'all',
  searchQuery: '',

  init() {
    this.renderFilterChips();
    this.renderArticles();
    this.bindSearch();
  },

  /**
   * Render Category Filter Chips
   */
  renderFilterChips() {
    const chipContainer = document.getElementById('knowledge-chips');
    if (!chipContainer) return;

    const categories = [
      { slug: 'all', name: 'Tüm Konular' },
      { slug: 'bilinc', name: 'Bilinç & Kromanyon' },
      { slug: 'biyoloji', name: 'Biyolojik Kod Çözme' },
      { slug: 'donguler', name: 'İlişkiler & Döngüler' },
      { slug: 'bolluk', name: 'Bağımlılık & Bolluk' },
      { slug: 'atalar', name: 'Transgenerasyonel' },
      { slug: 'yontem', name: 'Duygu Tespiti' },
      { slug: 'pratik', name: 'Pratik Farkındalık' },
      { slug: 'dongu-pratik', name: 'Döngü Çalışmaları' },
      { slug: 'duygular', name: 'Duyguları Tanımak' },
      { slug: 'icsel-dialog', name: 'İçsel Diyalog' },
      { slug: 'oz-duzenleme', name: 'Öz Düzenleme' }
    ];

    chipContainer.innerHTML = categories.map(cat => `
      <button class="chip ${this.activeFilter === cat.slug ? 'active' : ''}" data-category="${cat.slug}">
        ${cat.name}
      </button>
    `).join('');

    chipContainer.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeFilter = btn.getAttribute('data-category');
        chipContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        this.renderArticles();
      });
    });
  },

  /**
   * Bind Article Search Input
   */
  bindSearch() {
    const searchInput = document.getElementById('knowledge-search');
    if (!searchInput) return;

    let debounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderArticles();
      }, 250);
    });
  },

  /**
   * Filter and render article list
   */
  renderArticles() {
    const grid = document.getElementById('knowledge-grid');
    if (!grid) return;

    let filtered = this.articles;

    // Filter by Category
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(item => item.categorySlug === this.activeFilter);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      filtered = filtered.filter(item => 
        fuzzyIncludes(item.title, this.searchQuery) ||
        fuzzyIncludes(item.summary, this.searchQuery) ||
        fuzzyIncludes(item.category, this.searchQuery) ||
        item.sections.some(s => fuzzyIncludes(s.heading, this.searchQuery) || fuzzyIncludes(s.content, this.searchQuery))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p>Aradığınız kriterlere uygun makale bulunamadı.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(article => `
      <article class="article-card" data-article-id="${article.id}">
        <div class="article-card-header">
          <span class="article-badge">${article.category}</span>
          <span class="article-time">⏱️ ${article.readTime}</span>
        </div>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-summary">${article.summary}</p>
        <blockquote class="article-card-quote">"${article.quote}"</blockquote>
        <div class="article-card-footer">
          <span class="read-more-link">Devamını Oku &rarr;</span>
        </div>
      </article>
    `).join('');

    // Add click event for opening detail modal
    grid.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-article-id');
        this.openArticleModal(id);
      });
    });
  },

  /**
   * Open Article Full Reader Modal
   */
  openArticleModal(articleId) {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return;

    const modalTitle = document.getElementById('article-modal-title');
    const modalBody = document.getElementById('article-modal-body');

    if (modalTitle) modalTitle.textContent = article.title;
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="article-detail-meta">
          <span class="article-badge">${article.category}</span>
          <span>⏱️ Tahmini okuma: ${article.readTime}</span>
        </div>

        <blockquote class="article-featured-quote">
          "${article.quote}"
        </blockquote>

        <div class="article-sections">
          ${article.sections.map(sec => `
            <div class="article-section-block">
              <h4>${sec.heading}</h4>
              <p>${sec.content}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    UIController.openModal('modal-article');
  }
};
