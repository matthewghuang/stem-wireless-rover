#!/bin/bash
cd ./comm-server && npm run start &
cd .. && cd frontend && live-server build &
cd .. && cd motor-controller && node index.js