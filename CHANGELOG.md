# Change Log
All notable changes to this project will be documented in this file.

## [2.14.0] - 2020-07-16
- Added host network feature to docker run

## [2.12.0] - 2020-06-17
- Added shmsize
## [2.11.0] - 2019-12-17
- Added docker daemon check

## [2.9.1] - 2019-12-05
- Added network support fixed spaces
## [2.9.0] - 2019-09-17  
- Added support in exec for command containing double quotes

## [2.7.1] - 2019-09-03
 - Fixed spaces in docker run command
## [2.7] - 2019-08-31
- Added volume create and remove  
- Added options to docker run and notify callback
## [2.6] - 2019-08-25
- Added build function
## [2.4] - 2019-02-07
### Changed
Fixed image mgr notify callback 

## [2.2.1] - 2018-11-24
### Changed
Removed console.dir
## [2.2] - 2018-11-24
### Changed
   same images and different versions  problem 
## [1.10.0] - 2017-10-02
### Added
  Added the flag interactive and the net flag to run command
## [1.8.0] - 2017-04-14 
### Added   
  - Added the Window Docker toolbox support for docker-compose commands and for docker-remote API. 
### Changed  
  - dockerComposer and dockerImages and curl in utils in order to execute windows compatible commands. (use docker-compose -f 'path/docker-compose.yml' instead of change directory command not compatible with Windows.    

## [1.5.4] - 2017-05-11
### Changed
  - Moved the cd command  utils, and adjust the bug that doesn't allow the use for directories with spaces .
