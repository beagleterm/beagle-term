#!/usr/bin/env python

import os
import shutil
import subprocess
from contextlib import contextmanager

SOURCE_DIR = os.path.join(os.getcwd(), 'app')
BUILD_DIR = os.path.join(os.getcwd(), 'build')

@contextmanager
def pushd(path):
  currentDir = os.getcwd()
  os.chdir(path)
  yield
  os.chdir(currentDir)

def printInfo(message):
  print os.path.basename(__file__) + ' >> ' + message

def installDependencies():
  printInfo('Start bower install')
  with pushd('app'):
    subprocess.check_call('bower install', shell=True)

def copy(src, des):
  printInfo('Copying ' + src + ' to ' + des)
  if os.path.isdir(src):
    shutil.copytree(src, des)
  else:
    if not os.path.exists(os.path.dirname(des)):
      os.makedirs(os.path.dirname(des))
    shutil.copy2(src, des)

def zip(destFile):
  printInfo('Start zipping build directory')
  shutil.make_archive(destFile, 'zip', BUILD_DIR)
  printInfo('Created ' + destFile + '.zip')

def copyDeployFiles():

  if (os.path.exists(BUILD_DIR)):
    printInfo('Deleting existing ' + str(BUILD_DIR))
    shutil.rmtree(BUILD_DIR)
  printInfo('Creating ' + str(BUILD_DIR))
  os.makedirs(BUILD_DIR)

  copy_list = ['index.html', 'manifest.json', 'js/index.js', 'js/background.js', 'js/lib/hterm_all.min.js',
                'css/main.css', 'images', 'bower_components/jquery/dist/jquery.min.js',
               'bower_components/bootstrap/dist/js/bootstrap.min.js',
               'bower_components/bootstrap/dist/css/bootstrap.min.css']

  for single_file in copy_list:
    source_path = os.path.join(SOURCE_DIR, single_file)
    target_path = os.path.join(BUILD_DIR, single_file)
    copy(source_path, target_path)

def main():
  installDependencies()
  copyDeployFiles()
  # TODO: Minify js/index.js, js/background.js
  zip('archive')

if __name__ == '__main__':
  main()
