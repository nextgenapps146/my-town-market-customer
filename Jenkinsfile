pipeline {
   agent any
    //   environment {
    //     set ANDROID_HOME=C:\Users\rishi\AppData\Local\Android\Sdk
    //     set NODEJS_HOME=C:\Program Files\nodejs
    //     set NPM_HOME=C:\Users\rishi\AppData\Roaming\npm
    //     set CI=true
    //     set PATH=C:\Windows\System32
    //     set PATH=C:\Program Files\Java\jdk1.8.0_281\bin
    //     set PATH=C:\Program Files\nodejs\node_modules\npm
    //     set PATH=C:\Users\rishi\AppData\Roaming\npm\node_modules
    //     set PATH=C:\Users\rishi\AppData\Local\Android\Sdk\build-tools\30.0.3
    //   }
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
