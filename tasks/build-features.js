import gulp from "gulp";
import babel from "gulp-babel";

import paths from "../paths.json";

gulp.task("build-features", () => {
	return gulp.src(paths.source.features)
		.pipe(babel())
		.pipe(gulp.dest(paths.build.directories.features));
});
