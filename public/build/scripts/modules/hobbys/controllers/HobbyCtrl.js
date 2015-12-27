var hobbyCtrl=function(_,ConstantsManager,HobbyManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-4.css"},$scope),vm.hobby=[];vm.range=function(min,max){return _.range(min,max)},vm.hobbyIcons=[],vm.hobbyIconsArray=[];var getRand=function(min,max){return Math.floor(Math.random()*max+min)};vm.getRandomHobbyIcons=function(){for(var i=0;5>i;i++){for(var rowArray=[],j=0;j<vm.hobbyIcons.length;j++){var rand=getRand(0,vm.hobbyIcons.length);rowArray.push(vm.hobbyIcons[rand].name)}vm.hobbyIconsArray.push(rowArray)}},vm.hobbyId=$stateParams.hobbyId,vm.hobbyManager=new HobbyManager,vm.constantsManager=new ConstantsManager,vm.hobbyFormDisplay=!1,vm.getHobby=function(id,data){vm.hobbyManager.getHobby(id,data).success(function(response){vm.hobby=response}).error(function(response){console.log(response)})},vm.defaultHobbyData={hobbyId:$stateParams.hobbyId,privacy:0},vm.newHobbyData=angular.copy(vm.defaultHobbyData),vm.showForm=function(){vm.FormDisplay=!0},vm.createHobby=function(data){vm.hobbyManager.createHobby(data).then(function(response){vm.FormDisplay=!1,vm.newHobbyData=angular.copy(vm.defaultHobbyData),vm.hobbyCopy=angular.copy(vm.hobbyManager.hobby)},function(response){console.log(response)})},vm.editHobby=function(data){vm.hobbyManager.editHobby(data).then(function(response){vm.FormDisplay=!1,vm.newHobbyData=angular.copy(vm.defaultHobbyData),vm.hobbyCopy=angular.copy(vm.hobbyManager.hobby)},function(response){console.log(response)})},vm.editHobbySections={details:function(hobbyId,detail){var hobbyData={hobbyId:hobbyId,title:detail.title,description:detail.description};vm.editHobby(hobbyData)}},vm.cancelHobby=function(form){vm.FormDisplay=!1,vm.newHobbyData=angular.copy(vm.defaultHobbyData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertHobby=function(hobby,hobbyCopy){hobby=hobbyCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.hobby}),function(){vm.doneCount=vm.hobbyManager.hobby.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(hobby){vm.edited=hobby,vm.original=angular.copy(hobby)},vm.doneEditing=function(hobby){vm.edited=null,hobby.title=hobby.title.trim(),hobby.title||vm.remove(hobby)},vm.hobbyManager.getHobby(vm.hobbyId),vm.constantsManager.getIcons(1).then(function(data){vm.hobbyIcons=data,vm.getRandomHobbyIcons()})};hobbyCtrl.$inject=["_","ConstantsManager","HobbyManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.hobbys").controller("HobbyCtrl",hobbyCtrl);