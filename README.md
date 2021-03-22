# my-town-market-customer
for login otp with number (apk need to be signed for every apk build)

1.ionic cordova build --release android

2.copy the app-release-unsigned.apk and paste in project root

3.jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

password : october2017

4.zipalign -v 4 app-release-unsigned.apk MyTownMarket.apk
