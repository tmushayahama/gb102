angular.module("app.skills").controller("SkillNoteCtrl",["SkillNoteManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","skillNoteData",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.skillId=j.skill_id,k.skillNoteId=j.id,k.skillNoteManager=new a,k.noteId=j.note_id,k.noteFormDisplay=!1,k.ok=function(){b.close()},k.close=function(){b.dismiss("cancel")},k.getSkillNote=function(a,b){k.skillNoteManager.getSkillNote(a,b).then(function(a){},function(a){console.log(a)})},k.editSkillNote=function(a){k.skillNoteManager.editSkillNote(a).then(function(a){},function(a){console.log(a)})},k.editSkillNoteSections={details:function(a){var b={skillNoteId:k.skillNoteId,title:a.title,description:a.description};k.editSkillNote(b)}},k.showNoteForm=function(){k.noteFormDisplay=!0},k.getSkillNote(k.skillId,k.noteId)}]);