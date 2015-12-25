angular.module("app.mentorships").controller('MentorshipsMineCtrl',
        ['ConstantsManager',
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
         function (
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
                 $filter) {

          var vm = this;
          vm.mentorshipsManager = new MentorshipsManager();
          vm.mentorshipsManager.getMyMentorships();
         }
        ])