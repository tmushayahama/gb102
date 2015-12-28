var adviceCtrl=function(_,ConstantsManager,AdviceManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-6.css"},$scope),vm.advice=[];vm.range=function(min,max){return _.range(min,max)},vm.adviceIcons=[],vm.adviceIconsArray=[];var getRand=function(min,max){return Math.floor(Math.random()*max+min)};vm.getRandomAdviceIcons=function(){for(var i=0;5>i;i++){for(var rowArray=[],j=0;j<vm.adviceIcons.length;j++){var rand=getRand(0,vm.adviceIcons.length);rowArray.push(vm.adviceIcons[rand].name)}vm.adviceIconsArray.push(rowArray)}},vm.adviceId=$stateParams.adviceId,vm.adviceManager=new AdviceManager,vm.constantsManager=new ConstantsManager,vm.adviceFormDisplay=!1,vm.getAdvice=function(id,data){vm.adviceManager.getAdvice(id,data).success(function(response){vm.advice=response}).error(function(response){console.log(response)})},vm.defaultAdviceData={adviceId:$stateParams.adviceId,privacy:0},vm.newAdviceData=angular.copy(vm.defaultAdviceData),vm.showForm=function(){vm.FormDisplay=!0},vm.createAdvice=function(data){vm.adviceManager.createAdvice(data).then(function(response){vm.FormDisplay=!1,vm.newAdviceData=angular.copy(vm.defaultAdviceData),vm.adviceCopy=angular.copy(vm.adviceManager.advice)},function(response){console.log(response)})},vm.editAdvice=function(data){vm.adviceManager.editAdvice(data).then(function(response){vm.FormDisplay=!1,vm.newAdviceData=angular.copy(vm.defaultAdviceData),vm.adviceCopy=angular.copy(vm.adviceManager.advice)},function(response){console.log(response)})},vm.editAdviceSections={details:function(adviceId,detail){var adviceData={adviceId:adviceId,title:detail.title,description:detail.description};vm.editAdvice(adviceData)}},vm.cancelAdvice=function(form){vm.FormDisplay=!1,vm.newAdviceData=angular.copy(vm.defaultAdviceData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertAdvice=function(advice,adviceCopy){advice=adviceCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.advice}),function(){vm.doneCount=vm.adviceManager.advice.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(advice){vm.edited=advice,vm.original=angular.copy(advice)},vm.doneEditing=function(advice){vm.edited=null,advice.title=advice.title.trim(),advice.title||vm.remove(advice)},vm.adviceManager.getAdvice(vm.adviceId),vm.constantsManager.getIcons(1).then(function(data){vm.adviceIcons=data,vm.getRandomAdviceIcons()})};adviceCtrl.$inject=["_","ConstantsManager","AdviceManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.advices").controller("AdviceCtrl",adviceCtrl);