angular.module("app.promises").controller("PromiseTimelineCtrl",["PromiseTimelineManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","promiseTimelineData",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.promiseId=j.promise_id,k.promiseTimelineId=j.id,k.promiseTimelineManager=new a,k.timelineId=j.timeline_id,k.timelineFormDisplay=!1,k.ok=function(){b.close()},k.close=function(){b.dismiss("cancel")},k.getPromiseTimeline=function(a,b){k.promiseTimelineManager.getPromiseTimeline(a,b).then(function(a){},function(a){console.log(a)})},k.editPromiseTimeline=function(a){k.promiseTimelineManager.editPromiseTimeline(a).then(function(a){},function(a){console.log(a)})},k.editPromiseTimelineSections={details:function(a){var b={promiseTimelineId:k.promiseTimelineId,title:a.title,description:a.description};k.editPromiseTimeline(b)}},k.showTimelineForm=function(){k.timelineFormDisplay=!0},k.getPromiseTimeline(k.promiseId,k.timelineId)}]);