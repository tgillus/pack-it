/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const zip = require('gulp-zip');
const execa = require('execa');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const package = require('./package.json');
const deploy = require('./deploy.config');

function tmpBuildPath() {
  return path.join(__dirname, '.tmp-build');
}

function artifactBuildPath() {
  return path.join(__dirname, 'deploy');
}

function artifactName() {
  const clonedPackagePath = path.join(tmpBuildPath(), 'package.json');
  const { name, version } = JSON.parse(
    fs.readFileSync(clonedPackagePath).toString()
  );
  return `${name}-${version}.zip`;
}

async function rmTmpBuildPath() {
  await execa('rimraf', [tmpBuildPath()]);
}

async function rmArtifactBuildPath() {
  await execa('rimraf', [artifactBuildPath()]);
}

async function mkTmpBuildDir() {
  await execa('mkdir', ['-p', tmpBuildPath()]);
}

async function cwdTmpBuildDir() {
  process.chdir(tmpBuildPath());
}

async function clone() {
  const { url } = package.repository;
  await execa('git', ['clone', url, '-b', deploy.branch(), tmpBuildPath()]);
}

async function installAllDependencies() {
  await execa('npm', ['install']);
}

async function build() {
  await execa('npm', ['run', 'build']);
}

async function cleanDependencies() {
  await execa('rm', ['-rf', 'node_modules']);
}

async function installProductionDependencies() {
  await execa('npm', ['install', '--production']);
}

async function buildDeploymentArtifact() {
  await gulp
    .src(['build/**', 'node_modules/**'], { base: '.' })
    .pipe(zip(artifactName()))
    .pipe(gulp.dest(artifactBuildPath()));
}

async function uploadDeploymentArtifactToS3() {
  const buildArtifactName = artifactName();
  const client = new S3Client({ region: 'us-east-1' });
  const command = new PutObjectCommand({
    Bucket: deploy.deploymentArtifactBucket(),
    Key: `${deploy.deploymentArtifactFolder()}/${buildArtifactName}`,
    Body: fs.createReadStream(
      path.join(artifactBuildPath(), buildArtifactName)
    ),
  });

  await client.send(command);
}

gulp.task('clean', gulp.parallel(rmTmpBuildPath, rmArtifactBuildPath));
gulp.task(
  'build',
  gulp.series(
    gulp.task('clean'),
    mkTmpBuildDir,
    cwdTmpBuildDir,
    clone,
    installAllDependencies,
    build,
    cleanDependencies,
    installProductionDependencies,
    buildDeploymentArtifact
  )
);
gulp.task('upload', uploadDeploymentArtifactToS3);
gulp.task('default', gulp.task('build'));
