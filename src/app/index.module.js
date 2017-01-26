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
          'ui.tree',
          // Core
          'app.core',
          'app.search',
          'app.profile',
          'app.explorer',
          'app.swipe',
          'app.matcher',
          'app.navigation',
          'app.toolbar',
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
          'app.mentorship'
         ]);
})();
