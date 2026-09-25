/**
 * SubQ Beden Haritası (Semptom Sözlüğü & Somatik Harita) Controller
 */
import { SUBQ_DATA } from '../data.js';
import { StorageService } from './storage.js';
import { UIController } from './ui.js';
import { fuzzyIncludes } from './searchUtil.js';

export const BodyMapController = {
  symptoms: SUBQ_DATA.symptoms,
  selectedRegion: 'all',
  searchQuery: '',

  init() {
    this.renderRegionSelector();
    this.renderSymptomList();
    this.bindSearch();
    this.bindSvgSilhouetteInteractivity();
  },

  /**
   * Render Region Filter Buttons
   */
  renderRegionSelector() {
    const container = document.getElementById('body-region-chips');
    if (!container) return;

    const regions = [
      { id: 'all', label: 'Tüm Bölgeler' },
      { id: 'head', label: '🧠 Baş & Zihin' },
      { id: 'throat', label: '🗣️ Boyun & Boğaz' },
      { id: 'chest', label: '🫁 Göğüs & Nefes' },
      { id: 'heart', label: '🫀 Kalp & Dolaşım' },
      { id: 'stomach', label: '🫃 Mide & Sindirim' },
      { id: 'bones', label: '🦴 Eklem & İskelet' },
      { id: 'skin', label: '✨ Cilt & Egzama' },
      { id: 'pelvis', label: '⚓ Pelvis & Kök' }
    ];

    container.innerHTML = regions.map(r => `
      <button class="chip ${this.selectedRegion === r.id ? 'active' : ''}" data-region="${r.id}">
        ${r.label}
      </button>
    `).join('');

    container.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const region = btn.getAttribute('data-region');
        this.setRegionFilter(region);
      });
    });
  },

  /**
   * Set Active Region Filter & Update SVG highlights
   */
  setRegionFilter(regionId) {
    this.selectedRegion = regionId;

    // Update region chips
    const chips = document.querySelectorAll('#body-region-chips .chip');
    chips.forEach(c => {
      if (c.getAttribute('data-region') === regionId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Highlight SVG silhouette areas
    const svgTargetAreas = document.querySelectorAll('.svg-body-region');
    svgTargetAreas.forEach(area => {
      const areaRegion = area.getAttribute('data-region');
      if (regionId === 'all' || areaRegion === regionId) {
        area.classList.add('highlighted');
      } else {
        area.classList.remove('highlighted');
      }
    });

    this.renderSymptomList();
  },

  /**
   * Bind SVG Silhouette Clicks & Keyboard Accessibility
   */
  bindSvgSilhouetteInteractivity() {
    const svgRegions = document.querySelectorAll('.svg-body-region');
    svgRegions.forEach(regionEl => {
      const handleSelect = () => {
        const region = regionEl.getAttribute('data-region');
        this.setRegionFilter(region);
        
        // Scroll smoothly to symptom list section
        const listContainer = document.getElementById('symptom-list-container');
        if (listContainer) {
          listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      regionEl.addEventListener('click', handleSelect);
      regionEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });
  },

  /**
   * Bind Symptom Search Input
   */
  bindSearch() {
    const searchInput = document.getElementById('symptom-search-input');
    if (!searchInput) return;

    let debounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderSymptomList();
      }, 250);
    });
  },

  /**
   * Render Filtered Symptom Cards
   */
  renderSymptomList() {
    const container = document.getElementById('symptom-grid');
    if (!container) return;

    let filtered = this.symptoms;

    // Filter by Body Region
    if (this.selectedRegion !== 'all') {
      filtered = filtered.filter(item => item.region === this.selectedRegion);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      filtered = filtered.filter(item => 
        fuzzyIncludes(item.name, this.searchQuery) ||
        fuzzyIncludes(item.rootEmotion, this.searchQuery) ||
        fuzzyIncludes(item.conflict, this.searchQuery) ||
        item.keywords.some(k => fuzzyIncludes(k, this.searchQuery))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🫀</span>
          <p>Aradığınız fiziksel belirti veya duyguya uygun semptom bulunamadı.</p>
        </div>
      `;
      return;
    }

    const regionIcons = {
      stomach: '🫃',
      skin: '✨',
      bones: '🦴',
      throat: '🗣️',
      chest: '🫁',
      heart: '🫀',
      pelvis: '⚓',
      head: '🧠'
    };

    container.innerHTML = filtered.map(item => {
      const icon = regionIcons[item.region] || '📍';
      return `
        <div class="symptom-card" data-symptom-id="${item.id}" data-region="${item.region}">
          <div class="symptom-header">
            <span class="symptom-tag">${icon} ${item.regionTitle}</span>
            <span class="symptom-arrow">&rarr;</span>
          </div>
          <h3 class="symptom-name">${item.name}</h3>
          <div class="symptom-root-preview">
            <span class="root-label">Kök Duygu:</span>
            <span class="root-val">${item.rootEmotion}</span>
          </div>
          <p class="symptom-conflict-snippet">${item.conflict}</p>
          <div class="symptom-card-footer">
            <span class="symptom-action-link">Detay & Niyet Et &rarr;</span>
          </div>
        </div>
      `;
    }).join('');

    // Add click listeners to cards
    container.querySelectorAll('.symptom-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-symptom-id');
        this.openSymptomDetailModal(id);
      });
    });
  },

  /**
   * Open Symptom Detail Sheet Modal
   */
  openSymptomDetailModal(symptomId) {
    const item = this.symptoms.find(s => s.id === symptomId);
    if (!item) return;

    const modalTitle = document.getElementById('symptom-modal-title');
    const modalBody = document.getElementById('symptom-modal-body');

    if (modalTitle) modalTitle.textContent = item.name;
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="symptom-detail-header">
          <span class="symptom-tag">${item.regionTitle}</span>
        </div>

        <div class="symptom-detail-block root-emotion-box">
          <h4>📍 Kök Duygu (Bastırılmış His)</h4>
          <p class="highlight-text">${item.rootEmotion}</p>
        </div>

        <div class="symptom-detail-block">
          <h4>🧬 Biyolojik Çatışma (Kromanyon Yanıtı)</h4>
          <p>${item.conflict}</p>
        </div>

        <div class="symptom-detail-block question-box">
          <h4>🤔 Terapötik İçsel Yüzleşme Sorusu</h4>
          <p class="question-text">"${item.question}"</p>
        </div>

        <div class="symptom-detail-block intention-preview-box">
          <h4>✨ Önerilen Uyumadan Önceki Niyet Cümlesi</h4>
          <p class="intention-sentence">"${item.suggestedIntention}"</p>
          <button id="add-to-planner-btn" class="btn btn-primary btn-full">
            🌙 Bu Niyeti Kişisel Planlayıcı'ya Ekle
          </button>
        </div>
      `;

      // Bind "Add to Planner" action button
      const addBtn = modalBody.querySelector('#add-to-planner-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          StorageService.saveIntention({
            target: item.name,
            sentence: item.suggestedIntention,
            checkins: [false, false, false, false, false, false, false]
          });

          UIController.closeModal('modal-symptom');
          UIController.showToast(`"${item.name}" niyeti Kişisel Planlayıcı'ya eklendi!`);
          
          // Switch to Planner Tab
          setTimeout(() => {
            UIController.switchTab('planner');
            // Refresh planner UI
            window.dispatchEvent(new CustomEvent('subq-intention-updated'));
          }, 300);
        });
      }
    }

    UIController.openModal('modal-symptom');
  }
};
