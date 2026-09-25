/**
 * SubQ Storage Service
 * Abstracted local storage interface for offline-first privacy.
 */

const STORAGE_KEYS = {
  INTENTION: 'subq_active_intention',
  JOURNAL: 'subq_journal_entries',
  SETTINGS: 'subq_user_settings'
};

const DEFAULT_INTENTION = {
  target: 'Mide Yanması ve Öfke',
  sentence: 'Bilinçaltım, bu mide rahatsızlığının altındaki hazmedemediğim öfkeyi bul ve şifalandır. Sana güveniyorum.',
  checkins: [false, false, false, false, false, false, false], // Pzt - Paz
  startDate: new Date().toISOString()
};

export const StorageService = {
  /**
   * Get Active Intention
   */
  getIntention() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTENTION);
      return data ? JSON.parse(data) : { ...DEFAULT_INTENTION };
    } catch (e) {
      console.error('Error loading intention from LocalStorage:', e);
      return { ...DEFAULT_INTENTION };
    }
  },

  /**
   * Save Active Intention
   */
  saveIntention(intentionData) {
    try {
      const current = this.getIntention();
      const updated = { ...current, ...intentionData };
      localStorage.setItem(STORAGE_KEYS.INTENTION, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving intention to LocalStorage:', e);
      return null;
    }
  },

  /**
   * Toggle 7-Day Check-in Button
   * @param {number} dayIndex (0 = Pzt, 6 = Paz)
   */
  toggleCheckIn(dayIndex) {
    const intention = this.getIntention();
    if (!intention.checkins) {
      intention.checkins = [false, false, false, false, false, false, false];
    }
    intention.checkins[dayIndex] = !intention.checkins[dayIndex];
    this.saveIntention(intention);
    return intention;
  },

  /**
   * Get all journal entries
   */
  getJournalEntries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading journal entries:', e);
      return [];
    }
  },

  /**
   * Add a new journal entry
   * @param {Object} entry { feeling, region, text }
   */
  addJournalEntry(entry) {
    try {
      const entries = this.getJournalEntries();
      const newEntry = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        feeling: entry.feeling || 'Gerginlik',
        region: entry.region || 'Genel',
        text: entry.text || ''
      };
      entries.unshift(newEntry); // newest first
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
      return newEntry;
    } catch (e) {
      console.error('Error saving journal entry:', e);
      return null;
    }
  },

  /**
   * Delete a journal entry
   */
  deleteJournalEntry(entryId) {
    try {
      const entries = this.getJournalEntries();
      const filtered = entries.filter(item => item.id !== entryId);
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Error deleting journal entry:', e);
      return false;
    }
  },

  /**
   * Update text of an existing journal entry
   */
  updateJournalEntry(entryId, newText) {
    try {
      const entries = this.getJournalEntries();
      const index = entries.findIndex(item => item.id === entryId);
      if (index !== -1) {
        entries[index].text = newText;
        entries[index].edited_at = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error updating journal entry:', e);
      return false;
    }
  },

  /**
   * Settings (Theme preferences, etc.)
   */
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { theme: 'dark' };
    } catch (e) {
      return { theme: 'dark' };
    }
  },

  saveSettings(settings) {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  /**
   * Export all SubQ user data as JSON object
   */
  exportAllData() {
    return {
      subq_version: '1.0.0',
      exported_at: new Date().toISOString(),
      intention: this.getIntention(),
      journal: this.getJournalEntries(),
      settings: this.getSettings()
    };
  },

  /**
   * Import data from JSON object with strict schema validation
   */
  importAllData(data) {
    try {
      if (!data || typeof data !== 'object') return false;

      // Validate intention structure
      if (data.intention && typeof data.intention === 'object') {
        const isValidCheckins = Array.isArray(data.intention.checkins) &&
          data.intention.checkins.length === 7 &&
          data.intention.checkins.every(val => typeof val === 'boolean');

        const intention = {
          target: String(data.intention.target || 'Mide Yanması'),
          sentence: String(data.intention.sentence || ''),
          checkins: isValidCheckins ? [...data.intention.checkins] : [false, false, false, false, false, false, false],
          startDate: data.intention.startDate ? String(data.intention.startDate) : new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.INTENTION, JSON.stringify(intention));
      }

      // Validate journal array & sanitize items
      if (Array.isArray(data.journal)) {
        const validJournal = data.journal
          .filter(item => item && typeof item === 'object')
          .map(item => {
            const rawId = String(item.id || ('note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)));
            const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '') || ('note_' + Date.now());
            return {
              id: safeId,
              timestamp: String(item.timestamp || new Date().toISOString()),
              feeling: String(item.feeling || 'Gerginlik'),
              region: String(item.region || 'Genel'),
              text: String(item.text || '')
            };
          });
        localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(validJournal));
      }

      // Validate settings
      if (data.settings && typeof data.settings === 'object') {
        const theme = data.settings.theme === 'light' ? 'light' : 'dark';
        this.saveSettings({ theme });
      }

      return true;
    } catch (e) {
      console.error('Error importing data with validation:', e);
      return false;
    }
  },

  /**
   * Clear all SubQ local storage data
   */
  clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.INTENTION);
      localStorage.removeItem(STORAGE_KEYS.JOURNAL);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      return true;
    } catch (e) {
      console.error('Error clearing data:', e);
      return false;
    }
  }
};
