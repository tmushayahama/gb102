define(["angular"],function(angular){"use strict";var module=angular.module("app.project",["ui.router"]),projectConfig=function($stateProvider){$stateProvider.state("apps.projects",{url:"/projects","abstract":!0,views:{apps:{controller:"ProjectsCtrl as projectsCtrl",templateUrl:"public/build/scripts/modules/project/views/projects.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/project/services/ProjectsManager.js","public/build/scripts/modules/project/controllers/ProjectsCtrl.js","public/build/scripts/modules/project/controllers/modals/CreateProjectCtrl.js"]})}]}}}}).state("apps.projects.all",{url:"/all",views:{"app-tab":{controller:"ProjectsAllCtrl as projectsTabCtrl",templateUrl:"public/build/scripts/modules/project/views/tabs/projects/project-list.html",resolve:{isSearch:function(){return!1},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/controllers/ProjectsAllCtrl.js"]})}]}}}}).state("apps.projects.type",{url:"/all/{type_id}",views:{"app-tab":{controller:"ProjectsAppCtrl as projectsTabCtrl",templateUrl:"public/build/scripts/modules/project/views/tabs/projects/project-list.html",resolve:{isSearch:function(){return!1},load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/controllers/ProjectsAppCtrl.js"]})}]}}}}).state("apps.projects.mine",{url:"/mine",views:{"app-tab":{controller:"ProjectsMineCtrl as projectsTabCtrl",templateUrl:"public/build/scripts/modules/project/views/tabs/projects/project-list.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/controllers/ProjectsMineCtrl.js"]})}]}}}}).state("apps.project",{"abstract":!0,url:"/project/{projectId}",views:{apps:{controller:"ProjectCtrl as projectCtrl",templateUrl:"public/build/scripts/modules/project/views/project.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/app/services/ConstantsManager.js","public/build/scripts/modules/project/services/ProjectManager.js","public/build/scripts/modules/project/controllers/ProjectCtrl.js","public/build/scripts/modules/project/filters/randomize.js"]})}]}}}}).state("apps.project.overview",{url:"/overview",views:{content:{controller:"ProjectOverviewCtrl as projectOverviewCtrl",templateUrl:"public/build/scripts/modules/project/views/tabs/project/project-overview.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/controllers/ProjectOverviewCtrl.js","public/build/scripts/modules/project/services/ProjectTimelineManager.js","public/build/scripts/modules/project/services/ProjectTimelinesManager.js","public/build/scripts/modules/project/controllers/ProjectTimelinesCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectTimelineCtrl.js"]})}]}}}}).state("apps.project.manage",{url:"/manage",views:{content:{controller:"ProjectManageCtrl as projectManageCtrl",templateUrl:"public/build/scripts/modules/project/views/tabs/project/project-manage.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/controllers/ProjectManageCtrl.js","public/build/scripts/modules/project/services/ProjectTimelineManager.js","public/build/scripts/modules/project/services/ProjectTimelinesManager.js","public/build/scripts/modules/project/controllers/ProjectTimelinesCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectTimelineCtrl.js"]})}]}}}}).state("apps.project.tools",{url:"/tools",views:{content:{templateUrl:"public/build/scripts/modules/project/views/tabs/project/project-tools.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/directives/todoEscape.js","public/build/scripts/modules/project/directives/todoFocus.js","public/build/scripts/modules/project/services/ProjectTodoManager.js","public/build/scripts/modules/project/services/ProjectTodosManager.js","public/build/scripts/modules/project/services/ProjectTodoChecklistManager.js","public/build/scripts/modules/project/controllers/ProjectTodosCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectTodoCtrl.js","public/build/scripts/modules/project/services/ProjectNoteManager.js","public/build/scripts/modules/project/services/ProjectNotesManager.js","public/build/scripts/modules/project/controllers/ProjectNotesCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectNoteCtrl.js","public/build/scripts/modules/project/services/ProjectWeblinkManager.js","public/build/scripts/modules/project/services/ProjectWeblinksManager.js","public/build/scripts/modules/project/controllers/ProjectWeblinksCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectWeblinkCtrl.js"]})}]}}}}).state("apps.project.community",{url:"/community",views:{content:{templateUrl:"public/build/scripts/modules/project/views/tabs/project/project-community.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app.project",serie:!0,files:["public/build/scripts/modules/project/services/ProjectCommentManager.js","public/build/scripts/modules/project/services/ProjectCommentsManager.js","public/build/scripts/modules/project/controllers/ProjectCommentsCtrl.js","public/build/scripts/modules/project/controllers/modals/ProjectCommentCtrl.js"]})}]}}}})};return projectConfig.$inject=["$stateProvider"],module.config(projectConfig),module});