#!/usr/bin/env python

import os
import subprocess
from contextlib import contextmanager

@contextmanager
def pushd(path):
  currentDir = os.getcwd()
  os.chdir(path)
  yield
  os.chdir(currentDir)

def installDependencies():
  subprocess.check_call(['npm', 'install'])
  subprocess.check_call(['bower', 'install'])

def copyDeployFiles():
  os.makedirs('deploy')

def main():
  with pushd('app'):
    installDependencies()

if __name__ == '__main__':
  main()
