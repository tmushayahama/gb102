angular.module('app.promises').service('PromiseNoteManager',
        ['$http', '$q', function ($http, $q) {

          var PromiseNoteManager = function () {
           this.promiseNotes = [];
          };
          PromiseNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


          PromiseNoteManager.prototype.getPromiseNote = function (promiseId, noteId) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/promise/' + promiseId + '/note/' + noteId).success(function (data) {
            self.promiseNote = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          PromiseNoteManager.prototype.editPromiseNote = function (promiseNoteData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promise/note/edit',
            data: promiseNoteData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return PromiseNoteManager;
         }
        ]);