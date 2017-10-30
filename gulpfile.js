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
           gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
               'node_modules/open-iconic/font/css/open-iconic.min.css',
               'node_modules/font-awesome/css/font-awesome.min.css']),
           gulp.src('src/sass/**/*.scss')
               .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        ])
       .pipe(concat('style.css'))
       .pipe(gulp.dest('lib'));
});


gulp.task('html', function () {
    return gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('demo'));
});

gulp.task('js', function () {
    return es.merge([
            gulp.src(['node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.min.js',
            ]),
            gulp.src('src/js/**/*.js')
                // .pipe(uglify())
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('lib'));
});




gulp.task('img', function () {
    return gulp.src(['img/**'])
        .pipe(gulp.dest('demo/img'));
});


gulp.watch(['src/**/*.html'], ['html']);
gulp.watch('src/sass/**/*.scss', ['sass']);
gulp.watch('src/js/**/*.js', ['js']);

gulp.task('default', ['js', 'html', 'sass', 'img']);