
angular.module("app.mentorships").controller('MentorshipCtrl',
        ['_',
         'ConstantsManager',
         'MentorshipManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         '$css',
         function (
                 _,
                 ConstantsManager,
                 MentorshipManager,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal,
                 $log,
                 $filter,
                 $css) {


          var vm = this;
          $css.bind({
           href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-5.css'
          }, $scope);

          vm.mentorship = [];
          var mentorshipData = {
          };

          vm.range = function (min, max) {
           return _.range(min, max);
          };

          vm.mentorshipIcons = [];
          vm.mentorshipIconsArray = [];

          var getRand = function (min, max) {
           return Math.floor((Math.random() * max) + min);
          }

          vm.getRandomMentorshipIcons = function () {
           for (var i = 0; i < 5; i++) {
            var rowArray = [];
            for (var j = 0; j < vm.mentorshipIcons.length; j++) {
             var rand = getRand(0, vm.mentorshipIcons.length);
             rowArray.push(vm.mentorshipIcons[rand].name);
            }
            vm.mentorshipIconsArray.push(rowArray);
           }
          };


          vm.mentorshipId = $stateParams.mentorshipId;

          vm.mentorshipManager = new MentorshipManager();
          vm.constantsManager = new ConstantsManager();

          vm.mentorshipFormDisplay = false;

          vm.getMentorship = function (id, data) {
           vm.mentorshipManager.getMentorship(id, data).success(function (response) {
            vm.mentorship = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultMentorshipData = {
           mentorshipId: $stateParams.mentorshipId,
           privacy: 0
          }
          vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createMentorship = function (data) {
           vm.mentorshipManager.createMentorship(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
            vm.mentorshipCopy = angular.copy(vm.mentorshipManager.mentorship);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editMentorship = function (data) {
           vm.mentorshipManager.editMentorship(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
            vm.mentorshipCopy = angular.copy(vm.mentorshipManager.mentorship);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editMentorshipSections = {
           details: function (mentorshipId, detail) {
            var mentorshipData = {
             mentorshipId: mentorshipId,
             title: detail.title,
             description: detail.description
            };
            vm.editMentorship(mentorshipData);
           }
          }

          vm.cancelMentorship = function (form) {
           vm.FormDisplay = false;
           vm.newMentorshipData = angular.copy(vm.defaultMentorshipData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertMentorship = function (mentorship, mentorshipCopy) {
           mentorship = mentorshipCopy;
           /*
            $filter('filter')
            (vm.mentorshipManager.mentorship, {id: mentorshipId}, true)[0]
            = angular.copy($filter('filter')
            (vm.mentorshipCopy, {id: mentorshipId}, true)[0]);
            if (mentorship.length && mentorshipCopy.length) {
            // vm.mentorshipManager.mentorship angular.copy(vm.mentorshipCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.mentorship;
          }), function () {
           //vm.remainingCount = filterFilter(mentorship, {completed: false}).length;
           vm.doneCount = vm.mentorshipManager.mentorship.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //MentorshipService.put(vm.mentorship);
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




          vm.edit = function (mentorship) {
           vm.edited = mentorship;
           // Clone the original mentorship to restore it on demand.
           vm.original = angular.copy(mentorship);
          };


          vm.doneEditing = function (mentorship) {
           vm.edited = null;
           mentorship.title = mentorship.title.trim();

           if (!mentorship.title) {
            vm.remove(mentorship);
           }
          };





          //--------init------
          vm.mentorshipManager.getMentorship(vm.mentorshipId);
          vm.constantsManager.getIcons(1).then(function (data) {
           vm.mentorshipIcons = data;
           vm.getRandomMentorshipIcons();
          });
         }
        ])