import fs from "fs";
import path from "path";

type ExportEntry = {
  types: string;
  import: string;
  require: string;
};

const distDir = path.resolve("dist");

function isPrivate(name: string): boolean {
  return name.startsWith("_");
}

function scanFolder(folder: string): string[] {
  return fs.readdirSync(folder).map(f => path.join(folder, f));
}

function generateExports(): Record<string, ExportEntry> {
  const exportsObj: Record<string, ExportEntry> = {};

  function processDir(dirPath: string, relativePath = ".") {
    const entries = scanFolder(dirPath);

    // collect .js files only
    const jsFiles = entries.filter(
      e => e.endsWith(".js") && !isPrivate(path.basename(e))
    );

    for (const file of jsFiles) {
      if (path.basename(file) === "script.js") continue; // skip generator script itself

      const base = path.basename(file, ".js");
      const relDir = path.relative(distDir, path.dirname(file));
      const keyPath =
        base === "index" && relDir
          ? `./${relDir}`
          : `./${path.join(relDir, base)}`.replace(/\\/g, "/");

      exportsObj[keyPath] = {
        types: `./dist/${path.join(relDir, base)}.d.ts`.replace(/\\/g, "/"),
        import: `./dist/${path.join(relDir, base)}.js`.replace(/\\/g, "/"),
        require: `./dist/${path.join(relDir, base)}.cjs`.replace(/\\/g, "/"),
      };
    }

    // recurse into subfolders
    for (const entry of entries) {
      if (
        fs.statSync(entry).isDirectory() &&
        !isPrivate(path.basename(entry))
      ) {
        processDir(entry, path.join(relativePath, path.basename(entry)));
      }
    }
  }

  processDir(distDir);

  // always add `.` root export (main entry)
  exportsObj["."] = {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
    require: "./dist/index.cjs",
  };

  return exportsObj;
}

function updatePackageJson() {
  const pkgPath = path.resolve("package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  // overwrite exports (fresh each build ✅)
  pkg.exports = generateExports();

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("✅ package.json exports regenerated!");
}

updatePackageJson();