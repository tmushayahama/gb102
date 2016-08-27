define(["angular"],function(angular){"use strict";var module=angular.module("app.explorer",["ui.router"]),explorerConfig=function($stateProvider){$stateProvider.state("apps.explorer",{url:"/explorer",views:{apps:{controller:"ExplorersCtrl as explorersCtrl",templateUrl:"public/build/scripts/modules/explorer/views/explorers.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/community/services/community.srv.js","public/build/scripts/modules/app/services/constants.srv.js","public/build/scripts/modules/explorer/services/explorers.srv.js","public/build/scripts/modules/explorer/controllers/explorers.ctrl.js","public/build/scripts/modules/explorer/controllers/add-explorer-modal.ctrl.js","public/build/scripts/modules/explorer/controllers/create-request-explorer-modal.ctrl.js"]})}]}}}}).state("apps.app",{url:"/explorer/{app_name}",views:{apps:{controller:"ExplorersAppCtrl as explorersTabCtrl",templateUrl:"public/build/scripts/modules/explorer/views/explorers-app.html",resolve:{listType:function(){return 1},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/app/services/constants.srv.js","public/build/scripts/modules/explorer/services/explorers.srv.js","public/build/scripts/modules/explorer/controllers/explorers.ctrl.js","public/build/scripts/modules/explorer/controllers/add-explorer-modal.ctrl.js","public/build/scripts/modules/explorer/controllers/create-request-explorer-modal.ctrl.js","public/build/scripts/modules/explorer/controllers/explorers-app.ctrl.js"]})}]}}}}).state("apps.explorer.mine",{url:"/mine",views:{"app-tab":{controller:"ExplorersMineCtrl as explorersTabCtrl",templateUrl:"public/build/scripts/modules/explorer/views/tabs/explorers/explorer-list.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/controllers/explorers-mine.ctrl.js"]})}]}}}}).state("apps.explorerItem",{"abstract":!0,url:"/explorer/{explorerId}",views:{apps:{controller:"ExplorerCtrl as explorerCtrl",templateUrl:"public/build/scripts/modules/explorer/views/explorer.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/directives/todo/explorer-todo-box.drv.js","public/build/scripts/modules/explorer/directives/activity/explorer-activity-box.drv.js","public/build/scripts/modules/explorer/directives/component/explorer-component-box.drv.js","public/build/scripts/modules/explorer/directives/guideline/explorer-guideline-box.drv.js","public/build/scripts/modules/explorer/directives/note/explorer-note-box.drv.js","public/build/scripts/modules/explorer/directives/objective/explorer-objective-box.drv.js","public/build/scripts/modules/explorer/directives/plan/explorer-plan-box.drv.js","public/build/scripts/modules/explorer/directives/section/explorer-section-box.drv.js","public/build/scripts/modules/explorer/services/section/explorer-sections.srv.js","public/build/scripts/modules/community/services/community.srv.js","public/build/scripts/modules/app/services/constants.srv.js","public/build/scripts/modules/explorer/services/explorer.srv.js","public/build/scripts/modules/explorer/controllers/explorer.ctrl.js","public/build/scripts/modules/explorer/filters/randomize.js"]})}]}}}}).state("apps.explorerItem.overview",{url:"/overview",views:{content:{controller:"ExplorerOverviewCtrl as explorerOverviewCtrl",templateUrl:"public/build/scripts/modules/explorer/views/tabs/explorer/explorer-overview.html",resolve:{todoLevelId:function(level_categories){return level_categories.todo_level_progress},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/directives/sub-explorer/sub-explorer-box.drv.js","public/build/scripts/modules/explorer/directives/sub-explorer/application-explorer-box.drv.js","public/build/scripts/modules/explorer/controllers/explorer-overview.ctrl.js","public/build/scripts/modules/explorer/services/section/explorer-sections.srv.js","public/build/scripts/modules/explorer/controllers/section/explorer-section-modal.ctrl.js","public/build/scripts/modules/explorer/controllers/section/explorer-section-item-modal.ctrl.js","public/build/scripts/modules/explorer/services/objective/explorer-objectives.srv.js","public/build/scripts/modules/explorer/controllers/objective/explorer-objectives.ctrl.js","public/build/scripts/modules/explorer/controllers/objective/explorer-objective-modal.ctrl.js","public/build/scripts/modules/explorer/services/plan/explorer-plans.srv.js","public/build/scripts/modules/explorer/controllers/plan/explorer-plans.ctrl.js","public/build/scripts/modules/explorer/controllers/plan/explorer-plan-modal.ctrl.js","public/build/scripts/modules/explorer/services/todo/explorer-todos.srv.js","public/build/scripts/modules/explorer/services/todo/explorer-todo-checklist.srv.js","public/build/scripts/modules/explorer/controllers/sub-explorer/sub-explorers.ctrl.js","public/build/scripts/modules/explorer/controllers/todo/explorer-todos.ctrl.js","public/build/scripts/modules/explorer/controllers/todo/explorer-todo-modal.ctrl.js"]})}]}}}}).state("apps.explorerItem.explore",{url:"/explore",views:{content:{templateUrl:"public/build/scripts/modules/explorer/views/tabs/explorer/explorer-explore.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/services/component/explorer-components.srv.js","public/build/scripts/modules/explorer/controllers/component/explorer-components.ctrl.js","public/build/scripts/modules/explorer/controllers/component/explorer-component-modal.ctrl.js","public/build/scripts/modules/explorer/services/activity/explorer-activities.srv.js","public/build/scripts/modules/explorer/controllers/activity/explorer-activities.ctrl.js","public/build/scripts/modules/explorer/controllers/activity/explorer-activity-modal.ctrl.js","public/build/scripts/modules/explorer/services/guideline/explorer-guidelines.srv.js","public/build/scripts/modules/explorer/controllers/guideline/explorer-guidelines.ctrl.js","public/build/scripts/modules/explorer/controllers/guideline/explorer-guideline-modal.ctrl.js","public/build/scripts/modules/explorer/services/note/explorer-notes.srv.js","public/build/scripts/modules/explorer/controllers/note/explorer-notes.ctrl.js","public/build/scripts/modules/explorer/controllers/note/explorer-note-modal.ctrl.js","public/build/scripts/modules/explorer/services/weblink/explorer-weblinks.srv.js","public/build/scripts/modules/explorer/controllers/weblink/explorer-weblinks.ctrl.js","public/build/scripts/modules/explorer/controllers/weblink/explorer-weblink-modal.ctrl.js"]})}]}}}}).state("apps.explorerItem.discussion",{url:"/discussion",views:{content:{templateUrl:"public/build/scripts/modules/explorer/views/tabs/explorer/explorer-discussion.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/services/comment/explorer-comment.srv.js","public/build/scripts/modules/explorer/services/comment/explorer-comments.srv.js","public/build/scripts/modules/explorer/controllers/comment/explorer-comments.ctrl.js","public/build/scripts/modules/explorer/controllers/comment/explorer-comment-modal.ctrl.js","public/build/scripts/modules/explorer/services/discussion/explorer-discussion.srv.js","public/build/scripts/modules/explorer/services/discussion/explorer-discussions.srv.js","public/build/scripts/modules/explorer/controllers/discussion/explorer-discussions.ctrl.js","public/build/scripts/modules/explorer/controllers/discussion/explorer-discussion-modal.ctrl.js"]})}]}}}}).state("apps.explorerItem.contribution",{url:"/contribution",views:{content:{templateUrl:"public/build/scripts/modules/explorer/views/tabs/explorer/explorer-contribution.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.explorer",serie:!0,files:["public/build/scripts/modules/explorer/services/contribution/explorer-contribution.srv.js","public/build/scripts/modules/explorer/services/contribution/explorer-contributions.srv.js","public/build/scripts/modules/explorer/controllers/contribution/explorer-contributions.ctrl.js","public/build/scripts/modules/explorer/controllers/contribution/explorer-contribution.ctrl.js","public/build/scripts/modules/explorer/controllers/contribution/create-explorer-contribution-modal.ctrl.js"]})}]}}}})};return explorerConfig.$inject=["$stateProvider"],module.config(explorerConfig),module});