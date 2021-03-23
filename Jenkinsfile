pipeline {
   agent any

   tools {node}
      environment {
       set ANDROID_HOME=C:\android\sdk
 set NODEJS_HOME=C:\nodejs
 set NPM_HOME=%NODEJS_HOME%\npmroot
 set CI=true
 set PATH=%SystemRoot%\system32;%SystemRoot%
 set PATH=%JAVA_HOME%\bin;%PATH%
 set PATH=%NODEJS_HOME%;%PATH%
 set PATH=%NPM_HOME%;%PATH%
 set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%PATH%
 set BUILD_DIR=%WORKSPACE%\..\builds%BUILD_ID%\build
      }
   stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
      }
   }

//    stage('IOS Build') {
//    steps {
//       sh 'ionic cordova build ios --release'
//      } 
//   }

   stage('Android Build') {
   steps {
     sh 'ionic cordova build android --release'
   }
  }

   stage('APK Sign') {
   steps {
      sh 'jarsigner -storepass october -keystore keys/my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk MyTownMarket'
   }
   }

//    stage('Stage Web Build') {
//       steps {
//         sh 'npm run build --prod'
//     }
//   }

//    stage('Publish Firebase Web') {
//       steps {
//       sh 'firebase deploy --token "Your Token Key"'
//    }
//   }

//    stage('Publish iOS') {
//       steps {
//        echo "Publish iOS Action"
//     }
//    }

//    stage('Publish Android') {
//      steps {
//     echo "Publish Android API Action"
//    }
//   }

 }
}
