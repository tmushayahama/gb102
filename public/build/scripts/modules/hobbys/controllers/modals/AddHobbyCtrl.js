angular.module("app.hobbys").controller("AddHobbyCtrl",["$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","hobbyLevels",function(a,b,c,d,e,f,g,h,i){var j=this;j.hobby="",j.hobbyLevels=i,j.ok=function(){a.close(j.hobby)},j.close=function(){a.dismiss("cancel")}}]);