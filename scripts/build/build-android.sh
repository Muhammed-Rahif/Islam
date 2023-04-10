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
cd ../
echo $KEYSTORE_FILE_BASE64 | base64 --decode > release-key.keystore
jarsigner -keystore release-key.keystore app/build/outputs/apk/release/app-release-unsigned.apk $KEYSTORE_ALIAS -storepass $KEYSTORE_PASS
zipalign 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/app-release.apk
cd ../
