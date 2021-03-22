pipeline {
   agent any
      environment {
         PATH='C:\Program Files\nodejs\node_modules\npm\bin'
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
