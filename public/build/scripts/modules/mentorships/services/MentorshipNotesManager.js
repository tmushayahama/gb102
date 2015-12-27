angular.module("app.mentorships").service("MentorshipNotesManager",["$http","$q",function(a,b){var c=function(){this.mentorshipNotes=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getMentorshipNotes=function(c){var d=this,e=b.defer();return d.mentorshipNotes=[],a.get("/api/mentorship/"+c+"/notes").success(function(a){d.mentorshipNotes=a,d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.getMentorshipNote=function(c,d){var e=this,f=b.defer();return e.mentorshipNotes=[],a.get("/api/mentorship/"+c+"/note/"+d).success(function(a){e.mentorshipNotes=a,e.deferredHandler(a,f)}).error(function(a){e.deferredHandler(a,f,"Unknown error")}),f.promise},c.prototype.createMentorshipNote=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/mentorship/note/create",data:c}).success(function(a){d.mentorshipNotes.unshift(a),d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.editMentorshipNote=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/mentorship/note/edit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);