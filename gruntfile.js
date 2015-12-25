// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

 // Load Grunt tasks declared in the package.json file
 grunt.loadNpmTasks("grunt-contrib-watch");
 grunt.loadNpmTasks("grunt-contrib-copy");
 grunt.loadNpmTasks("grunt-replace");
 //grunt.loadNpmTasks("grunt-reload");
 //grunt.loadNpmTasks("connect-livereload");
 grunt.loadNpmTasks("grunt-express");

 // Configure Grunt
 grunt.initConfig({
  options: {
   skill: {
    controller_base: "app/Http/Controllers/Skill",
    module_base: "public/modules/skills",
    model_base: "app/Models/Skill"
   },
   goal: {
    controller_base: "app/Http/Controllers/Goal",
    module_base: "public/modules/goals",
    model_base: "app/Models/Goal"
   }
  },
  // grunt-express will serve the files from the folders listed in `bases`
  // on specified `port` and `hostname`
  express: {
   all: {
    options: {
     port: 8002,
     hostname: "localhost",
     bases: ['public'], // Replace with the directory you want the files served from
     // Make sure you don't use `.` or `..` in the path as Express
     // is likely to return 403 Forbidden responses if you do
     // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
     livereload: true
    }
   }
  },
  copy: {
   skillToGoalModule: {
    files: [
     {
      expand: true,
      cwd: '<%= options.skill.module_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.module_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/, "goal")
               .replace(/Skill/, "Goal");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.model_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.model_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/, "goal")
               .replace(/Skill/, "Goal");
      }
     },
     {
      expand: true,
      cwd: '<%= options.skill.controller_base %>/',
      src: ['**/*'],
      dest: '<%= options.goal.controller_base %>/',
      rename: function (dest, src) {
       return dest + src.replace(/skill/, "goal")
               .replace(/Skill/, "Goal");
      }
     }
    ]
   }
  },
  replace: {
   dist: {
    options: {
     patterns: [
      {
       match: /skill/g,
       replacement: 'goal'
      },
      {
       match: /Skill/g,
       replacement: 'Goal'
      },
      {
       match: /SKILL/g,
       replacement: 'GOAL'
      }
     ]
    },
    files: [
     {
      expand: true,
      src: ['<%= options.goal.module_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.goal.model_base %>/**'],
      dest: ''
     },
     {
      expand: true,
      src: ['<%= options.goal.controller_base %>/**'],
      dest: ''
     }
    ]
   }
  },
  // grunt-watch will monitor the projects files
  watch: {
   all: {
    // Replace with whatever file you want to trigger the update from
    // Either as a String for a single entry
    // or an Array of String for multiple entries
    // You can use globing patterns like `css/**/*.css`
    // See https://github.com/gruntjs/grunt-contrib-watch#files
    files: 'public/css/gb-sass/stylesheets/main.css',
    options: {
     livereload: true
    }
   }
  },
  // grunt-open will open your browser at the project's URL
  open: {
   all: {
    // Gets the port from the connect configuration
    path: 'http://localhost:<%= express.all.options.port%>'
   }
  }
 });

 // Creates the `server` task
 grunt.registerTask('gb_copy_replace', [
  'copy',
  'replace'
 ]);

 grunt.registerTask('server', [
  'express',
  //'open',
  'watch'
 ]);
};

/*

 module.exports = function (grunt) {

 grunt.initConfig(
 {
 pkg: grunt.file.readJSON('package.json'),
 watch: {
 all: {
 files: ["public * "],
 tasks: ["default"],
 options: {
 nospawn: true,
 interrupt: false,
 debounceDelay: 250
 }
 }
 },
 reload: {
 port: 35729,
 liveReload: {},
 proxy: {
 host: "localhost",
 port: 8000
 }
 }
 });
 grunt.loadNpmTasks("grunt-contrib-watch");
 grunt.loadNpmTasks("grunt-reload");
 grunt.registerTask("default", ["reload", "watch"]);
 };

 */