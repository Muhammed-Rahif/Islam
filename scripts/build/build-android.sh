#!/bin/bash
node scripts/build/versioning.js -v $1
yarn build
npx cap sync android
ionic capacitor update
ionic capacitor copy android
cd android
chmod +x gradlew
./gradlew assembleDebug
./gradlew assembleRelease
cd ..
