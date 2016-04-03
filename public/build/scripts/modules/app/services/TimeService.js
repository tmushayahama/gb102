!function(){"use strict";function time($resource){function getTime(){return Time.query().$promise.then(function(results){return results},function(error){console.log(error)})}function getTimeDiff(start,end){var diff=moment(end).diff(moment(start)),duration=moment.duration(diff);return{duration:duration}}function getTotalTime(timeentries){var totalMilliseconds=0;return angular.forEach(timeentries,function(key){totalMilliseconds+=key.loggedTime.duration._milliseconds}),{hours:Math.floor(moment.duration(totalMilliseconds).asHours()),minutes:moment.duration(totalMilliseconds).minutes()}}var Time=$resource("public/data/time.json");return{getTime:getTime,getTimeDiff:getTimeDiff,getTotalTime:getTotalTime}}angular.module("gbTimeService",[]).factory("time",time)}();