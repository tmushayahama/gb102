"use strict";define(["angular","angular-ui-router","angular-resource","angular-animate","angular-messages","oc-lazy-load","satellizer","angular-bootstrap","bootstrap","angular-xeditable","angular-local-storage","angular-css","angular-wizard","hammerjs","angular-gestures","angular-loading-bar","angular-aside","checklist-model","ng-tags-input","angular-aria","angular-material","infinite-scroll","truncate-filters","angular-grid","angular-gridster","ng-joyride","angular-iscroll","../search/module","../community/module","../explorer/module","../swipe/module","../profile/module","../questionnaire/module"],function(angular){var app=angular.module("app",["ngAnimate","ngMessages","ngMaterial","ui.router","ngResource","satellizer","oc.lazyLoad","ui.bootstrap","xeditable","LocalStorageModule","angularCSS","mgo-angular-wizard","angular-gestures","angular-loading-bar","ngAside","checklist-model","ngTagsInput","infinite-scroll","ngAria","gb-filters.truncate","angularGrid","gridster","ngJoyRide","angular-iscroll","app.search","app.community","app.explorer","app.swipe","app.profile","app.questionnaire"]),appConfig=function($ocLazyLoadProvider,$stateProvider,$urlRouterProvider,$httpProvider,$authProvider,localStorageServiceProvider,hammerDefaultOptsProvider,$provide){$ocLazyLoadProvider.config({debug:!0,loadedModules:["app"],asyncLoader:require}),localStorageServiceProvider.setPrefix("gb102").setStorageType("localStorage").setNotify(!0,!0),hammerDefaultOptsProvider.set({recognizers:[[Hammer.Tap,{time:250}],[Hammer.Swipe,{}]]}),$authProvider.loginUrl="/api/authenticate",$urlRouterProvider.otherwise("/"),$stateProvider.state("apps",{url:"","abstract":!0,views:{root:{controller:"AppsCtrl as appsCtrl",templateUrl:"public/build/scripts/modules/app/views/apps.html",resolve:{load:function($ocLazyLoad){return $ocLazyLoad.load({name:"app",serie:!0,files:["public/build/scripts/modules/explorer/directives/component/component-boxette.drv.js","public/build/scripts/modules/app/services/constants.srv.js","public/build/scripts/modules/auth/services/auth.srv.js","public/build/scripts/modules/common/services/toast.srv.js","public/build/scripts/modules/common/directives/show-tab.drv.js","public/build/scripts/modules/common/directives/horizontal-scrolling.drv.js","public/build/scripts/modules/common/directives/sticky.drv.js","public/build/scripts/modules/search/services/search.srv.js","public/build/scripts/modules/auth/controllers/login-modal.ctrl.js","public/build/scripts/modules/auth/controllers/registration-modal.ctrl.js","public/build/scripts/modules/app/controllers/apps.ctrl.js","public/build/scripts/modules/explorer/directives/explorer-box.drv.js","public/build/scripts/modules/explorer/directives/explorer-box-2.drv.js","public/build/scripts/modules/app/controllers/menu-modal.ctrl.js"]})}}}}}).state("apps.home",{url:"/",views:{apps:{templateUrl:"public/build/scripts/modules/app/views/apps-home.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app",serie:!0,files:["public/build/scripts/modules/community/services/community.srv.js","public/build/scripts/modules/app/services/constants.srv.js","public/build/scripts/modules/explorer/services/component/components.srv.js","public/build/scripts/modules/explorer/controllers/explorers.ctrl.js","public/build/scripts/modules/explorer/controllers/add-explorer-modal.ctrl.js","public/build/scripts/modules/explorer/controllers/create-request-explorer-modal.ctrl.js"]})}]}}}})};appConfig.$inject=["$ocLazyLoadProvider","$stateProvider","$urlRouterProvider","$httpProvider","$authProvider","localStorageServiceProvider","hammerDefaultOptsProvider","$provide"],app.config(appConfig);var appRun=function($stateParams,$animate,$rootScope,$state,editableOptions,localStorageService,$uibModalStack){$animate.enabled(!1),$rootScope.$on("$stateChangeStart",function(event,toState){$uibModalStack.dismissAll();var user=JSON.parse(localStorageService.get("user"));user?($rootScope.authenticated=!0,$rootScope.user=user,"apps.home"===toState.name&&(event.preventDefault(),$state.go("apps.explorer"))):($rootScope.authenticated=!1,"apps.home"===toState.name)}),editableOptions.theme="bs3",$animate.enabled(!0)};return appRun.$inject=["$stateParams","$animate","$rootScope","$state","editableOptions","localStorageService","$uibModalStack"],app.run(appRun),app.constant("_",window._),app.constant("level_categories",{apps:1,skills:2,goals:3,hobbies:4,promises:5,mentorships:6,collaborations:7,teach:8,advices:9,groups:10,journals:11,request_type_skill:1001,request_type_goal:1002,todo_level_normal:5e4,todo_level_progress:50001,todo_status_in_progress:50100,todo_status_later:50101,todo_status_done:50102,contribution_types:4e3,explorer_relationship:{parent:6001,application:6002},list:{handpicked:1},share:{explorer:3e5,notes:300001},privacy_type:1e4,privacy:{"private":10001,"public":10002,customize:10003},component:{none:11001,note:11002,guideline:11003,activity:11004,weblink:11005,question:11100},component_background_colors:13e3,default_component_background_color:13001}),app});