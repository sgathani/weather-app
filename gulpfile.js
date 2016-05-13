var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');
var debug = require('gulp-debug');
var intercept = require('gulp-intercept');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
    scripts: 'app/**/*.js',
    styles: ['app/**/*.css', 'app/**/*.scss'],
    images: 'app/images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
    inject: ['app/**/*.html', '!app/index.html'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

var pipes = {};

/**
 * ====================================================== BUILD SCRIPTS ================================================================
 */
pipes.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.orderedAppScripts = function() {
    return plugins.angularFilesort();
};

pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtAppScriptsProd = function() {
    var scriptedPartials = pipes.scriptedPartials();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
      .pipe(pipes.orderedAppScripts())
      // .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('app.min.js'))
      .pipe(ngAnnotate())
      .pipe(plugins.uglify())
      // .pipe(debug({title: 'prodScripts: '}))
      // .pipe(intercept(function(file){
      //     console.log('CONTENT: ' + file.contents.toString() );
      //     return file;
      // }))
      // .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.scriptedPartials = function() {
    return pipes.validatedPartials()
      .pipe(plugins.htmlhint.failReporter())
      .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(plugins.ngHtml2js({
          moduleName: "weatherApp",
          declareModule: false
      }));
};

pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles('**/*.js'))
      .pipe(pipes.orderedVendorScripts())
      // .pipe(debug({title: 'vendorScripts: '}))
      .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles('**/*.js'))
      .pipe(pipes.orderedVendorScripts())
      .pipe(plugins.concat('vendor.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.distScriptsProd));
};

pipes.validatedDevServerScripts = function() {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.minifiedFileName = function() {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

/**
 * ================================================= BUILD TEMPLATES, STYLES AND IMAGES ================================================
 */
pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
        // .pipe(debug({title: 'partials: '}))
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipes.buildPartialTemplates = function() {
    return gulp.src(paths.partials)
      .pipe(templateCache())
      .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        // .pipe(debug({title: 'styles: '}))
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
      .pipe(plugins.minifyCss())
      .pipe(plugins.sourcemaps.write())
      .pipe(pipes.minifiedFileName())
      .pipe(gulp.dest(paths.distProd));
};

pipes.processedImagesDev = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

pipes.processedImagesProd = function() {
    return gulp.src(paths.images)
      .pipe(gulp.dest(paths.distProd + '/images/'));
};

/**
 * ====================================================== BUILD INDEX AND APP =========================================================
 */

pipes.validatedIndex = function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtIndexDev = function() {
    var orderedVendorScripts = pipes.builtVendorScriptsDev();
    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();
    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
      // .pipe(intercept(function(file){
      //     console.log('CONTENT: ' + file.contents.toString() );
      //     return file;
      // }));
};

pipes.builtIndexProd = function() {
    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return pipes.validatedIndex()
      .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
      .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
      .pipe(plugins.inject(appScripts, {relative: true}))
      .pipe(plugins.inject(appStyles, {relative: true}))
      .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest(paths.distProd));
};

pipes.builtAppDev = function() {
    return es.merge(
      pipes.builtIndexDev(),
      pipes.builtPartialsDev(),
      pipes.processedImagesDev());
};

pipes.builtAppProd = function() {
    return es.merge(
      pipes.builtIndexProd(),
      pipes.processedImagesProd());
};

/**
 * ================================================================ TASKS ==============================================================
 */

// removes all compiled dev files
gulp.task('clean-dev', function() {
    var deferred = Q.defer();
    del(paths.distDev, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// removes all compiled production files
gulp.task('clean-prod', function() {
    var deferred = Q.defer();
    del(paths.distProd, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// builds a complete dev environment
gulp.task('dev', pipes.builtAppDev);

// builds a complete prod environment
gulp.task('prod', pipes.builtAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-dev', ['clean-dev'], pipes.builtAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-prod', ['clean-prod'], pipes.builtAppProd);

/**
 * =======================================================  WATCH TASKS ==================================================================
 */

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-dev', 'validate-devserver-scripts'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'development'} })
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({ start: true });

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    // watch html partials
    gulp.watch(paths.partials, function() {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });
});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-prod', 'validate-devserver-scripts'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
      .on('change', ['validate-devserver-scripts'])
      .on('restart', function () {
          console.log('[nodemon] restarted dev server');
      });

    // start live-reload server
    plugins.livereload.listen({start: true});

    // watch index
    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
          .pipe(plugins.livereload());
    });

    // watch app scripts
    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
          .pipe(plugins.livereload());
    });

    // watch hhtml partials
    gulp.watch(paths.partials, function() {
        return pipes.builtAppScriptsProd()
          .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
          .pipe(plugins.livereload());
    });

});

// default task builds for prod
gulp.task('default', ['clean-prod']);
