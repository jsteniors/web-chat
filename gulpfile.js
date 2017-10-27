gulp = require('gulp');
concat = require('gulp-concat');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
clean = require('gulp-clean');
es = require('event-stream');

gulp.task('clean', function () {
   return gulp.src('dist/')
       .pipe(clean());
});

gulp.task('sass', function () {
   return es.merge([
       gulp.src('sass/**/*.scss')
       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)),
       gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
           'node_modules/open-iconic/font/css/open-iconic.min.css',
           'node_modules/font-awesome/css/font-awesome.min.css'])
        ])
       .pipe(concat('style.css'))
       .pipe(gulp.dest('dist'));
});


gulp.task('html', function () {
    return gulp.src(['index.html', 'chat.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
            'jsutil/chat.js', 'jsutil/index.js',
            'node_modules/angular/angular.min.js',
            'jsutil/app.js',
            'js/**/*.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('jsmin', function () {
     gulp.src(['bower_components/BigVideo/lib/bigvideo.js', 'node_modules/jquery/dist/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js', 'bower_components/imagesloaded/imagesloaded.js',
        'node_modules/angular/angular.min.js'])
        // .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('jsno', function () {
     gulp.src(['js/!**!/!*.js'])
        .pipe(concat('script.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function () {
    return gulp.src(['img/**'])
        .pipe(gulp.dest('dist/img'));
});

/*gulp.task('css', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/open-iconic/font/css/open-iconic.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});*/

/*gulp.watch(['index.html', 'chat.html'], ['html']);
gulp.watch('sass/!**!/!*.scss', ['sass']);
gulp.watch('js/!**!/!*.js', ['js']);*/

gulp.task('default', ['js', /*'jsmin',*/ 'html', 'sass', 'img']);