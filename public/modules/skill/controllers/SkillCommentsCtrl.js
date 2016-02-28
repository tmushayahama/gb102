var skillCommentsCtrl = function (
        SkillCommentsSrv,
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
 vm.skillId = $stateParams.skillId;
 vm.skillCommentsCopy;
 vm.skillCommentsSrv = new SkillCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultSkillCommentData = {
  skillId: $stateParams.skillId,
  privacy: 0
 }
 vm.newSkillCommentData = angular.copy(vm.defaultSkillCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createSkillComment = function (data) {
  vm.skillCommentsSrv.createSkillComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newSkillCommentData = angular.copy(vm.defaultSkillCommentData);
   vm.skillCommentsCopy = angular.copy(vm.skillCommentsSrv.skillComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editSkillComment = function (data) {
  vm.skillCommentsSrv.editSkillComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newSkillCommentData = angular.copy(vm.defaultSkillCommentData);
   vm.skillCommentsCopy = angular.copy(vm.skillCommentsSrv.skillComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editSkillCommentSections = {
  details: function (skillCommentId, detail) {
   var skillCommentData = {
    skillCommentId: skillCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editSkillComment(skillCommentData);
  }
 }

 vm.cancelSkillComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newSkillCommentData = angular.copy(vm.defaultSkillCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertSkillComment = function (skillComment, skillCommentCopy) {
  skillComment = skillCommentCopy;
  /*
   $filter('filter')
   (vm.skillCommentsSrv.skillComments, {id: skillCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.skillCommentsCopy, {id: skillCommentId}, true)[0]);
   if (skillComment.length && skillCommentCopy.length) {
   // vm.skillCommentsSrv.skillComments angular.copy(vm.skillCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.skillComments;
 }), function () {
  //vm.remainingCount = filterFilter(skillComments, {completed: false}).length;
  vm.doneCount = vm.skillCommentsSrv.skillComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SkillCommentService.put(vm.skillComments);
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




 vm.editComment = function (skillComment) {
  vm.editedComment = skillComment;
  // Clone the original skillComment to restore it on demand.
  vm.originalComment = angular.copy(skillComment);
 };
 vm.doneEditing = function (skillComment) {
  vm.editedComment = null;
  skillComment.title = skillComment.title.trim();
  if (!skillComment.title) {
   vm.removeComment(skillComment);
  }
 };
 vm.openSkillComment = function (skillComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'skill-comment-modal.html',
   controller: 'SkillCommentCtrl as skillCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    skillCommentData: function () {
     return skillComment;
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
 vm.skillCommentsSrv.getSkillComments(vm.skillId);
};

skillCommentsCtrl.$inject = [
 'SkillCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillCommentsCtrl', skillCommentsCtrl);
