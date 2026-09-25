/**
 * SubQ Kişisel Planlayıcı & Duygu Günlüğü Controller
 * 100% Offline / LocalStorage isolation
 */
import { StorageService } from './storage.js';
import { UIController } from './ui.js';
import { fuzzyIncludes } from './searchUtil.js';

function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const PlannerController = {
  activeFeeling: 'Gerginlik',
  selectedRegion: 'Genel',
  journalSearchQuery: '',
  journalActiveFilter: 'all',

  init() {
    this.renderIntentionCard();
    this.bindIntentionEvents();
    this.renderFeelingChips();
    this.renderRegionChips();
    this.bindJournalForm();
    this.bindJournalSearch();
    this.renderJournalFilterChips();
    this.bindEditModal();
    this.renderJournalTimeline();
    this.bindDataBackupEvents();

    // Listen for custom update events (from Beden Haritası and Egzersizler)
    window.addEventListener('subq-intention-updated', () => {
      this.renderIntentionCard();
      this.renderJournalTimeline();
    });

    window.addEventListener('subq-journal-updated', () => {
      this.renderJournalTimeline();
    });
  },

  /**
   * Render Active Intention Card & 7-Day Check-in Buttons
   */
  renderIntentionCard() {
    const intention = StorageService.getIntention();

    const targetInput = document.getElementById('planner-target-input');
    const sentenceTextarea = document.getElementById('planner-sentence-textarea');
    const daysContainer = document.getElementById('planner-days-grid');
    const progressText = document.getElementById('planner-progress-text');
    const progressBarFill = document.getElementById('planner-progress-fill');
    const cycleBox = document.getElementById('planner-cycle-completed-box');

    if (targetInput) targetInput.value = intention.target || '';
    if (sentenceTextarea) sentenceTextarea.value = intention.sentence || '';

    // Render 7-day circular buttons (Pzt - Paz)
    const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    const checkins = intention.checkins || [false, false, false, false, false, false, false];

    if (daysContainer) {
      daysContainer.innerHTML = dayNames.map((name, index) => {
        const isChecked = checkins[index];
        return `
          <button class="day-check-btn ${isChecked ? 'completed' : ''}" data-day-index="${index}" aria-label="${name} günü check-in">
            <span class="day-name">${name}</span>
            <span class="day-status-icon">${isChecked ? '✓' : '○'}</span>
          </button>
        `;
      }).join('');

      // Bind day toggle event
      daysContainer.querySelectorAll('.day-check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.getAttribute('data-day-index'), 10);
          const updated = StorageService.toggleCheckIn(index);
          this.renderIntentionCard();

          if (updated.checkins[index]) {
            UIController.showToast(`✨ ${dayNames[index]} akşamı niyeti tamamlandı!`);
          }
        });
      });
    }

    // Update Progress
    const completedCount = checkins.filter(Boolean).length;
    if (progressText) progressText.textContent = `${completedCount} / 7 Gece Tamamlandı`;
    if (progressBarFill) progressBarFill.style.width = `${(completedCount / 7) * 100}%`;

    // 7-Day Cycle Completed Celebration Card
    if (cycleBox) {
      if (completedCount === 7) {
        cycleBox.style.display = 'block';
        cycleBox.innerHTML = `
          <div class="cycle-celebration-card">
            <div class="celebration-title">🎉 7 Gecelik Niyet Döngüsü Tamamlandı!</div>
            <p class="celebration-desc">Kromanyon ile bu niyet üzerindeki haftalık çalışma döngüsünü tamamladınız. Bedeninizdeki ve zihninizdeki değişimi fark edin.</p>
            <button id="reset-cycle-btn" class="btn btn-secondary btn-full" style="border-color: var(--accent-sage); color: var(--accent-sage); font-weight:600;">
              🔄 Döngüyü Sıfırla & Yeni Haftaya Başla
            </button>
          </div>
        `;
        const resetBtn = cycleBox.querySelector('#reset-cycle-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            StorageService.saveIntention({
              checkins: [false, false, false, false, false, false, false],
              startDate: new Date().toISOString()
            });
            this.renderIntentionCard();
            UIController.showToast('🌱 Yeni haftalık niyet döngüsü başlatıldı!');
          });
        }
      } else {
        cycleBox.style.display = 'none';
        cycleBox.innerHTML = '';
      }
    }
  },

  /**
   * Bind Intention Editing
   */
  bindIntentionEvents() {
    const saveBtn = document.getElementById('save-intention-btn');
    const presetSelect = document.getElementById('planner-preset-select');

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const target = document.getElementById('planner-target-input').value.trim();
        const sentence = document.getElementById('planner-sentence-textarea').value.trim();

        StorageService.saveIntention({ target, sentence });
        UIController.showToast('💾 Niyetiniz başarıyla kaydedildi.');
      });
    }

    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) return;

        let target = '';
        let sentence = '';

        switch (val) {
          case 'degersizlik':
            target = 'Değersizlik Hissi & Eklem';
            sentence = 'Bilinçaltım, bu eklem/kemik gerginliğinin altındaki derin değersizlik hissini bul ve serbest bırak. Özdeğerimi kucaklıyorum.';
            break;
          case 'ofke':
            target = 'Bastırılmış Öfke';
            sentence = 'Bilinçaltım, bedenimde kilitlediğim bu öfkeyi ve sınır ihlalini sevgiyle serbest bırak. Güvendeyim.';
            break;
          case 'mide':
            target = 'Mide Yanması & Hazımsızlık';
            sentence = 'Bilinçaltım, bu mide rahatsızlığının altındaki hazmedemediğim öfkeyi ve olayı bulup şifalandır. Sana güveniyorum.';
            break;
          case 'borc':
            target = 'Borç Döngüsü & Atasal Sadakat';
            sentence = 'Bilinçaltım, finansal krizlerimin altındaki atasal sadakati ve değersizlik inancını şifalandır. Refahı hak ediyorum.';
            break;
          case 'egzama':
            target = 'Cilt & Egzama (Ayrılık Travması)';
            sentence = 'Bilinçaltım, bu cilt reaksiyonunun altındaki ayrılık acısını ve sınır ihlali şokunu şifalandır. Güvendeyim.';
            break;
          case 'bogaz':
            target = 'Boğaz & Ses Kısılması';
            sentence = 'Bilinçaltım, boğazımda düğümlenen ve söyleyemediğim tüm kelimeleri sevgiyle serbest bırak.';
            break;
          case 'gogus':
            target = 'Göğüs Daralması & Boğulma';
            sentence = 'Bilinçaltım, göğsümdeki bu baskının altındaki kapana kısılmışlık hissini dönüştür. Kendi alanıma sahibim.';
            break;
          case 'kalp':
            target = 'Kalp Çarpıntısı & Aşırı Yük';
            sentence = 'Bilinçaltım, kalbimdeki bu yükü ve sevgisizlik korkusunu şifalandır. Huzuru seçiyorum.';
            break;
          case 'sigara':
            target = 'Sigara Bağımlılığı';
            sentence = 'Bilinçaltım, sigara ihtiyacımın altındaki alan ihlali ve boğulma travmasını şifalandır. Özgürce nefes alıyorum.';
            break;
          case 'alkol':
            target = 'Alkol Bağımlılığı';
            sentence = 'Bilinçaltım, alkole sığınmama neden olan anne sevgisi boşluğunu ve güvensizliği şifalandır.';
            break;
          case 'bas':
            target = 'Baş Ağrısı & Aşırı Kontrol';
            sentence = 'Bilinçaltım, zihnimdeki aşırı kontrol baskısını gevşet. Bilinçaltımın bilgeliğine teslim oluyorum.';
            break;
        }

        document.getElementById('planner-target-input').value = target;
        document.getElementById('planner-sentence-textarea').value = sentence;
        StorageService.saveIntention({ target, sentence });
        UIController.showToast('✨ Niyet şablonu uygulandı.');
      });
    }
  },

  /**
   * Render Quick Feeling Bar Chips
   */
  renderFeelingChips() {
    const container = document.getElementById('journal-feeling-chips');
    if (!container) return;

    const feelings = [
      'Gerginlik', 'Hafiflik', 'Düğümlenme', 'Baskı', 
      'Öfke', 'Ayrılık Acısı', 'Bulantı', 'Huzursuzluk', 'Bıkkınlık'
    ];

    container.innerHTML = feelings.map(f => `
      <button class="chip ${this.activeFeeling === f ? 'active' : ''}" data-feeling="${f}">
        ${f}
      </button>
    `).join('');

    container.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeFeeling = btn.getAttribute('data-feeling');
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  /**
   * Render Body Region Selector Chips for Journal
   */
  renderRegionChips() {
    const container = document.getElementById('journal-region-chips');
    if (!container) return;

    const regions = ['Genel', 'Baş', 'Boğaz', 'Göğüs', 'Kalp', 'Mide', 'Eklem', 'Cilt', 'Pelvis'];

    container.innerHTML = regions.map(r => `
      <button class="chip chip-sm ${this.selectedRegion === r ? 'active' : ''}" data-region="${r}">
        📍 ${r}
      </button>
    `).join('');

    container.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedRegion = btn.getAttribute('data-region');
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  /**
   * Bind Journal Auto-Drafting & Save Form
   */
  bindJournalForm() {
    const saveBtn = document.getElementById('save-journal-btn');
    const textarea = document.getElementById('journal-text');

    if (textarea) {
      // Restore auto-saved draft if present
      const savedDraft = localStorage.getItem('subq_journal_draft');
      if (savedDraft) {
        textarea.value = savedDraft;
      }

      // Auto-save draft on input
      textarea.addEventListener('input', () => {
        localStorage.setItem('subq_journal_draft', textarea.value);
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const text = textarea ? textarea.value.trim() : '';
        if (!text) {
          UIController.showToast('Lütfen günlüğünüze kısa bir not yazın.');
          return;
        }

        StorageService.addJournalEntry({
          feeling: this.activeFeeling,
          region: this.selectedRegion,
          text: text
        });

        if (textarea) {
          textarea.value = '';
          localStorage.removeItem('subq_journal_draft');
        }

        UIController.showToast('📝 Notunuz cihazınıza güvenle kaydedildi.');
        this.renderJournalTimeline();
      });
    }
  },

  /**
   * Bind Journal Search Filter (with 250ms debounce)
   */
  bindJournalSearch() {
    const searchInput = document.getElementById('journal-search-input');
    if (!searchInput) return;

    let debounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.journalSearchQuery = e.target.value.trim();
        this.renderJournalTimeline();
      }, 250);
    });
  },

  /**
   * Render Quick Filter Chips for Journal (Feelings)
   */
  renderJournalFilterChips() {
    const container = document.getElementById('journal-filter-chips');
    if (!container) return;

    const filters = [
      { id: 'all', label: 'Tüm Notlar' },
      { id: 'Gerginlik', label: '⚡ Gerginlik' },
      { id: 'Hafiflik', label: '🌱 Hafiflik' },
      { id: 'Öfke', label: '🔥 Öfke' },
      { id: 'Düğümlenme', label: '🪢 Düğümlenme' },
      { id: 'Baskı', label: '🪨 Baskı' },
      { id: 'Ayrılık Acısı', label: '💔 Ayrılık' }
    ];

    container.innerHTML = filters.map(f => `
      <button class="chip chip-sm ${this.journalActiveFilter === f.id ? 'active' : ''}" data-journal-filter="${f.id}">
        ${f.label}
      </button>
    `).join('');

    container.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.journalActiveFilter = btn.getAttribute('data-journal-filter');
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        this.renderJournalTimeline();
      });
    });
  },

  /**
   * Bind Edit Modal Handler
   */
  bindEditModal() {
    const saveEditedBtn = document.getElementById('save-edited-journal-btn');
    if (!saveEditedBtn) return;

    saveEditedBtn.addEventListener('click', () => {
      const id = document.getElementById('edit-journal-id').value;
      const text = document.getElementById('edit-journal-text').value.trim();

      if (!text) {
        UIController.showToast('Not metni boş olamaz.');
        return;
      }

      StorageService.updateJournalEntry(id, text);
      UIController.closeModal('modal-edit-journal');
      UIController.showToast('✏️ Notunuz başarıyla güncellendi.');
      this.renderJournalTimeline();
    });
  },

  /**
   * Render Saved Journal Timeline (Safely Escaped Text, IDs & Filtered)
   */
  renderJournalTimeline() {
    const timeline = document.getElementById('journal-timeline-grid');
    if (!timeline) return;

    let entries = StorageService.getJournalEntries();

    // Apply feeling category filter if active
    if (this.journalActiveFilter !== 'all') {
      entries = entries.filter(e => e.feeling === this.journalActiveFilter);
    }

    // Apply search filter if active (using robust Turkish-tolerant fuzzy matching)
    if (this.journalSearchQuery) {
      entries = entries.filter(e => 
        fuzzyIncludes(e.text, this.journalSearchQuery) ||
        fuzzyIncludes(e.feeling, this.journalSearchQuery) ||
        fuzzyIncludes(e.region, this.journalSearchQuery)
      );
    }

    if (entries.length === 0) {
      timeline.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">📖</span>
          <p>${this.journalSearchQuery || this.journalActiveFilter !== 'all' ? 'Aradığınız kriterlere uygun not bulunamadı.' : 'Henüz farkındalık notu eklenmemiş. Yukarıdaki alandan ilk notunuzu kaydedebilirsiniz.'}</p>
        </div>
      `;
      return;
    }

    timeline.innerHTML = entries.map(entry => {
      const dateObj = new Date(entry.timestamp);
      const dateStr = dateObj.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const safeId = escapeHTML(entry.id);
      const safeText = escapeHTML(entry.text);
      const safeFeeling = escapeHTML(entry.feeling);
      const safeRegion = escapeHTML(entry.region);

      return `
        <div class="journal-entry-card" data-entry-id="${safeId}">
          <div class="journal-card-header">
            <span class="journal-date">${dateStr} ${entry.edited_at ? '(Düzenlendi)' : ''}</span>
            <div style="display:flex; gap:8px;">
              <button class="copy-entry-btn" data-copy-id="${safeId}" aria-label="Notu panoya kopyala" title="Panoya Kopyala">📋</button>
              <button class="edit-entry-btn" data-edit-id="${safeId}" aria-label="Notu düzenle" title="Düzenle">✏️</button>
              <button class="delete-entry-btn" data-delete-id="${safeId}" aria-label="Notu sil" title="Sil">🗑️</button>
            </div>
          </div>
          <div class="journal-tags">
            <span class="journal-badge badge-feeling">Duygu: ${safeFeeling}</span>
            <span class="journal-badge badge-region">Bölge: ${safeRegion}</span>
          </div>
          <p class="journal-card-text">${safeText}</p>
        </div>
      `;
    }).join('');

    // Bind Copy events
    timeline.querySelectorAll('.copy-entry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-copy-id');
        const entry = StorageService.getJournalEntries().find(item => item.id === id);
        if (entry) {
          const date = new Date(entry.timestamp).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
          const textToCopy = `[${date}] [${entry.feeling} - ${entry.region}]\n${entry.text}`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              UIController.showToast('📋 Not panoya kopyalandı!');
            }).catch(() => {
              UIController.showToast('Kopyalama başarısız oldu.');
            });
          }
        }
      });
    });

    // Bind Edit events
    timeline.querySelectorAll('.edit-entry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-edit-id');
        const entry = StorageService.getJournalEntries().find(item => item.id === id);
        if (entry) {
          document.getElementById('edit-journal-id').value = entry.id;
          document.getElementById('edit-journal-text').value = entry.text;
          UIController.openModal('modal-edit-journal');
        }
      });
    });

    // Bind Delete events
    timeline.querySelectorAll('.delete-entry-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-delete-id');
        if (confirm('Bu notu silmek istediğinize emin misiniz?')) {
          StorageService.deleteJournalEntry(id);
          this.renderJournalTimeline();
          UIController.showToast('Not silindi.');
        }
      });
    });
  },

  /**
   * Bind Export JSON, Import JSON, Copy All Notes, and Clear Data Controls
   */
  bindDataBackupEvents() {
    const copyAllBtn = document.getElementById('copy-all-notes-btn');
    const exportBtn = document.getElementById('export-data-btn');
    const importTriggerBtn = document.getElementById('import-data-btn-trigger');
    const importFileInput = document.getElementById('import-data-file-input');
    const clearBtn = document.getElementById('clear-all-data-btn');

    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', () => {
        const entries = StorageService.getJournalEntries();
        if (entries.length === 0) {
          UIController.showToast('Kopyalanacak kayıtlı not bulunamadı.');
          return;
        }
        const textBlock = entries.map((e, idx) => {
          const date = new Date(e.timestamp).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
          return `${idx + 1}. [${date}] [Duygu: ${e.feeling} | Bölge: ${e.region}]\n${e.text}`;
        }).join('\n\n---\n\n');

        const fullCopy = `SubQ Farkındalık Notlarım & Duygu Günlüğü\nToplam Not: ${entries.length}\n\n${textBlock}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullCopy).then(() => {
            UIController.showToast('📋 Tüm notlar metin olarak panoya kopyalandı!');
          }).catch(() => {
            UIController.showToast('Kopyalama başarısız oldu.');
          });
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = StorageService.exportAllData();
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subq-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        UIController.showToast('📥 Verileriniz JSON dosyası olarak indirildi.');
      });
    }

    if (importTriggerBtn && importFileInput) {
      importTriggerBtn.addEventListener('click', () => {
        importFileInput.click();
      });

      importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            const success = StorageService.importAllData(parsed);
            if (success) {
              this.renderIntentionCard();
              this.renderJournalTimeline();
              window.dispatchEvent(new CustomEvent('subq-settings-updated'));
              UIController.showToast('✨ Yedeğiniz başarıyla yüklendi.');
            } else {
              UIController.showToast('Geçersiz yedek dosyası.');
            }
          } catch (err) {
            UIController.showToast('JSON dosyası okunamadı.');
          }
        };
        reader.readAsText(file);
        importFileInput.value = '';
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Tüm niyetleriniz ve günlük notlarınız silinecektir. Devam etmek istiyor musunuz?')) {
          StorageService.clearAllData();
          this.renderIntentionCard();
          this.renderJournalTimeline();
          window.dispatchEvent(new CustomEvent('subq-settings-updated'));
          UIController.showToast('Tüm yerel veriler temizlendi.');
        }
      });
    }
  }
};
