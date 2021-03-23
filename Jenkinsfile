pipeline {
   agent any
   
environment {
  ANDROID_HOME = "C:/Users/rishi/AppData/Local/Android/Sdk"
  NODEJS_HOME = "C:/Program Files/nodejs"
  NPM_HOME = "C:/Users/rishi/AppData/Roaming/npm"
   = ""
}

//  environment {
//         set ANDROID_HOME=C:/Users/rishi/AppData/Local/Android/Sdk
//         set NODEJS_HOME=C:/Program Files/nodejs
//         set NPM_HOME=C:/Users/rishi/AppData/Roaming/npm
//         set CI=true
//         CI=true
//         set PATH=C:/Windows/System32
//         set PATH=C:/Program Files\Java\jdk1.8.0_281\bin
//         set PATH=C:/Program Files/nodejs/node_modules/npm
//         set PATH=C:/Users/rishi/AppData/Roaming/npm/node_modules
//         set PATH=C:/Users/rishi/AppData/Local/Android/Sdk/build-tools/30.0.3
//       }
     
   stages {
      stage('NPM Setup') {
      steps {
          git  'https://github.com/nextgenapps146/my-town-market-customer.git'
         bat 'npm install'
      }
   }
     stage('ionic') {
      steps {
         bat 'npm install ionic cordova'
      }
   }

//    stage('IOS Build') {
//    steps {
//       bat 'ionic cordova build ios --release'
//      } 
//   }

   stage('Android Build') {
   steps {
     bat 'cordova build android --release'
   }
  }

   stage('APK Sign') {
   steps {
      bat 'jarsigner -storepass october -keystore keys/my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk MyTownMarket'
   }
   }

//    stage('Stage Web Build') {
//       steps {
//         bat 'npm run build --prod'
//     }
//   }

//    stage('Publibat Firebase Web') {
//       steps {
//       bat 'firebase deploy --token "Your Token Key"'
//    }
//   }

//    stage('Publibat iOS') {
//       steps {
//        echo "Publibat iOS Action"
//     }
//    }

//    stage('Publibat Android') {
//      steps {
//     echo "Publibat Android API Action"
//    }
//   }

 }
}