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
          'app.swipe',
          'app.matcher',
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
          'app.chat',
          'app.gantt-chart',
          'app.todo',
          'app.components',
          "app.mentorship"
                  // Pages
                  //'app.pages',
                  // User Interface
                  //'app.ui',
                  // Components
                  //'app.components'
         ]);
})();
