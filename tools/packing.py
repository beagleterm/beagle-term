#!/usr/bin/env python

import os
import shutil
import subprocess
from contextlib import contextmanager

@contextmanager
def pushd(path):
  currentDir = os.getcwd()
  os.chdir(path)
  yield
  os.chdir(currentDir)

def installDependencies():
  with pushd('app'):
    subprocess.check_call('bower install', shell=True)

def copy(src, des):
  if os.path.isdir(src):
    shutil.copytree(src, des)
  else:
    if not os.path.exists(os.path.dirname(des)):
      os.makedirs(os.path.dirname(des))
    shutil.copy2(src, des)

def zip(destFile):
  shutil.make_archive(destFile, 'zip', 'deploy')

def copyDeployFiles():
  os.makedirs('deploy')
  source_dir = os.path.join(os.getcwd(), 'app')
  target_dir = os.path.join(os.getcwd(), 'deploy')

  copy_list = ['index.html', 'manifest.json', 'js/index.js', 'js/background.js', 'js/lib/hterm_all.min.js',
                'css/main.css', 'images', 'bower_components/jquery/dist/jquery.min.js',
               'bower_components/bootstrap/dist/js/bootstrap.min.js',
               'bower_components/bootstrap/dist/css/bootstrap.min.css']

  for single_file in copy_list:
    source_path = os.path.join(source_dir, single_file)
    target_path = os.path.join(target_dir, single_file)
    copy(source_path, target_path)

def main():
  installDependencies()
  copyDeployFiles()
  # TODO: Minify js/index.js, js/background.js
  zip('archive')

if __name__ == '__main__':
  main()
