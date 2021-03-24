# my-town-market-customer
for login otp with number (apk need to be signed for every apk build)

1.ionic cordova build --release android

2.jarsigner -storepass october2017 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

3.zipalign -v 4 app-release-unsigned.apk MyTownMarket.apk //open cmd (platforms/android/app/build/outputs/apk/release/)
