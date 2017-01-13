(function ()
{
 'use strict';

 angular
         .module('fuse')
         // .constant('_', window._)
         .constant('add_component_tabs',
                 {
                  "sections": 0,
                  "apps": 1,
                  "activities": 2,
                  "motives": 3,
                  "contributions": 4,
                  "contributors": 5,
                  "mentorshipRequest": 6,
                  "fillApps": 7
                 })
         .constant('level_categories',
                 {
                  "apps": 1,
                  "skill": 2,
                  "goal": 3,
                  "hobby": 4,
                  "promise": 5,
                  "mentorship": 6,
                  "collaboration": 7,
                  "teach": 8,
                  "advice": 9,
                  "group": 10,
                  "journal": 11,
                  "page": 12,
                  "request_type_skill": 1001,
                  "request_type_goal": 1002,
                  "todo_level_normal": 50000,
                  "todo_level_progress": 50001,
                  "todo_status_in_progress": 50100,
                  "todo_status_later": 50101,
                  "todo_status_done": 50102,
                  "contribution_types": 4000,
                  "explorer_relationship": {
                   "parent": 6001,
                   "application": 6002
                  },
                  "list": {
                   "handpicked": 1
                  },
                  "share": {
                   "explorer": 300000,
                   "notes": 300001
                  },
                  "swipe_type": 9000,
                  "swipe": {
                   "notnow": 9001,
                   "explore": 9002
                  },
                  "privacy_type": 10000,
                  "privacy": {
                   "private": 10001,
                   "public": 10002,
                   "customize": 10003
                  },
                  "component": {
                   "none": 11001,
                   "note": 11002,
                   "guideline": 11003,
                   "activity": 11004,
                   "weblink": 11005,
                   "question": 11100
                  },
                  "edit_component_part": {
                   "description": 1,
                   "background": 2
                  },
                 });
})();
