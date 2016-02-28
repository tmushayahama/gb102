var profileCommentCtrl = function (
        ProfileCommentSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileCommentData) {
 var vm = this;
 vm.profileId = profileCommentData.profile_id;
 vm.profileCommentId = profileCommentData.id;
 vm.profileCommentSrv = new ProfileCommentSrv();


 vm.commentId = profileCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProfileCommentData = vm.defaultProfileCommentData;

 vm.getProfileComment = function (profileId, commentId) {
  vm.profileCommentSrv.getProfileComment(profileId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileComment = function (data) {
  vm.profileCommentSrv.editProfileComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileCommentSections = {
  details: function (details) {
   var profileCommentData = {
    profileCommentId: vm.profileCommentId,
    title: details.title,
    description: details.description
   };
   vm.editProfileComment(profileCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getProfileComment(vm.profileId, vm.commentId);
};

profileCommentCtrl.$inject = [
 'ProfileCommentSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileCommentData'];

angular.module("app.profile").controller('ProfileCommentCtrl', profileCommentCtrl);
