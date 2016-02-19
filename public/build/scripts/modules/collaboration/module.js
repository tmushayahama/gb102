define(["angular"],function(angular){"use strict";var module=angular.module("app.collaboration",["ui.router"]),collaborationConfig=function($stateProvider){$stateProvider.state("apps.collaborations",{url:"/collaborations","abstract":!0,views:{apps:{controller:"CollaborationsCtrl as collaborationsCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/collaborations.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/collaboration/services/CollaborationsManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationsCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CreateCollaborationCtrl.js"]})}]}}}}).state("apps.collaborations.all",{url:"/all",views:{"app-tab":{controller:"CollaborationsAllCtrl as collaborationsTabCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaborations/collaboration-list.html",resolve:{isSearch:function(){return!1},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/controllers/CollaborationsAllCtrl.js"]})}]}}}}).state("apps.collaborations.type",{url:"/all/{type_id}",views:{"app-tab":{controller:"CollaborationsAppCtrl as collaborationsTabCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaborations/collaboration-list.html",resolve:{isSearch:function(){return!1},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/controllers/CollaborationsAppCtrl.js"]})}]}}}}).state("apps.collaborations.mine",{url:"/mine",views:{"app-tab":{controller:"CollaborationsMineCtrl as collaborationsTabCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaborations/collaboration-list.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/controllers/CollaborationsMineCtrl.js"]})}]}}}}).state("apps.collaboration",{"abstract":!0,url:"/collaboration/{collaborationId}",views:{apps:{controller:"CollaborationCtrl as collaborationCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/collaboration.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/collaboration/services/CollaborationManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationCtrl.js","public/build/scripts/modules/collaboration/filters/randomize.js"]})}]}}}}).state("apps.collaboration.overview",{url:"/overview",views:{content:{controller:"CollaborationOverviewCtrl as collaborationOverviewCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaboration/collaboration-overview.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/controllers/CollaborationOverviewCtrl.js","public/build/scripts/modules/collaboration/services/CollaborationProgressManager.js","public/build/scripts/modules/collaboration/services/CollaborationProgressManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationProgressCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationProgressCtrl.js"]})}]}}}}).state("apps.collaboration.manage",{url:"/manage",views:{content:{controller:"CollaborationManageCtrl as collaborationManageCtrl",templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaboration/collaboration-manage.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/controllers/CollaborationManageCtrl.js","public/build/scripts/modules/collaboration/services/CollaborationProgressManager.js","public/build/scripts/modules/collaboration/services/CollaborationProgressManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationProgressCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationProgressCtrl.js"]})}]}}}}).state("apps.collaboration.tools",{url:"/tools",views:{content:{templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaboration/collaboration-tools.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/directives/todoEscape.js","public/build/scripts/modules/collaboration/directives/todoFocus.js","public/build/scripts/modules/collaboration/services/CollaborationTodoManager.js","public/build/scripts/modules/collaboration/services/CollaborationTodosManager.js","public/build/scripts/modules/collaboration/services/CollaborationTodoChecklistManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationTodosCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationTodoCtrl.js","public/build/scripts/modules/collaboration/services/CollaborationNoteManager.js","public/build/scripts/modules/collaboration/services/CollaborationNotesManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationNotesCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationNoteCtrl.js","public/build/scripts/modules/collaboration/services/CollaborationWeblinkManager.js","public/build/scripts/modules/collaboration/services/CollaborationWeblinksManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationWeblinksCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationWeblinkCtrl.js"]})}]}}}}).state("apps.collaboration.community",{url:"/community",views:{content:{templateUrl:"public/build/scripts/modules/collaboration/views/tabs/collaboration/collaboration-community.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.collaboration",serie:!0,files:["public/build/scripts/modules/collaboration/services/CollaborationCommentManager.js","public/build/scripts/modules/collaboration/services/CollaborationCommentsManager.js","public/build/scripts/modules/collaboration/controllers/CollaborationCommentsCtrl.js","public/build/scripts/modules/collaboration/controllers/modals/CollaborationCommentCtrl.js"]})}]}}}})};return collaborationConfig.$inject=["$stateProvider"],module.config(collaborationConfig),module});