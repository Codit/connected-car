#!/bin/sh
cd app/backend
service nginx start
dotnet /app/backend/Codit.ConnectedCar.API.dll
