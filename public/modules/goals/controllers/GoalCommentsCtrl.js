angular.module("app.goals").controller('GoalCommentsCtrl',
        ['GoalCommentsManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 GoalCommentsManager,
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
          vm.goalId = $stateParams.goalId;
          vm.goalCommentsCopy;
          vm.goalCommentsManager = new GoalCommentsManager();
          vm.commentFormDisplay = false;

          vm.defaultGoalCommentData = {
           goalId: $stateParams.goalId,
           privacy: 0
          }
          vm.newGoalCommentData = angular.copy(vm.defaultGoalCommentData);

          vm.showCommentForm = function () {
           vm.commentFormDisplay = true;
          };

          vm.createGoalComment = function (data) {
           vm.goalCommentsManager.createGoalComment(data).then(function (response) {
            vm.commentFormDisplay = false;
            vm.newGoalCommentData = angular.copy(vm.defaultGoalCommentData);
            vm.goalCommentsCopy = angular.copy(vm.goalCommentsManager.goalComments);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalComment = function (data) {
           vm.goalCommentsManager.editGoalComment(data).then(function (response) {
            vm.commentFormDisplay = false;
            vm.newGoalCommentData = angular.copy(vm.defaultGoalCommentData);
            vm.goalCommentsCopy = angular.copy(vm.goalCommentsManager.goalComments);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalCommentSections = {
           details: function (goalCommentId, detail) {
            var goalCommentData = {
             goalCommentId: goalCommentId,
             title: detail.title,
             description: detail.description
            };
            vm.editGoalComment(goalCommentData);
           }
          }

          vm.cancelGoalComment = function (form) {
           vm.commentFormDisplay = false;
           vm.newGoalCommentData = angular.copy(vm.defaultGoalCommentData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertGoalComment = function (goalComment, goalCommentCopy) {
           goalComment = goalCommentCopy;
           /*
            $filter('filter')
            (vm.goalCommentsManager.goalComments, {id: goalCommentId}, true)[0]
            = angular.copy($filter('filter')
            (vm.goalCommentsCopy, {id: goalCommentId}, true)[0]);
            if (goalComment.length && goalCommentCopy.length) {
            // vm.goalCommentsManager.goalComments angular.copy(vm.goalCommentsCopy);
            }
            */
          };






          vm.editedComment = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.goalComments;
          }), function () {
           //vm.remainingCount = filterFilter(goalComments, {completed: false}).length;
           vm.doneCount = vm.goalCommentsManager.goalComments.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //GoalCommentService.put(vm.goalComments);
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




          vm.editComment = function (goalComment) {
           vm.editedComment = goalComment;
           // Clone the original goalComment to restore it on demand.
           vm.originalComment = angular.copy(goalComment);
          };


          vm.doneEditing = function (goalComment) {
           vm.editedComment = null;
           goalComment.title = goalComment.title.trim();

           if (!goalComment.title) {
            vm.removeComment(goalComment);
           }
          };

          vm.openGoalComment = function (goalComment) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'goal-comment-modal.html',
            controller: 'GoalCommentCtrl as goalCommentCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             goalCommentData: function () {
              return goalComment;
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
          vm.goalCommentsManager.getGoalComments(vm.goalId);
         }
        ])