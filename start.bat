@echo off
chcp 65001

if exist "./node_modules" (
    @echo ...
) else (
    @echo downloading dependencies... "(загрузка зависимостей)"
    call "./program/install.bat"
)

title translator

@echo [continue]
node program/translator.js

@pause