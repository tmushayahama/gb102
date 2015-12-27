angular.module("app.advices").controller("AdviceNotesCtrl",["AdviceNotesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.adviceId=d.adviceId,k.adviceNotesCopy,k.adviceNotesManager=new a,k.noteFormDisplay=!1,k.defaultAdviceNoteData={adviceId:d.adviceId,privacy:0},k.newAdviceNoteData=angular.copy(k.defaultAdviceNoteData),k.showNoteForm=function(){k.noteFormDisplay=!0},k.createAdviceNote=function(a){k.adviceNotesManager.createAdviceNote(a).then(function(a){k.noteFormDisplay=!1,k.newAdviceNoteData=angular.copy(k.defaultAdviceNoteData),k.adviceNotesCopy=angular.copy(k.adviceNotesManager.adviceNotes)},function(a){console.log(a)})},k.editAdviceNote=function(a){k.adviceNotesManager.editAdviceNote(a).then(function(a){k.noteFormDisplay=!1,k.newAdviceNoteData=angular.copy(k.defaultAdviceNoteData),k.adviceNotesCopy=angular.copy(k.adviceNotesManager.adviceNotes)},function(a){console.log(a)})},k.editAdviceNoteSections={details:function(a,b){var c={adviceNoteId:a,title:b.title,description:b.description};k.editAdviceNote(c)}},k.cancelAdviceNote=function(a){k.noteFormDisplay=!1,k.newAdviceNoteData=angular.copy(k.defaultAdviceNoteData),a&&(a.$setPristine(),a.$setUntouched())},k.revertAdviceNote=function(a,b){a=b},k.editedNote=null,b.$watch(angular.bind(this,function(){return k.adviceNotes}),function(){k.doneCount=k.adviceNotesManager.adviceNotes.length-k.remainingCount,k.allChecked=!k.remainingCount},!0),k.editNote=function(a){k.editedNote=a,k.originalNote=angular.copy(a)},k.doneEditing=function(a){k.editedNote=null,a.title=a.title.trim(),a.title||k.removeNote(a)},k.openAdviceNote=function(a){var c=h.open({animation:!0,templateUrl:"advice-note-modal.html",controller:"AdviceNoteCtrl as adviceNoteCtrl",backdrop:"static",size:"xl",resolve:{adviceNoteData:function(){return a}}});c.result.then(function(a){b.selected=a},function(){i.info("Modal dismissed at: "+new Date)})},k.adviceNotesManager.getAdviceNotes(k.adviceId)}]);