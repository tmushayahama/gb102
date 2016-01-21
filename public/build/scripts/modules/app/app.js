"use strict";define(["angular","angular-ui-router","angular-resource","angular-animate","oc-lazy-load","satellizer","angular-bootstrap","bootstrap","angular-xeditable","angular-local-storage","angular-css","angular-wizard","hammerjs","angular-gestures","angular-loading-bar","angular-aside","../auth/module","../community/module","../explore/module","../swipe/module","../profile/module","../questionnaire/module"],function(angular){var app=angular.module("app",["ui.router","ngResource","ngAnimate","satellizer","oc.lazyLoad","ui.bootstrap","xeditable","LocalStorageModule","door3.css","mgo-angular-wizard","angular-gestures","angular-loading-bar","ngAside","app.auth","app.community","app.explore","app.swipe","app.profile","app.questionnaire"]),appConfig=function($ocLazyLoadProvider,$stateProvider,$urlRouterProvider,$httpProvider,$authProvider,localStorageServiceProvider,hammerDefaultOptsProvider,$provide){$ocLazyLoadProvider.config({debug:!0,loadedModules:["app","app.auth"],asyncLoader:require}),localStorageServiceProvider.setPrefix("gb102").setStorageType("localStorage").setNotify(!0,!0),hammerDefaultOptsProvider.set({recognizers:[[Hammer.Tap,{time:250}],[Hammer.Swipe,{}]]}),$authProvider.loginUrl="/api/authenticate",$urlRouterProvider.otherwise("/auth"),$stateProvider.state("apps",{url:"/apps","abstract":!0,views:{root:{controller:"AppsCtrl as appsCtrl",templateUrl:"public/build/scripts/modules/app/views/appsView.html",resolve:{load:function($ocLazyLoad){return $ocLazyLoad.load({name:"app",files:["public/build/scripts/modules/common/directives/show-tab.js","public/build/scripts/modules/app/controllers/AppsCtrl.js","public/build/scripts/modules/app/controllers/modals/MenuModalCtrl.js"]})}}}}})};appConfig.$inject=["$ocLazyLoadProvider","$stateProvider","$urlRouterProvider","$httpProvider","$authProvider","localStorageServiceProvider","hammerDefaultOptsProvider","$provide"],app.config(appConfig);var appRun=function($stateParams,$rootScope,$state,editableOptions,localStorageService){$rootScope.$on("$stateChangeStart",function(event,toState){var user=JSON.parse(localStorageService.get("user"));user?($rootScope.authenticated=!0,$rootScope.user=user,"auth"===toState.name&&(event.preventDefault(),$state.go("apps.explores.all"))):"auth"!==toState.name&&(event.preventDefault(),$state.go("auth"))}),editableOptions.theme="bs3"};return appRun.$inject=["$stateParams","$rootScope","$state","editableOptions","localStorageService"],app.run(appRun),app.constant("_",window._),app.constant("level_categories",{skill:1,goal:2,hobby:3,promise:4,mentorship:5,collaboration:6,teach:7,advice:8,group:9,journal:10,skill_swipe:11,goal_swipe:12,hobby_swipe:13,promise_swipe:14,mentorship_swipe:15,advice_swipe:16}),app});