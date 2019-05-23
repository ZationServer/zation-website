// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Copy third party libraries from /node_modules into /libs
gulp.task('libs', function (cb) {

    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
        .pipe(gulp.dest('./libs/bootstrap'));

    // Font Awesome
    gulp.src([
        './node_modules/@fortawesome/**/*',
    ])
        .pipe(gulp.dest('./libs'));

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./libs/jquery'));

    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest('./libs/jquery-easing'));

    // Magnific Popup
    gulp.src([
        './node_modules/magnific-popup/dist/*'
    ])
        .pipe(gulp.dest('./libs/magnific-popup'));

    // Scrollreveal
    gulp.src([
        './node_modules/scrollreveal/dist/*.js'
    ])
        .pipe(gulp.dest('./libs/scrollreveal'));

    cb();

});

// CSS task
function css() {
    return gulp
        .src("./src/scss/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./css"))
        .pipe(browsersync.stream());
}

// JS task
function js() {
    return gulp
        .src([
            './js/*.js',
            '!./js/*.min.js',
            '!./js/contact_me.js',
            '!./js/jqBootstrapValidation.js'
        ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
        .pipe(browsersync.stream());
}

// Tasks
gulp.task("css", css);
gulp.task("js", js);

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Watch files
function watchFiles() {
    gulp.watch("./src/scss/**/*", css);
    gulp.watch(["./js/**/*.js", "!./js/*.min.js"], js);
    gulp.watch("./**/*.html", browserSyncReload);
}

gulp.task("default", gulp.parallel('libs', css, js));

// dev task
gulp.task("dev", gulp.parallel(watchFiles, browserSync));
