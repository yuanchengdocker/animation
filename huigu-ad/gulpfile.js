const clean = require('gulp-clean');
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const px2rem = require('gulp-px3rem');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
/*
 * px2rem 的相关配置
 */
function tranpx() {
  return px2rem({
    baseDpr: 2,             // base device pixel ratio (default: 2)
    threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
    remVersion: true,       // whether to generate rem version (default: true)
    remUnit: 75,            // rem unit value (default: 75)
    remPrecision: 6         // rem precision (default: 6)
  })
}

gulp.task('serve', ['stylus','uglify','copy'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/pages/**/*.styl' , ['stylus']).on('change', browserSync.reload);
    gulp.watch('./src/pages/**/*.js' , ['uglify']).on('change', browserSync.reload);
    gulp.watch('./src/common/**' , ['copy']).on('change', browserSync.reload);
    gulp.watch('./src/pages/*.html',['copy']).on('change', browserSync.reload);
});

gulp.task('testImagemin', function () {
    gulp.src('./src/img/**/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./build/img'));
});

gulp.task('stylus', function() {
    gulp.src('./src/pages/**/*.styl')
      .pipe(stylus({
          compress:false
        }))
      .pipe(tranpx())
      .pipe(cssmin()) 
      .pipe(rename(function (path) {
        path.basename = path.basename.split(".")[0];
      }))
      .pipe(gulp.dest('./build'))
});

gulp.task('uglify', function() {
  gulp.src('./src/pages/**/*.js')
    //   .pipe(uglify())  
      .pipe(gulp.dest('./build'))
})

gulp.task('copy',function(){
    gulp.src('src/common/css/*.css')
        .pipe(gulp.dest('./build/common/css'));

    gulp.src('src/common/js/*.js')
        .pipe(gulp.dest('./build/common/js'));

    gulp.src('src/pages/*.html')
        .pipe(gulp.dest('./build/pages'));

    gulp.src('src/pages/*.mp3')
        .pipe(gulp.dest('./build/pages'));
    gulp.src('src/pages/*.m4a')
        .pipe(gulp.dest('./build/pages'));
    
});

gulp.task('clean', function() {
    return gulp.src('./build/')
         .pipe(clean());
});

gulp.task('default', ['stylus', 'uglify' ,'copy','testImagemin']);