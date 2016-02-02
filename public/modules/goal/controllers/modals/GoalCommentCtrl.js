var goalCommentCtrl = function (
        GoalCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalCommentData) {
 var vm = this;
 vm.goalId = goalCommentData.goal_id;
 vm.goalCommentId = goalCommentData.id;
 vm.goalCommentManager = new GoalCommentManager();


 vm.commentId = goalCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalCommentData = vm.defaultGoalCommentData;

 vm.getGoalComment = function (goalId, commentId) {
  vm.goalCommentManager.getGoalComment(goalId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalComment = function (data) {
  vm.goalCommentManager.editGoalComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalCommentSections = {
  details: function (details) {
   var goalCommentData = {
    goalCommentId: vm.goalCommentId,
    title: details.title,
    description: details.description
   };
   vm.editGoalComment(goalCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getGoalComment(vm.goalId, vm.commentId);
};

goalCommentCtrl.$inject = [
 'GoalCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalCommentData'];

angular.module("app.goal").controller('GoalCommentCtrl', goalCommentCtrl);
