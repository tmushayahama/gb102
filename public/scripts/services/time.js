/* scripts/services/time.js */

(function () {

 'use strict';

 angular
         .module('gbApp')
         .factory('time', time);

 function time($resource) {

  // ngResource call to our static data
  var Time = $resource('public/data/time.json');

  function getTime() {
   // $promise.then allows us to intercept the results
   // which we will use later
   return Time.query().$promise.then(function (results) {
    return results;
   }, function (error) { // Check for errors
    console.log(error);
   });
  }
// Use Moment.js to get the duration of the time entry
  function getTimeDiff(start, end) {
   var diff = moment(end).diff(moment(start));
   var duration = moment.duration(diff);
   return {
    duration: duration
   }
  }

  // Add up the total time for all of our time entries
  function getTotalTime(timeentries) {
   var totalMilliseconds = 0;

   angular.forEach(timeentries, function (key) {
    totalMilliseconds += key.loggedTime.duration._milliseconds;
   });

   // After 24 hours, the Moment.js duration object
   // reports the next unit up, which is days.
   // Using the asHours method and rounding down with
   // Math.floor instead gives us the total hours
   return {
    hours: Math.floor(moment.duration(totalMilliseconds).asHours()),
    minutes: moment.duration(totalMilliseconds).minutes()
   }
  }

  return {
   getTime: getTime,
   getTimeDiff: getTimeDiff,
   getTotalTime: getTotalTime
  }
 }

})();