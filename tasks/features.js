import gulp from "gulp";
import paths from "../paths.json";
import istanbul from "gulp-istanbul";
import cucumber from "gulp-cucumber";

gulp.task("features", ["build"], cb => {
  gulp.src(paths.build.lib)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on("finish", () => {
      gulp.src(paths.build.features)
        .pipe(
          cucumber({
              steps: paths.build.featureSteps,
              support: paths.build.featureSupport,
              format: "pretty"
          })
        ).on("error", function log(error) {
          process.stdout.write(error.message);
          this.emit("end");
        })
        .pipe(istanbul.writeReports({reporters: ["text-summary"]})) //just a summary report for dev
        .on("end", cb);
    });
});
