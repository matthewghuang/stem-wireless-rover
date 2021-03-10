#!/bin/bash
sudo motion &&
cd ./comm-server && npm run start &
cd frontend && live-server build &
cd motor-controller && node index.js
