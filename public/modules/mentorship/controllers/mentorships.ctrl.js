
var mentorshipsCtrl = function (
        level_categories,
        ConstantsSrv,
        SearchSrv,
        MentorshipsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-mentorship.css'
 }, $scope);

 vm.mentorshipsSrv = new MentorshipsSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'MENTORSHIP';
 vm.mentorshipLevels;
 vm.appTypes;


 vm.createMentorship = function (data) {
  vm.mentorshipsSrv.createMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipsCopy = angular.copy(vm.mentorshipsSrv.mentorships);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorship = function (data) {
  vm.mentorshipsSrv.editMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipsCopy = angular.copy(vm.mentorshipsSrv.mentorships);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipSections = {
  details: function (mentorshipId, detail) {
   var mentorshipData = {
    mentorshipId: mentorshipId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorship(mentorshipData);
  }
 }

 vm.cancelMentorship = function (form) {
  vm.FormDisplay = false;
  vm.newMentorshipData = angular.copy(vm.defaultMentorshipData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertMentorship = function (mentorship, mentorshipCopy) {
  mentorship = mentorshipCopy;
  /*
   $filter('filter')
   (vm.mentorshipsSrv.mentorships, {id: mentorshipId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipsCopy, {id: mentorshipId}, true)[0]);
   if (mentorship.length && mentorshipCopy.length) {
   // vm.mentorshipsSrv.mentorships angular.copy(vm.mentorshipsCopy);
   }
   */
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorships;
 }), function () {
  //vm.remainingCount = filterFilter(mentorships, {completed: false}).length;
  vm.doneCount = vm.mentorshipsSrv.mentorships.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipService.put(vm.mentorships);
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




 vm.edit = function (mentorship) {
  vm.edited = mentorship;
  // Clone the original mentorship to restore it on demand.
  vm.original = angular.copy(mentorship);
 };


 vm.doneEditing = function (mentorship) {
  vm.edited = null;
  mentorship.title = mentorship.title.trim();

  if (!mentorship.title) {
   vm.remove(mentorship);
  }
 };

 $rootScope.openAddMentorshipModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-mentorship-modal.html',
   controller: 'AddMentorshipCtrl as addMentorshipCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    appTypes: function () {
     return vm.appTypes;
    }
   }
  });

  modalInstance.result.then(function (mentorship) {
   vm.mentorshipsSrv.createMentorship(mentorship);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 $rootScope.openCreateRequestMentorshipModal = function (mentorshipId) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-request-mentorship-modal.html',
   controller: 'CreateRequestMentorshipCtrl as createRequestMentorshipCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    requestOptions: function () {
     return vm.mentorshipsSrv.getMentorshipRequestOptions(mentorshipId);
    }
   }
  });

  modalInstance.result.then(function (mentorship) {
   vm.mentorshipsSrv.createMentorship(mentorship);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsSrv.getAppTypes().then(function (data) {
  vm.appTypes = data;
 });
 vm.constantsSrv.getLevel(level_categories.mentorship).then(function (data) {
  vm.mentorshipLevels = data;
 });
};

mentorshipsCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SearchSrv',
 'MentorshipsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.mentorship").controller('MentorshipsCtrl', mentorshipsCtrl);