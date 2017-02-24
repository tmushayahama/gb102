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
                  "fillApps": 7,
                  "massAddition": 8,
                  "sectionsStep": 9,
                  "appsStep": 10,
                  "activitiesStep": 11,
                  "motivesStep": 12,
                  "contributionsStep": 13,
                  "contributorsStep": 14,
                  "mentorshipRequestStep": 15,
                  "fillAppsStep": 16,
                  "finish": 17
                 })
         .constant('level_categories',
                 {
                  "apps": 1,
                  'room': 10,
                  'service': 100,
                  'section': 200,
                  'skill': 11,
                  'hobby': 12,
                  'mentorship': 101,
                  'advice': 102,
                  'goal': 103,
                  'promise': 104,
                  'teach': 105,
                  'collabo': 106,
                  'project': 201,
                  'page': 202,
                  'journal': 203,
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
                  "matcher_answer": {
                   "answer": 19001
                  },
                  "edit_component_part": {
                   "description": 1,
                   "background": 2
                  },
                  "post_type": 20000,
                  "post": {
                   "discussion": 21001
                  }
                 });
})();
