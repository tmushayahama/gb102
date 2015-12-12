angular.module("app.mentorships").controller('AddMentorshipCtrl',
        ['$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'mentorshipLevels',
         function (
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 mentorshipLevels) {
          var vm = this;

          vm.mentorship = "";
          vm.mentorshipLevels = mentorshipLevels;

          vm.ok = function () {
           $uibModalInstance.close(vm.mentorship);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])