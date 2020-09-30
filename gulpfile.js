const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;


sass.compiler = require('node-sass');

task( "clean", () => {
  return src( "${DIST_PATH}/**/*", { read: false }).pipe( rm() );
});


task("copy:html",  () => {
  return src('{DIST_SRC}/*.html')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("copy:styles",  () => {
  return src('{DIST_SRC}/*.scss')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("copy:images", () =>{
  return src('{DIST_SRC}/img/**/*')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
})



task("styles",  () => {
  return src([...STYLES_LIBS, "src/styles/main.scss"])

   .pipe(gulpif(env === "dev", sourcemaps.init()) 
   .pipe(concat("main.min.scss"))
   .pipe(sassGlob())
   .pipe(sass().on("error", sass.logError))
   .pipe(px2rem())
   .pipe(gulpif(env === "dev",
    autoprefixer({
      browsers: ["last 2 version"],
      cascade: false})
      

  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest("dist"))
  .pipe(reload({stream: true})
});



task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
      })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 })

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
})

task ('watch', () => {
 watch("/src/styles/**/*.scss", series("styles"));
watch("/src/*.html", series("copy:html"));
watch("/src/scripts/*.js", series("scripts")); 
})


task("default", series(
  "clean", parallel("copy:html",
  "copy:styles",
   "styles",
   "scripts", 
   "copy:images" ),
   parallel ('watch', 'server')))

   task("build", series(
    "clean", parallel("copy:html",
    "copy:styles",
     "styles",
     "scripts", 
     "copy:images" )))
  

