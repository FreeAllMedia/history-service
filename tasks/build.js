import gulp from "gulp";

gulp.task("build", ["build-features", "build-lib", "build-spec", "build-lib-assets", "build-spec-assets"]);
