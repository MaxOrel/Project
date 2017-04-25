'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/style/app.scss')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sassGlob())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      //.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gp.if(!$.dev, $.gp.csso()))
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.min' })))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  })
};
