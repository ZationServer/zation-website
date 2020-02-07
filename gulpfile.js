// Load plugins
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

const distFolder = 'dist';

// Copy third party libraries from /node_modules into /libs
gulp.task('libs', function (cb) {

    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
        .pipe(gulp.dest(distFolder + '/libs/bootstrap'));

    // Font Awesome
    gulp.src([
        './node_modules/@fortawesome/**/*',
    ])
        .pipe(gulp.dest(distFolder + '/libs'));

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest(distFolder + '/libs/jquery'));

    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest(distFolder + '/libs/jquery-easing'));

    // Magnific Popup
    gulp.src([
        './node_modules/magnific-popup/dist/*'
    ])
        .pipe(gulp.dest(distFolder + '/libs/magnific-popup'));

    // Scrollreveal
    gulp.src([
        './node_modules/scrollreveal/dist/*.js'
    ])
        .pipe(gulp.dest(distFolder + '/libs/scrollreveal'));

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
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(distFolder + "/css"));
}

// JS task
function js() {
    return gulp
        .src([
            'src/js/*.js',
            '!src/js/*.min.js',
        ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(distFolder + '/js'));
}

//Copy of files
function cof() {
    return gulp
        .src(['src/**/*','!src/**/*.js','src/**/*.min.js','!src/**/*.scss'])
        .pipe(gulp.dest(distFolder));
}
// Tasks
gulp.task("css", css);
gulp.task("js", js);
gulp.task("cof", cof);

gulp.task("default", gulp.parallel('libs', css, js, cof));

