/**
 * SubQ Main Application Entrypoint
 */
import { UIController } from './modules/ui.js';
import { KnowledgeController } from './modules/knowledge.js';
import { BodyMapController } from './modules/bodyMap.js';
import { ExercisesController } from './modules/exercises.js';
import { PlannerController } from './modules/planner.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌱 SubQ initializing...');

  try {
    // Initialize UI navigation, themes, and modals
    UIController.init();

    // Initialize Module Controllers
    KnowledgeController.init();
    BodyMapController.init();
    ExercisesController.init();
    PlannerController.init();

    console.log('✅ SubQ ready.');
  } catch (err) {
    console.error('SubQ initialization failed:', err);
    const appEl = document.getElementById('app');
    if (appEl) {
      const banner = document.createElement('div');
      banner.style.cssText = 'padding: 24px; text-align: center; color: var(--accent-terracotta); background: var(--bg-card); margin: 20px; border-radius: 12px; border: 1px solid var(--accent-terracotta);';
      banner.innerHTML = '<h3>⚠️ Uygulama Başlatılırken Bir Sorun Oluştu</h3><p style="margin-top:8px; font-size:0.9rem; color:var(--text-secondary);">Tarayıcınızın yerel depolama (LocalStorage) iznini kontrol edip sayfayı yenileyiniz.</p>';
      appEl.prepend(banner);
    }
  }
});
