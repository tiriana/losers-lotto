/* global module */

module.exports = function (grunt) {
    'use strict';

    var defaultPublisher = 'dummypublisher',
        gameVersion = require('./package.json').version,
        publisher = grunt.option('to') || defaultPublisher,
        filesRelease = [
            { expand: false, flatten: false, src: 'reset.css', dest: '' },
            { expand: false, flatten: false, src: 'index.html', dest: '' },
            { expand: false, flatten: false, src: 'manifest.json', dest: '' },
            { expand: true, flatten: false, src: 'build/**/*', dest: '' },
            { expand: true, src: 'game/assets/**/*' }
        ],
        filesVendor = [
            'node_modules/@thelittlehog/tlh-dust.plugins.uuid.*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust/build/dustLight.min.js',
            'node_modules/@thelittlehog/tlh-dust.components/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.loaders*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.rotation*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.soundscreen*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.fullscreenbutton*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.debugtrigger*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.networkapi*/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.publisherapi/build/*.min.js',
            'node_modules/@thelittlehog/tlh-dust.plugins.dummypublisher/build/*noNetwork.min.js',
            'node_modules/axios/dist/axios.standalone.min.js'
        ],
        filesGame = filesVendor.concat(['tmp/game.js']);

    grunt.initConfig({
        'file-creator': {
            version: {
                'game/src/version.ts': function (fs, fd, done) {
                    fs.writeSync(fd, 'var version = "' + gameVersion + '"; export {version}');
                    done();
                }
            }
        },
        'json-minify': {
            build: {
                files: 'game/assets/images/*.json'
            }
        },
        copy: {
            loader: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/@thelittlehog/tlh-dust.plugins.loaders.hog/img/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            },
            rotate: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/@thelittlehog/tlh-dust.plugins.rotation.classic/img/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        ts: {
            references: {
                src: ['node_modules/@thelittlehog/**/*.d.ts', 'node_modules/axios/axios.d.ts'],
                reference: "references.ts",
                options: {
                    experimentalDecorators: true,
                    sourceMap: false
                }
            },
            app: {
                src: ['node_modules/@thelittlehog/**/*.d.ts', 'game/**/*.ts'],
                outDir: 'tmp/compiled',
                options: {
                    fast: 'always',
                    module: 'commonjs',
                    experimentalDecorators: true,
                    sourceMap: false
                }

            },
            test: {
                src: ['test/**/*.ts']
            }
        },
        concat: {
            dust: {
                src: filesGame,
                dest: 'build/game.min.js'
            }
        },
        clean: {
            pre: ['build', 'tmp'],
            publishers: [
                'node_modules/@thelittlehog/tlh-dust.plugins.dummypublisher',
                'node_modules/@thelittlehog/tlh-dust.plugins.nugplay',
                'node_modules/@thelittlehog/tlh-dust.plugins.boostermedia'
            ],
            test: ['test/**.js', 'test/**.map'],
            post: ['.tscache', 'tmp']
        },
        compress: {
            publish: {
                options: {
                    archive: 'build/release/' + publisher + '.zip'
                },
                files: filesRelease
            }
        },
        exec: {
            npm: 'npm install --silent @thelittlehog/tlh-dust.plugins.' + publisher,
            tp: 'sh tp.sh',
            fonts: 'bash fonts.sh',
            as: 'sh as.sh'
        },
        watch: {
            scripts: {
                files: ['game/**/*.ts'],
                tasks: ['ts:app', 'browserify', 'concat'],
                options: {
                    spawn: false,
                    event: ['changed', 'added', 'deleted']
                }
            }
        },
        uglify: {
            app: {
                files: {
                    'build/game.min.js': ['build/game.min.js']
                }
            }
        },
        tsd: {
            refresh: {
                options: {
                    command: 'reinstall',
                    overwrite: true,
                    latest: true,
                    config: './tsd.json'
                }
            }
        },
        karma: {
            coverage: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'node_modules/phantomjs-polyfill/bind-polyfill.js',
                        'build/game.min.js',
                        'test/**/*.js',
                        { pattern: 'game/assets/**/*', included: false }
                    ],
                    preprocessors: ['build/game.min.js'].reduce(function (preprocessors, file) {
                        preprocessors[file] = 'coverage';
                        return preprocessors;
                    }, {})
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'tmp/game.js': ['tmp/compiled/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-rename');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.task.registerTask('dev', ['file-creator', 'clean:pre', 'copy:loader', 'copy:rotate', 'ts:references', 'ts:app', 'browserify', 'concat', 'clean:post']);
    grunt.task.registerTask('dist', ['file-creator', 'clean:pre', 'copy:loader', 'copy:rotate', 'ts:references', 'ts:app', 'browserify', 'concat', 'uglify', 'clean:post']);
    grunt.task.registerTask('noassets', ['file-creator', 'clean:pre', 'ts:references', 'ts:app', 'ts:test', 'browserify', 'concat', 'clean:post']);

    grunt.task.registerTask('rebuild-dev', ['clean:publishers', 'exec:npm', 'exec:tp', 'exec:fonts', 'exec:as', 'json-minify', 'dev']);
    grunt.task.registerTask('rebuild-dist', ['clean:publishers', 'exec:npm', 'exec:tp', 'exec:fonts', 'exec:as', 'json-minify', 'dist']);
    grunt.task.registerTask('rebuild-test', ['clean:publishers', 'exec:npm', 'json-minify', 'noassets']);
    grunt.task.registerTask('test', ['rebuild-test', 'karma', 'clean:test']);

    grunt.task.registerTask('default', ['rebuild-dev', 'watch']);
    grunt.task.registerTask('release', ['rebuild-dist', 'compress:publish']);
};
