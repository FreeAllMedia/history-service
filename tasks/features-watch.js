import gulp from "gulp";
import paths from "../paths.json";

gulp.task("features-watch", ["suppress-errors"], () => {
  gulp.watch([
    paths.source.lib,
    paths.source.spec,
    paths.source.specAssets,
    paths.source.libAssets,
    paths.source.features
  ], ["features"]);
});
