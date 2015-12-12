angular.module('app.mentorships').service('MentorshipWeblinksManager',
        ['$http', '$q', function ($http, $q) {

          var MentorshipWeblinksManager = function () {
           this.mentorshipWeblinks = [];
          };
          MentorshipWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
           if (!data || typeof data !== 'object') {
            this.error = 'Error';
           }
           if (!this.error && data.result && data.result.error) {
            this.error = data.result.error;
           }
           if (!this.error && data.error) {
            this.error = data.error.message;
           }
           if (!this.error && defaultMsg) {
            this.error = defaultMsg;
           }
           if (this.error) {
            return deferred.reject(data);
           }
           return deferred.resolve(data);
          };

          MentorshipWeblinksManager.prototype.getMentorshipWeblinks = function (mentorshipId) {
           var self = this;
           var deferred = $q.defer();
           self.mentorshipWeblinks = [];
           $http.get('/api/mentorship/' + mentorshipId + '/weblinks').success(function (data) {
            self.mentorshipWeblinks = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipWeblinksManager.prototype.getMentorshipWeblink = function (mentorshipId, weblinkId) {
           var self = this;
           var deferred = $q.defer();
           self.mentorshipWeblinks = [];
           $http.get('/api/mentorship/' + mentorshipId + '/weblink/' + weblinkId).success(function (data) {
            self.mentorshipWeblinks = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipWeblinksManager.prototype.createMentorshipWeblink = function (mentorshipWeblinkData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorship/weblink/create',
            data: mentorshipWeblinkData
           }).success(function (data) {
            self.mentorshipWeblinks.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipWeblinksManager.prototype.editMentorshipWeblink = function (mentorshipWeblinkData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorship/weblink/edit',
            data: mentorshipWeblinkData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return MentorshipWeblinksManager;
         }
        ]);