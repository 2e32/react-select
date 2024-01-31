const esbuild = require('esbuild');
const packageJson = require('./package.json');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  treeShaking: true,
  sourcemap: true,
  target: 'es6',
  logLevel: 'info',
  external: Object.keys(packageJson.peerDependencies),
};

esbuild.build({
  ...shared,
  format: 'cjs',
  outfile: packageJson.main,
});

esbuild.build({
  ...shared,
  format: 'esm',
  outfile: packageJson.module,
});

esbuild.build({
  entryPoints: ['src/assets/css/index.css'],
  outfile: packageJson.exports['./css'],
  bundle: true,
  minify: true,
  sourcemap: true,
  logLevel: 'info',
});
