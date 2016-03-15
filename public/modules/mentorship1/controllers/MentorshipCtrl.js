
var mentorshipCtrl = function (
        _,
        ConstantsSrv,
        MentorshipSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-mentorship.css'
 }, $scope);

 vm.mentorship;
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

 vm.mentorshipSrv = new MentorshipSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.mentorshipFormDisplay = false;

 vm.getMentorship = function (id) {
  vm.mentorshipSrv.getMentorship(id).then(function (data) {
   vm.mentorship = data;
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
  vm.mentorshipSrv.createMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipCopy = angular.copy(vm.mentorshipSrv.mentorship);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorship = function (data) {
  vm.mentorshipSrv.editMentorship(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newMentorshipData = angular.copy(vm.defaultMentorshipData);
   vm.mentorshipCopy = angular.copy(vm.mentorshipSrv.mentorship);
  }, function (response) {
   console.log(response);
  });
 };



 //--------init------

 vm.getMentorship(vm.mentorshipId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.mentorshipIcons = data;
  vm.getRandomMentorshipIcons();
 });
};

mentorshipCtrl.$inject = ['_',
 'ConstantsSrv',
 'MentorshipSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.mentorship").controller('MentorshipCtrl', mentorshipCtrl);