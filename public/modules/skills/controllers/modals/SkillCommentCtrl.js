angular.module("app.skills").controller('SkillCommentCtrl',
        ['SkillCommentManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'skillCommentData',
         function (
                 SkillCommentManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 skillCommentData) {
          var vm = this;
          vm.skillId = skillCommentData.skill_id;
          vm.skillCommentId = skillCommentData.id;
          vm.skillCommentManager = new SkillCommentManager();


          vm.commentId = skillCommentData.comment_id;

          vm.commentFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newSkillCommentData = vm.defaultSkillCommentData;

          vm.getSkillComment = function (skillId, commentId) {
           vm.skillCommentManager.getSkillComment(skillId, commentId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editSkillComment = function (data) {
           vm.skillCommentManager.editSkillComment(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillCommentSections = {
           details: function (details) {
            var skillCommentData = {
             skillCommentId: vm.skillCommentId,
             title: details.title,
             description: details.description
            };
            vm.editSkillComment(skillCommentData);
           }
          }



          vm.showCommentForm = function () {
           vm.commentFormDisplay = true;
          };



          //--------init------
          vm.getSkillComment(vm.skillId, vm.commentId);
         }
        ])