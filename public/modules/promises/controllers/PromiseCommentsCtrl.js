angular.module("app.promises").controller('PromiseCommentsCtrl',
        ['PromiseCommentsManager',
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
                 PromiseCommentsManager,
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
          vm.promiseId = $stateParams.promiseId;
          vm.promiseCommentsCopy;
          vm.promiseCommentsManager = new PromiseCommentsManager();
          vm.commentFormDisplay = false;

          vm.defaultPromiseCommentData = {
           promiseId: $stateParams.promiseId,
           privacy: 0
          }
          vm.newPromiseCommentData = angular.copy(vm.defaultPromiseCommentData);

          vm.showCommentForm = function () {
           vm.commentFormDisplay = true;
          };

          vm.createPromiseComment = function (data) {
           vm.promiseCommentsManager.createPromiseComment(data).then(function (response) {
            vm.commentFormDisplay = false;
            vm.newPromiseCommentData = angular.copy(vm.defaultPromiseCommentData);
            vm.promiseCommentsCopy = angular.copy(vm.promiseCommentsManager.promiseComments);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseComment = function (data) {
           vm.promiseCommentsManager.editPromiseComment(data).then(function (response) {
            vm.commentFormDisplay = false;
            vm.newPromiseCommentData = angular.copy(vm.defaultPromiseCommentData);
            vm.promiseCommentsCopy = angular.copy(vm.promiseCommentsManager.promiseComments);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseCommentSections = {
           details: function (promiseCommentId, detail) {
            var promiseCommentData = {
             promiseCommentId: promiseCommentId,
             title: detail.title,
             description: detail.description
            };
            vm.editPromiseComment(promiseCommentData);
           }
          }

          vm.cancelPromiseComment = function (form) {
           vm.commentFormDisplay = false;
           vm.newPromiseCommentData = angular.copy(vm.defaultPromiseCommentData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertPromiseComment = function (promiseComment, promiseCommentCopy) {
           promiseComment = promiseCommentCopy;
           /*
            $filter('filter')
            (vm.promiseCommentsManager.promiseComments, {id: promiseCommentId}, true)[0]
            = angular.copy($filter('filter')
            (vm.promiseCommentsCopy, {id: promiseCommentId}, true)[0]);
            if (promiseComment.length && promiseCommentCopy.length) {
            // vm.promiseCommentsManager.promiseComments angular.copy(vm.promiseCommentsCopy);
            }
            */
          };






          vm.editedComment = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.promiseComments;
          }), function () {
           //vm.remainingCount = filterFilter(promiseComments, {completed: false}).length;
           vm.doneCount = vm.promiseCommentsManager.promiseComments.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //PromiseCommentService.put(vm.promiseComments);
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




          vm.editComment = function (promiseComment) {
           vm.editedComment = promiseComment;
           // Clone the original promiseComment to restore it on demand.
           vm.originalComment = angular.copy(promiseComment);
          };


          vm.doneEditing = function (promiseComment) {
           vm.editedComment = null;
           promiseComment.title = promiseComment.title.trim();

           if (!promiseComment.title) {
            vm.removeComment(promiseComment);
           }
          };

          vm.openPromiseComment = function (promiseComment) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'promise-comment-modal.html',
            controller: 'PromiseCommentCtrl as promiseCommentCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             promiseCommentData: function () {
              return promiseComment;
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
          vm.promiseCommentsManager.getPromiseComments(vm.promiseId);
         }
        ])