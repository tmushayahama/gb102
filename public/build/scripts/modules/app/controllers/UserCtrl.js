"use strict";define(["angular"],function(angular){return["$http","$auth","$rootScope","$state",function($http,$auth,$rootScope,$state){var vm=this;vm.users,vm.error,vm.getUsers=function(){$http.get("api/authenticate").success(function(users){vm.users=users}).error(function(error){vm.error=error})},vm.logout=function(){$auth.logout().then(function(){localStorage.removeItem("user"),$rootScope.authenticated=!1,$rootScope.currentUser=null,$state.go("auth")})}}]});