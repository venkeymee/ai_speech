::((gwmi win32_process | ? { $_.processname -eq "powershell.exe" }).commandline -match "-NonInteractive")
pm2 start dist/src/server.js
::pause

:::pm2 start dist/src/server.js -l ./logs --output ./bot.log --error ./boterror.log
:: npm install pm2 -g
:: windows demon process is pm2
:: https://pm2.keymetrics.io/ 