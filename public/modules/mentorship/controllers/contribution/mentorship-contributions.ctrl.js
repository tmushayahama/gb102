var mentorshipContributionsCtrl = function (
        level_categories,
        ConstantsSrv,
        MentorshipContributionsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipContributions;
 vm.mentorshipContributionTypes;

 vm.mentorshipContributionsCopy;
 vm.constantsSrv = new ConstantsSrv();
 vm.mentorshipContributionsSrv = new MentorshipContributionsSrv();
 vm.contributionFormDisplay = false;
 vm.defaultMentorshipContributionData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipContributionData = angular.copy(vm.defaultMentorshipContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

 vm.createMentorshipContribution = function (data) {
  vm.mentorshipContributionsSrv.createMentorshipContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newMentorshipContributionData = angular.copy(vm.defaultMentorshipContributionData);
   vm.mentorshipContributionsCopy = angular.copy(vm.mentorshipContributionsSrv.mentorshipContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editMentorshipContribution = function (data) {
  vm.mentorshipContributionsSrv.editMentorshipContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newMentorshipContributionData = angular.copy(vm.defaultMentorshipContributionData);
   vm.mentorshipContributionsCopy = angular.copy(vm.mentorshipContributionsSrv.mentorshipContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editMentorshipContributionSections = {
  details: function (mentorshipContributionId, detail) {
   var mentorshipContributionData = {
    mentorshipContributionId: mentorshipContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipContribution(mentorshipContributionData);
  }
 }

 vm.cancelMentorshipContribution = function (form) {
  vm.contributionFormDisplay = false;
  vm.newMentorshipContributionData = angular.copy(vm.defaultMentorshipContributionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertMentorshipContribution = function (mentorshipContribution, mentorshipContributionCopy) {
  mentorshipContribution = mentorshipContributionCopy;
  /*
   $filter('filter')
   (vm.mentorshipContributionsSrv.mentorshipContributions, {id: mentorshipContributionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipContributionsCopy, {id: mentorshipContributionId}, true)[0]);
   if (mentorshipContribution.length && mentorshipContributionCopy.length) {
   // vm.mentorshipContributionsSrv.mentorshipContributions angular.copy(vm.mentorshipContributionsCopy);
   }
   */
 };
 vm.editedContribution = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipContributions;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipContributions, {completed: false}).length;
  vm.doneCount = vm.mentorshipContributionsSrv.mentorshipContributions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipContributionService.put(vm.mentorshipContributions);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editContribution = function (mentorshipContribution) {
  vm.editedContribution = mentorshipContribution;
  // Clone the original mentorshipContribution to restore it on demand.
  vm.originalContribution = angular.copy(mentorshipContribution);
 };
 vm.doneEditing = function (mentorshipContribution) {
  vm.editedContribution = null;
  mentorshipContribution.title = mentorshipContribution.title.trim();
  if (!mentorshipContribution.title) {
   vm.removeContribution(mentorshipContribution);
  }
 };

 vm.prepareSelectUsers = function (contributionType) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-mentorship-contribution-modal.html',
   controller: 'CreateMentorshipContributionCtrl as createMentorshipContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    contributionType: function () {
     return contributionType;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openMentorshipContribution = function (mentorshipContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-contribution-modal.html',
   controller: 'MentorshipContributionCtrl as mentorshipContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipContributionData: function () {
     return mentorshipContribution;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };
 //--------init------
 vm.constantsSrv.getLevel(level_categories.contribution_types).then(function (data) {
  vm.mentorshipContributionTypes = data;
 });

 vm.mentorshipContributionsSrv.getMentorshipContributions(vm.mentorshipId).then(function (data) {
  vm.mentorshipContributions = data;
 });
};

mentorshipContributionsCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'MentorshipContributionsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipContributionsCtrl', mentorshipContributionsCtrl);
