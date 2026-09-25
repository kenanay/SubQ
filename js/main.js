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

  // Initialize UI navigation, themes, and modals
  UIController.init();

  // Initialize Module Controllers
  KnowledgeController.init();
  BodyMapController.init();
  ExercisesController.init();
  PlannerController.init();

  console.log('✅ SubQ ready.');
});
