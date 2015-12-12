angular.module("app.promises").controller('PromiseCommentCtrl',
        ['PromiseCommentManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'promiseCommentData',
         function (
                 PromiseCommentManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 promiseCommentData) {
          var vm = this;
          vm.promiseId = promiseCommentData.promise_id;
          vm.promiseCommentId = promiseCommentData.id;
          vm.promiseCommentManager = new PromiseCommentManager();


          vm.commentId = promiseCommentData.comment_id;

          vm.commentFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newPromiseCommentData = vm.defaultPromiseCommentData;

          vm.getPromiseComment = function (promiseId, commentId) {
           vm.promiseCommentManager.getPromiseComment(promiseId, commentId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editPromiseComment = function (data) {
           vm.promiseCommentManager.editPromiseComment(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseCommentSections = {
           details: function (details) {
            var promiseCommentData = {
             promiseCommentId: vm.promiseCommentId,
             title: details.title,
             description: details.description
            };
            vm.editPromiseComment(promiseCommentData);
           }
          }



          vm.showCommentForm = function () {
           vm.commentFormDisplay = true;
          };



          //--------init------
          vm.getPromiseComment(vm.promiseId, vm.commentId);
         }
        ])