angular.module("app.advices").controller("AdviceNoteCtrl",["AdviceNoteManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","adviceNoteData",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.adviceId=j.advice_id,k.adviceNoteId=j.id,k.adviceNoteManager=new a,k.noteId=j.note_id,k.noteFormDisplay=!1,k.ok=function(){b.close()},k.close=function(){b.dismiss("cancel")},k.getAdviceNote=function(a,b){k.adviceNoteManager.getAdviceNote(a,b).then(function(a){},function(a){console.log(a)})},k.editAdviceNote=function(a){k.adviceNoteManager.editAdviceNote(a).then(function(a){},function(a){console.log(a)})},k.editAdviceNoteSections={details:function(a){var b={adviceNoteId:k.adviceNoteId,title:a.title,description:a.description};k.editAdviceNote(b)}},k.showNoteForm=function(){k.noteFormDisplay=!0},k.getAdviceNote(k.adviceId,k.noteId)}]);