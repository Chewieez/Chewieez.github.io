module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ["styles/**/*.css"]
            },
            html: {
                files: ["index.html"]
            },
            scripts: {
                files: ["scripts/*.js", "scripts/**/*.js", "!node_modules/**/*.js" ],
                tasks: ["eslint", "browserify"],
                options: {
                    spawn: false,
                },
            },
        },
        browserify: {
            dist: {
                files: {
                    "build/bundle.js": ["scripts/main.js"],
                },
            },
        },
        eslint: {
            src: [
                "**/scripts/*.js",
                "**/scripts/**/*.js",
                "!node_modules/**/*.js",
            ],
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
            },
            build: {
                files: [{
                    expand: true,
                    cwd: "build/",
                    src: "*.js",
                    dest: "build/",
                    ext: ".min.js"
                }
                ]
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output 
                title: "Project Name", // defaults to the name in package.json, or will use project directory's name 
                success: false, // whether successful grunt executions should be notified automatically 
                duration: 3 // the duration of notification in seconds, for `notify-send only 
            }
        },
    });

    // Load the plugin that provides the task.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-notify");

    // Default task(s).
    grunt.registerTask("default", ["eslint", "browserify", "watch", "uglify", "notify_hooks"]);
    
}