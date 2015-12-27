
var mentorshipsCtrl = function (
        ConstantsManager,
        MentorshipsManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-5.css'
 }, $scope);

 vm.mentorshipsManager = new MentorshipsManager();
 vm.constantsManager = new ConstantsManager();
 vm.mentorshipLevels;


 vm.createMentorship = function (data) {
  vm.mentorshipsManager.createMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipsCopy = angular.copy(vm.mentorshipsManager.mentorships);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorship = function (data) {
  vm.mentorshipsManager.editMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipsCopy = angular.copy(vm.mentorshipsManager.mentorships);
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
   (vm.mentorshipsManager.mentorships, {id: mentorshipId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipsCopy, {id: mentorshipId}, true)[0]);
   if (mentorship.length && mentorshipCopy.length) {
   // vm.mentorshipsManager.mentorships angular.copy(vm.mentorshipsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorships;
 }), function () {
  //vm.remainingCount = filterFilter(mentorships, {completed: false}).length;
  vm.doneCount = vm.mentorshipsManager.mentorships.length - vm.remainingCount;
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

 vm.openAddMentorshipModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-mentorship-modal.html',
   controller: 'AddMentorshipCtrl as addMentorshipCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipLevels: function () {
     return vm.mentorshipLevels;
    }
   }
  });

  modalInstance.result.then(function (mentorship) {
   vm.mentorshipsManager.createMentorship(mentorship);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.mentorshipsManager.getMentorships(vm.mentorshipId);
 vm.constantsManager.getLevel(1).then(function (data) {
  vm.mentorshipLevels = data;
 });
};

mentorshipsCtrl.$inject = [
 'ConstantsManager',
 'MentorshipsManager',
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

angular.module("app.mentorships").controller('MentorshipsCtrl', mentorshipsCtrl);