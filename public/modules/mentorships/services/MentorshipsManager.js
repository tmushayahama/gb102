angular.module('app.mentorships').service('MentorshipsManager',
        ['$http', '$q', function ($http, $q) {

          var MentorshipsManager = function () {
           this.mentorships = [];
          };
          MentorshipsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          MentorshipsManager.prototype.getAllMentorships = function () {
           var self = this;
           var deferred = $q.defer();
           self.mentorships = [];
           $http.get('/api/mentorships/all').success(function (data) {
            self.mentorships = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipsManager.prototype.getMyMentorships = function () {
           var self = this;
           var deferred = $q.defer();
           self.mentorships = [];
           $http.get('/api/mentorships/mine').success(function (data) {
            self.mentorships = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipsManager.prototype.getMentorship = function (mentorshipId, Id) {
           var self = this;
           var deferred = $q.defer();
           self.mentorship = [];
           $http.get('/api/mentorship/' + mentorshipId + '//' + Id).success(function (data) {
            self.mentorship = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipsManager.prototype.createMentorship = function (mentorshipData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorship/create',
            data: mentorshipData
           }).success(function (data) {
            self.mentorships.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipsManager.prototype.editMentorship = function (mentorshipData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorshipedit',
            data: mentorshipData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return MentorshipsManager;
         }
        ]);