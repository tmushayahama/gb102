angular.module("app.mentorships").controller("MentorshipNoteCtrl",["MentorshipNoteManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","mentorshipNoteData",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.mentorshipId=j.mentorship_id,k.mentorshipNoteId=j.id,k.mentorshipNoteManager=new a,k.noteId=j.note_id,k.noteFormDisplay=!1,k.ok=function(){b.close()},k.close=function(){b.dismiss("cancel")},k.getMentorshipNote=function(a,b){k.mentorshipNoteManager.getMentorshipNote(a,b).then(function(a){},function(a){console.log(a)})},k.editMentorshipNote=function(a){k.mentorshipNoteManager.editMentorshipNote(a).then(function(a){},function(a){console.log(a)})},k.editMentorshipNoteSections={details:function(a){var b={mentorshipNoteId:k.mentorshipNoteId,title:a.title,description:a.description};k.editMentorshipNote(b)}},k.showNoteForm=function(){k.noteFormDisplay=!0},k.getMentorshipNote(k.mentorshipId,k.noteId)}]);