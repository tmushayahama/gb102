/* scripts/controllers/TimeEntry.js */

(function () {

 'use strict';

 angular
         .module('gbApp')
         .controller('TimeEntryCtrl', ['time',
          function (time) {

           // vm is our capture variable
           var vm = this;

           vm.timeentries = [];

           // Fetches the time entries from the static JSON file
           // and puts the results on the vm.timeentries array
           time.getTime().then(function (results) {
            vm.timeentries = results;
            console.log(vm.timeentries);
           }, function (error) { // Check for errors
            console.log(error);
           });

          }
         ])
})();