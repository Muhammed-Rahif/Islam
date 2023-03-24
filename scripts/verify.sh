#!/bin/bash
node scripts/versioning.js -v $1 
CI=false 
yarn build 
npx cap sync android 
ionic capacitor update 
ionic capacitor copy android 
cd android 
chmod +x gradlew 
./gradlew assembleDebug 
./gradlew assembleRelease 
cd .. 
CI=true
return 0