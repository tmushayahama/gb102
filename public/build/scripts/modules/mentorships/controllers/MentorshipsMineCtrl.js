angular.module("app.mentorships").controller("MentorshipsMineCtrl",["ConstantsManager","MentorshipsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter",function(a,b,c,d,e,f,g,h,i,j,k){var l=this;l.mentorshipsManager=new b,l.mentorshipsManager.getMyMentorships()}]);