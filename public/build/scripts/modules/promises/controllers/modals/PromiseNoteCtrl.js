angular.module("app.promises").controller("PromiseNoteCtrl",["PromiseNoteManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","promiseNoteData",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.promiseId=j.promise_id,k.promiseNoteId=j.id,k.promiseNoteManager=new a,k.noteId=j.note_id,k.noteFormDisplay=!1,k.ok=function(){b.close()},k.close=function(){b.dismiss("cancel")},k.getPromiseNote=function(a,b){k.promiseNoteManager.getPromiseNote(a,b).then(function(a){},function(a){console.log(a)})},k.editPromiseNote=function(a){k.promiseNoteManager.editPromiseNote(a).then(function(a){},function(a){console.log(a)})},k.editPromiseNoteSections={details:function(a){var b={promiseNoteId:k.promiseNoteId,title:a.title,description:a.description};k.editPromiseNote(b)}},k.showNoteForm=function(){k.noteFormDisplay=!0},k.getPromiseNote(k.promiseId,k.noteId)}]);