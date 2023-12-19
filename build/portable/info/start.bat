@echo off
rem start.bat

rem App Title
title My App

rem Current Dir
set node_app_runtime_path=%cd%

cd %node_app_runtime_path%\node

rem Use NodeJS
call nodevars.bat

rem Go to app
cd /d %node_app_runtime_path%\app

rem Run
node dist\main.js

echo "Finished."
pause