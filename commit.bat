@echo off

set /P comment=Comment?

if not "%comment%" == "" goto :next
set comment=auto
:next

:git add *.* --force
git add *
git commit -m "%comment%"

git push -u origin master

pause