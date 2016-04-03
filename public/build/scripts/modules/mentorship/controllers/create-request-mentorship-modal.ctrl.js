var createRequestMentorshipCtrl=function(ConstantsSrv,level_categories,$uibModalInstance,WizardHandler,$scope,$state,$stateParams,$http,$rootScope,$location,$log,requestOptions){var vm=this;vm.wizardHandler=WizardHandler,vm.mentorship={},vm.mentorshipLevels,vm.requestOptions=requestOptions,vm.selectedRequestOption,vm.wizardCurrentStep="Choose App",vm.constantsSrv=new ConstantsSrv,vm.getLevels=function(appId){vm.constantsSrv.getLevel(appId).then(function(data){vm.mentorshipLevels=data})},vm.getRequestTypes=function(appId){vm.constantsSrv.getLevel(appId+level_categories.request_type_offset).then(function(data){vm.requestTypes=[],angular.forEach(data,function(requestLevel){vm.requestTypes.push({requestLevel:requestLevel,mentorshipRequest:{levelId:requestLevel.id,description:""}})})})},vm.chooseRequestOption=function(requestOption){vm.mentorship.requestOptionId=requestOption.id,vm.mentorship.app_type_id=requestOption.level.app_type_id,vm.mentorship.parent_mentorship_id=requestOption.mentorship_id,vm.mentorship.title=requestOption.mentorship.title,vm.mentorship.description=requestOption.mentorship.description,vm.selectedRequestOption=requestOption,vm.getLevels(requestOption.level.app_type_id),vm.getRequestTypes(requestOption.level.app_type_id)},vm.next=function(){vm.wizardHandler.wizard("mentorship-form").next()},vm.previous=function(requestOption){vm.wizardHandler.wizard("mentorship-form").previous()},vm.ok=function(){vm.mentorship.mentorship_requests=[],angular.forEach(vm.selectedRequestTypes,function(selectedRequestType){vm.mentorship.mentorship_requests.push(selectedRequestType.mentorshipRequest)}),$uibModalInstance.close(vm.mentorship)},vm.close=function(){$uibModalInstance.dismiss("cancel")}};createRequestMentorshipCtrl.$inject=["ConstantsSrv","level_categories","$uibModalInstance","WizardHandler","$scope","$state","$stateParams","$http","$rootScope","$location","$log","requestOptions"],angular.module("app.mentorship").controller("CreateRequestMentorshipCtrl",createRequestMentorshipCtrl);