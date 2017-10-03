# Change Log
All notable changes to this project will be documented in this file.

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
