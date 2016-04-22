"use strict";define(["angular","angular-ui-router","angular-resource","angular-animate","angular-messages","oc-lazy-load","satellizer","angular-bootstrap","bootstrap","angular-xeditable","angular-local-storage","angular-css","angular-wizard","hammerjs","angular-gestures","angular-loading-bar","angular-aside","checklist-model","ng-tags-input","angular-aria","angular-material","infinite-scroll","truncate-filters","../auth/module","../search/module","../community/module","../explorer/module","../swipe/module","../profile/module","../questionnaire/module","../mentorship/module","../teach/module","../advice/module","../collaboration/module","../goal/module","../journal/module","../project/module"],function(angular){var app=angular.module("app",["ngAnimate","ngMessages","ngMaterial","ui.router","ngResource","satellizer","oc.lazyLoad","ui.bootstrap","xeditable","LocalStorageModule","door3.css","mgo-angular-wizard","angular-gestures","angular-loading-bar","ngAside","checklist-model","ngTagsInput","infinite-scroll","ngAria","gb-filters.truncate","app.auth","app.search","app.community","app.explorer","app.swipe","app.profile","app.questionnaire","app.mentorship"]),appConfig=function($ocLazyLoadProvider,$stateProvider,$urlRouterProvider,$httpProvider,$authProvider,localStorageServiceProvider,hammerDefaultOptsProvider,$provide){$ocLazyLoadProvider.config({debug:!0,loadedModules:["app","app.auth"],asyncLoader:require}),localStorageServiceProvider.setPrefix("gb102").setStorageType("localStorage").setNotify(!0,!0),hammerDefaultOptsProvider.set({recognizers:[[Hammer.Tap,{time:250}],[Hammer.Swipe,{}]]}),$authProvider.loginUrl="/api/authenticate",$urlRouterProvider.otherwise("/auth"),$stateProvider.state("apps",{url:"","abstract":!0,views:{root:{controller:"AppsCtrl as appsCtrl",templateUrl:"public/build/scripts/modules/app/views/apps.html",resolve:{load:function($ocLazyLoad){return $ocLazyLoad.load({name:"app",serie:!0,files:["public/build/scripts/modules/common/directives/show-tab.drv.js","public/build/scripts/modules/common/directives/sticky.drv.js","public/build/scripts/modules/search/services/search.srv.js","public/build/scripts/modules/app/controllers/apps.ctrl.js","public/build/scripts/modules/explorer/directives/explorer-box.drv.js","public/build/scripts/modules/app/controllers/menu-modal.ctrl.js"]})}}}}}).state("apps.home",{url:"/home",views:{apps:{templateUrl:"public/build/scripts/modules/app/views/apps-home.html",resolve:{load:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load({name:"app",serie:!0,files:["public/build/scripts/modules/app/services/constants.srv.js"]})}]}}}})};appConfig.$inject=["$ocLazyLoadProvider","$stateProvider","$urlRouterProvider","$httpProvider","$authProvider","localStorageServiceProvider","hammerDefaultOptsProvider","$provide"],app.config(appConfig);var appRun=function($stateParams,$rootScope,$state,editableOptions,localStorageService){$rootScope.$on("$stateChangeStart",function(event,toState){var user=JSON.parse(localStorageService.get("user"));user?($rootScope.authenticated=!0,$rootScope.user=user,"auth"===toState.name&&(event.preventDefault(),$state.go("apps.explorer.all"))):"auth"!==toState.name&&(event.preventDefault(),$state.go("auth"))}),editableOptions.theme="bs3"};return appRun.$inject=["$stateParams","$rootScope","$state","editableOptions","localStorageService"],app.run(appRun),app.constant("_",window._),app.constant("level_categories",{request_type_offset:1e3,skills:1,goals:2,hobbies:3,promises:4,mentorships:5,collaborations:6,teach:7,advices:8,groups:9,journals:10,request_type_skill:1001,request_type_goal:1002,todo_status:5e4,todo_in_progress:5e4,todo_later:50001,todo_done:50002,contribution_types:6e4}),app});