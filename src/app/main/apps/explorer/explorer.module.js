(function ()
{
 'use strict';

 angular
         .module('app.explorer',
                 [
                  'app.components',
                  'app.mentorship',
                  // 3rd Party Dependencies
                  'moment-picker',
                  'ui.calendar',
                  'ui.sortable',
                  'xeditable'
                 ]
                 )
         .config(config);

 /** @ngInject */
 function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
 {
  $stateProvider.state('app.explorer', {
   url: '/explorer',
   abstract: true,
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/views/components/components.html',
     controller: 'ExplorerComponentsController as componentsCtrl'
    }
   },
   bodyClass: 'explorer'
  }).state('app.explorer.home', {
   url: '/overview',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/tabs/home/home.html',
     controller: 'ExplorerComponentsHomeTabController as vm'
    }
   },
   data: {
    'selectedTab': 0
   }
  }).state('app.explorer.swipe', {
   url: '/swipe',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/tabs/swipe/swipe.html',
     controller: 'ExplorerComponentsSwipeTabController as vm'
    }
   },
   data: {
    'selectedTab': 1
   }
  }).state('app.explorer.matcher', {
   url: '/matcher',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/tabs/matcher/matcher.html',
     controller: 'ExplorerComponentsMatcherTabController as vm'
    }
   },
   data: {
    'selectedTab': 2
   }
  }).state('app.explorer.business', {
   url: '/business',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/tabs/business/business.html',
     controller: 'ExplorerComponentsBusinessTabController as vm'
    }
   },
   data: {
    'selectedTab': 3
   }
  }).state('app.explorer.mentorship', {
   url: '/mentorship',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/tabs/mentorship/mentorship.html',
     controller: 'ExplorerComponentsMentorshipTabController as vm'
    }
   },
   data: {
    'selectedTab': 4
   }
  }).state('app.apps', {
   url: '/explorer/{app_name}',
   abstract: true,
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/views/app-components/app-components.html',
     controller: 'AppExplorerComponentsController as componentAppCtrl'
    }
   }
  }).state('app.apps.home', {
   url: '/home',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/app-components/tabs/home/home.html',
     controller: 'AppComponentsHomeTabController as vm'
    }
   },
   data: {
    'selectedTab': 0
   }
  }).state('app.apps.app', {
   url: '/home',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/app-components/tabs/app/app.html',
     controller: 'AppComponentsHomeTabController as vm'
    }
   },
   data: {
    'selectedTab': 1
   }
  }).state('app.componentColumnView', {
   url: '/component/boardview/:id',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/explorer.html',
     controller: 'ExplorerController as vm'
    },
    'explorerContent@app.componentColumnView': {
     templateUrl: 'src/app/main/apps/explorer/views/component/column/component.html',
     controller: 'ComponentColumnController as vm'
    }
   }
  }).state('app.componentLinearView', {
   url: '/component/linearview/:id',
   abstract: true,
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/views/component/linear/component.html',
     controller: 'ComponentLinearController as componentLinearCtrl'
    }
   }
  }).state('app.componentLinearView.home', {
   url: '/overview',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/component/linear/tabs/home/home.html',
     controller: 'ComponentLinearHomeController as vm'
    }
   },
   data: {
    'selectedTab': 0
   }
  }).state('app.componentLinearView.furniture', {
   url: '/furniture',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/component/linear/tabs/furniture/furniture.html',
     controller: 'ComponentLinearFurnitureController as vm'
    }
   },
   data: {
    'selectedTab': 1
   }
  }).state('app.componentLinearView.service', {
   url: '/service',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/component/linear/tabs/service/service.html',
     controller: 'ComponentLinearServiceController as vm'
    }
   },
   data: {
    'selectedTab': 2
   }
  }).state('app.componentLinearView.tour', {
   url: '/tour',
   views: {
    'tab': {
     templateUrl: 'src/app/main/apps/explorer/views/component/linear/tabs/tour/tour.html',
     controller: 'ComponentLinearTourController as vm'
    }
   },
   data: {
    'selectedTab': 3
   }
  }).state('app.componentRowView', {
   url: '/component/rowview/:id',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/explorer.html',
     controller: 'ExplorerController as vm'
    },
    'explorerContent@app.componentColumnView': {
     templateUrl: 'src/app/main/apps/explorer/views/component/row/component.html',
     controller: 'ComponentRowController as vm'
    }
   }
  }).state('app.explorer.boards.addBoard', {
   url: '/add',
   views: {
    'content@app': {
     templateUrl: 'src/app/main/apps/explorer/explorer.html',
     controller: 'ExplorerController as vm'
    },
    'explorerContent@app.explorer.boards.addBoard': {
     templateUrl: 'src/app/main/apps/explorer/views/board/board-view.html',
     controller: 'BoardViewController as vm'
    }
   },
   resolve: {
    BoardData: function ($stateParams, ComponentService)
    {
     return ComponentService.addNewBoard();
    }
   }
  }).state('app.explorer.boards.board.calendar', {
   url: '/calendar',
   views: {
    'explorerContent@app.explorer.boards.board': {
     templateUrl: 'src/app/main/apps/explorer/views/calendar/calendar-view.html',
     controller: 'CalendarViewController as vm'
    }
   }
  });

  // Translation
  $translatePartialLoaderProvider.addPart('src/app/main/apps/explorer');

  // Api

 }

})();