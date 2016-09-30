var explorerCtrl=function(_,level_categories,ConstantsSrv,ExplorerSrv,ExplorerSectionsSrv,ExplorerComponentsSrv,ExplorerContributionsSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;vm.explorerSrv=new ExplorerSrv,vm.constantsSrv=new ConstantsSrv,vm.explorer=[],vm.explorerId=$stateParams.explorerId,vm.subExplorerLimitTo=5,vm.explorerFormDisplay=!1,vm.newColumnData={title:""},vm.explorerSections=[],vm.explorerSectionsCopy,vm.explorerSectionsSrv=new ExplorerSectionsSrv,vm.sectionFormDisplay=!1,vm.defaultExplorerSectionData={explorerId:$stateParams.explorerId,privacy:0},vm.newExplorerSectionData=angular.copy(vm.defaultExplorerSectionData),vm.explorerComponentBuckets=[],vm.explorerComponentsCopy,vm.explorerComponentsSrv=new ExplorerComponentsSrv,vm.componentFormDisplay=!1,vm.defaultExplorerComponentData={explorerId:vm.explorerId,typeId:level_categories.component.none,title:"",description:"",privacy:0},vm.explorerContributions,vm.explorerContributionTypes,vm.explorerContributionsCopy,vm.constantsSrv=new ConstantsSrv,vm.explorerContributionsSrv=new ExplorerContributionsSrv,vm.contributionFormDisplay=!1,vm.defaultExplorerContributionData={explorerId:$stateParams.explorerId,privacy:0},vm.newExplorerContributionData=angular.copy(vm.defaultExplorerContributionData),vm.showContributionForm=function(){vm.contributionFormDisplay=!0},vm.editDescriptionMode={visible:!1,show:function(){vm.editDescriptionMode.visible=!0,vm.editDescriptionMode.data={explorer_id:vm.explorerSrv.explorer.id,title:vm.explorerSrv.explorer.title,description:vm.explorerSrv.explorer.description}},hide:function(){vm.editDescriptionMode.visible=!1},edit:function(){vm.explorerSrv.editExplorer(vm.editDescriptionMode.data).then(function(response){vm.editDescriptionMode.hide(),vm.explorerSrv.explorer=response},function(response){console.log(response)})}},vm.getDefaultExplorerComponentData=function(parentComponentId){var result=angular.copy(vm.defaultExplorerComponentData);return parentComponentId&&(result.parentComponentId=parentComponentId),result},vm.getExplorer=function(id){vm.explorerSrv.getExplorer(id).then(function(response){})},vm.defaultExplorerData={explorerId:$stateParams.explorerId,privacy:0},vm.newExplorerData=angular.copy(vm.defaultExplorerData),vm.createExplorer=function(data){vm.explorerSrv.createExplorer(data).then(function(response){vm.FormDisplay=!1,vm.newExplorerData=angular.copy(vm.defaultExplorerData),vm.explorerCopy=angular.copy(vm.explorerSrv.explorer)},function(response){console.log(response)})},vm.editExplorerSections={details:function(explorerId,detail){var explorerData={explorerId:explorerId,title:detail.title,description:detail.description};vm.editExplorer(explorerData)}},vm.cancelExplorer=function(form){vm.FormDisplay=!1,vm.newExplorerData=angular.copy(vm.defaultExplorerData),form&&(form.$setPristine(),form.$setUntouched())},vm.edit=function(explorer){vm.edited=explorer,vm.original=angular.copy(explorer)},vm.doneEditing=function(explorer){vm.edited=null,explorer.title=explorer.title.trim(),explorer.title||vm.remove(explorer)},vm.getExplorerSections=function(explorerId){vm.explorerSectionsSrv.getExplorerSections(explorerId).then(function(response){vm.explorerSections=response,angular.forEach(response,function(question,key){vm.explorerSectionsSrv.getSectionAnswersPreview(question.id,explorerId).then(function(answerResponse){vm.explorerSections[key].answers=answerResponse,vm.explorerSections[key].explorer_id=explorerId;var minSizeY=1+Math.floor(answerResponse.length/5);vm.explorerSections[key].gridMap={minSizeY:minSizeY,maxSizeY:4}})})})},vm.createExplorerSection=function(data){vm.explorerSectionsSrv.createExplorerSection(data).then(function(response){vm.sectionFormDisplay=!1,vm.newExplorerSectionData=angular.copy(vm.defaultExplorerSectionData),vm.explorerSections.unshift(response)},function(response){console.log(response)})},vm.editExplorerSection=function(data){vm.explorerSectionsSrv.editExplorerSection(data).then(function(response){vm.sectionFormDisplay=!1,vm.newExplorerSectionData=angular.copy(vm.defaultExplorerSectionData),vm.explorerSectionsCopy=angular.copy(vm.explorerSections)},function(response){console.log(response)})},vm.editExplorerSectionSections={details:function(explorerSectionId,detail){var explorerSectionData={explorerSectionId:explorerSectionId,title:detail.title,description:detail.description};vm.editExplorerSection(explorerSectionData)}},vm.cancelExplorerSection=function(form){vm.sectionFormDisplay=!1,vm.newExplorerSectionData=angular.copy(vm.defaultExplorerSectionData),form&&(form.$setPristine(),form.$setUntouched())},vm.editSection=function(explorerSection){vm.editedSection=explorerSection,vm.originalSection=angular.copy(explorerSection)},vm.doneEditing=function(explorerSection){vm.editedSection=null,explorerSection.title=explorerSection.title.trim(),explorerSection.title||vm.removeSection(explorerSection)},vm.openExplorerSection=function(explorerSection){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-section-modal.html",controller:"ExplorerSectionCtrl as explorerSectionCtrl",backdrop:"static",size:"xl",resolve:{explorerSectionData:function(){return explorerSection}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.openExplorerSectionItem=function(explorerSectionItem){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-section-item-modal.html",controller:"ExplorerSectionItemCtrl as explorerSectionItemCtrl",backdrop:"static",size:"xl",resolve:{explorerSectionData:function(){return explorerSectionItem}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.addToExplorerSection=function(data){return console.log("added",data),vm.explorerSectionsSrv.createAnswer(data)},vm.getExplorerSections(vm.explorerId),vm.explorerSrv.getSubExplorers(vm.explorerId,level_categories.explorer_relationship.application),vm.getSubExplorersStats=function(explorerId){vm.explorerSrv.getSubExplorersStats(explorerId).then(function(data){vm.subExplorersStats=data})},vm.getExplorerComponents=function(explorerId){vm.explorerComponentsSrv.getExplorerComponents(explorerId).then(function(response){vm.explorerComponentBuckets=response,vm.explorerComponentBuckets.newExplorerComponentData=vm.getDefaultExplorerComponentData()})},vm.createExplorerComponent=function(explorerComponentBucket){vm.explorerComponentsSrv.createExplorerComponent(explorerComponentBucket.newExplorerComponentData).then(function(response){explorerComponentBucket.newExplorerComponentData.parentComponentId?(explorerComponentBucket.explorerComponents.push(response),explorerComponentBucket.newExplorerComponentData=vm.getDefaultExplorerComponentData(explorerComponentBucket.newExplorerComponentData.parentComponentId)):(explorerComponentBucket.explorerComponents.push(response),explorerComponentBucket.newExplorerComponentData=vm.getDefaultExplorerComponentData())},function(response){console.log(response)})},vm.editExplorerComponent=function(data){vm.explorerComponentsSrv.editExplorerComponent(data).then(function(response){vm.componentFormDisplay=!1,vm.newExplorerComponentData=angular.copy(vm.defaultExplorerComponentData),vm.explorerComponentsCopy=angular.copy(vm.explorerComponents)},function(response){console.log(response)})},vm.editExplorerComponentSections={details:function(explorerComponentId,detail){var explorerComponentData={explorerComponentId:explorerComponentId,title:detail.title,description:detail.description};vm.editExplorerComponent(explorerComponentData)}},vm.cancelExplorerComponent=function(form){vm.componentFormDisplay=!1,vm.newExplorerComponentData=angular.copy(vm.defaultExplorerComponentData),form&&(form.$setPristine(),form.$setUntouched())},vm.editComponent=function(explorerComponent){vm.editedComponent=explorerComponent,vm.originalComponent=angular.copy(explorerComponent)},vm.doneEditing=function(explorerComponent){vm.editedComponent=null,explorerComponent.title=explorerComponent.title.trim(),explorerComponent.title||vm.removeComponent(explorerComponent)},vm.openExplorerComponent=function(explorerComponent){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-component-modal.html",controller:"ExplorerComponentCtrl as explorerComponentCtrl",backdrop:"static",size:"xl",resolve:{explorerComponentData:function(){return explorerComponent},componentBackgroundColors:function(){return vm.componentBackgroundColors}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.getExplorerComponents(vm.explorerId),vm.createExplorerContribution=function(data){vm.explorerContributionsSrv.createExplorerContribution(data).then(function(response){vm.contributionFormDisplay=!1,vm.newExplorerContributionData=angular.copy(vm.defaultExplorerContributionData),vm.explorerContributionsCopy=angular.copy(vm.explorerContributionsSrv.explorerContributions)},function(response){console.log(response)})},vm.editExplorerContribution=function(data){vm.explorerContributionsSrv.editExplorerContribution(data).then(function(response){vm.contributionFormDisplay=!1,vm.newExplorerContributionData=angular.copy(vm.defaultExplorerContributionData),vm.explorerContributionsCopy=angular.copy(vm.explorerContributionsSrv.explorerContributions)},function(response){console.log(response)})},vm.editExplorerContributionSections={details:function(explorerContributionId,detail){var explorerContributionData={explorerContributionId:explorerContributionId,title:detail.title,description:detail.description};vm.editExplorerContribution(explorerContributionData)}},vm.cancelExplorerContribution=function(form){vm.contributionFormDisplay=!1,vm.newExplorerContributionData=angular.copy(vm.defaultExplorerContributionData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExplorerContribution=function(explorerContribution,explorerContributionCopy){explorerContribution=explorerContributionCopy},vm.editedContribution=null,$scope.$watch(angular.bind(this,function(){return vm.explorerContributions}),function(){vm.doneCount=vm.explorerContributionsSrv.explorerContributions.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editContribution=function(explorerContribution){vm.editedContribution=explorerContribution,vm.originalContribution=angular.copy(explorerContribution)},vm.doneEditing=function(explorerContribution){vm.editedContribution=null,explorerContribution.title=explorerContribution.title.trim(),explorerContribution.title||vm.removeContribution(explorerContribution)},vm.prepareSelectUsers=function(contributionType){var modalInstance=$uibModal.open({animation:!0,templateUrl:"create-explorer-contribution-modal.html",controller:"CreateExplorerContributionCtrl as createExplorerContributionCtrl",backdrop:"static",size:"xl",resolve:{contributionType:function(){return contributionType}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.openExplorerContribution=function(explorerContribution){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-contribution-modal.html",controller:"ExplorerContributionCtrl as explorerContributionCtrl",backdrop:"static",size:"xl",resolve:{explorerContributionData:function(){return explorerContribution}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.explorerSrv.getExplorer(vm.explorerId).then(function(data){$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-"+data.app_type.title+".css"},$scope)}),vm.constantsSrv.getLevel(level_categories.contribution_types).then(function(data){vm.explorerContributionTypes=data}),vm.explorerContributionsSrv.getExplorerContributions(vm.explorerId).then(function(data){vm.explorerContributions=data}),vm.constantsSrv.getLevel(level_categories.component_background_colors).then(function(data){vm.componentBackgroundColors=data})};explorerCtrl.$inject=["_","level_categories","ConstantsSrv","ExplorerSrv","ExplorerSectionsSrv","ExplorerComponentsSrv","ExplorerContributionsSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.explorer").controller("ExplorerCtrl",explorerCtrl);