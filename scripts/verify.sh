#!/bin/bash
node scripts/versioning.js -v $1 && exit 0
CI=false && exit 0
yarn build && exit 0
npx cap sync android && exit 0
ionic capacitor update && exit 0
ionic capacitor copy android && exit 0
cd android && exit 0
chmod +x gradlew && exit 0
./gradlew assembleDebug && exit 0
./gradlew assembleRelease && exit 0
cd .. && exit 0
CI=true && exit 0
