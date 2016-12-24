(function ()
{
 'use strict';

 /**
  * Main module of the Fuse
  */
 angular
         .module('fuse', [
          // Common 3rd Party Dependencies
          'uiGmapgoogle-maps',
          'textAngular',
          'xeditable',
          // Core
          'app.core',
          'app.profile',
          'app.explorer',
          // Navigation
          'app.navigation',
          // Toolbar
          'app.toolbar',
          // Quick Panel
          'app.quick-panel',
          'app.login-panel',
          'app.registration-panel',
          // Apps
          'app.welcome',
          'app.calendar',
          'app.e-commerce',
          'app.mail',
          'app.chat',
          'app.file-manager',
          'app.gantt-chart',
          'app.todo',
          'app.contacts',
          'app.notes',
          // Pages
          'app.pages',
          // User Interface
          'app.ui',
          // Components
          'app.components'
         ]);
})();
