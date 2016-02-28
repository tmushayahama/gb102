var profileCommentsCtrl = function (
        ProfileCommentsSrv,
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
 vm.profileId = $stateParams.profileId;
 vm.profileCommentsCopy;
 vm.profileCommentsSrv = new ProfileCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultProfileCommentData = {
  profileId: $stateParams.profileId,
  privacy: 0
 }
 vm.newProfileCommentData = angular.copy(vm.defaultProfileCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createProfileComment = function (data) {
  vm.profileCommentsSrv.createProfileComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProfileCommentData = angular.copy(vm.defaultProfileCommentData);
   vm.profileCommentsCopy = angular.copy(vm.profileCommentsSrv.profileComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editProfileComment = function (data) {
  vm.profileCommentsSrv.editProfileComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProfileCommentData = angular.copy(vm.defaultProfileCommentData);
   vm.profileCommentsCopy = angular.copy(vm.profileCommentsSrv.profileComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editProfileCommentSections = {
  details: function (profileCommentId, detail) {
   var profileCommentData = {
    profileCommentId: profileCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editProfileComment(profileCommentData);
  }
 }

 vm.cancelProfileComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newProfileCommentData = angular.copy(vm.defaultProfileCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertProfileComment = function (profileComment, profileCommentCopy) {
  profileComment = profileCommentCopy;
  /*
   $filter('filter')
   (vm.profileCommentsSrv.profileComments, {id: profileCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profileCommentsCopy, {id: profileCommentId}, true)[0]);
   if (profileComment.length && profileCommentCopy.length) {
   // vm.profileCommentsSrv.profileComments angular.copy(vm.profileCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.profileComments;
 }), function () {
  //vm.remainingCount = filterFilter(profileComments, {completed: false}).length;
  vm.doneCount = vm.profileCommentsSrv.profileComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileCommentService.put(vm.profileComments);
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




 vm.editComment = function (profileComment) {
  vm.editedComment = profileComment;
  // Clone the original profileComment to restore it on demand.
  vm.originalComment = angular.copy(profileComment);
 };
 vm.doneEditing = function (profileComment) {
  vm.editedComment = null;
  profileComment.title = profileComment.title.trim();
  if (!profileComment.title) {
   vm.removeComment(profileComment);
  }
 };
 vm.openProfileComment = function (profileComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'profile-comment-modal.html',
   controller: 'ProfileCommentCtrl as profileCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileCommentData: function () {
     return profileComment;
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
 vm.profileCommentsSrv.getProfileComments(vm.profileId);
};

profileCommentsCtrl.$inject = [
 'ProfileCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profile").controller('ProfileCommentsCtrl', profileCommentsCtrl);
