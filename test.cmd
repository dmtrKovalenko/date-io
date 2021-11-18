FOR /F "tokens=* USEBACKQ" %%F IN (`tzutil /g`) DO SET PREVIOUS_TZ=%%F
tzutil /s "UTC"
cmd.exe /c yarn cross-env NODE_ICU_DATA='./node_modules/full-icu' jest --watch
tzutil /s "%PREVIOUS_TZ%"
