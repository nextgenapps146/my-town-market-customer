pipeline {
   agent any
// tools {
//     jdk 'jdk1.8.0_281',
//     NodeJs 'Node'
//     Gradle 'Gradle'
// }
     
   stages {
      stage('NPM Setup') {
      steps {
         
          git  'https://github.com/nextgenapps146/my-town-market-customer.git'
          nodejs(Node){
         bat 'npm install'
          }
      }
   }
     stage('ionic') {
      steps {
          nodejs(Node){
              echo 'Ionic'
         bat 'npm install -g ionic cordova'
          }
      }
   }

//    stage('IOS Build') {
//    steps {
//       bat 'ionic cordova build ios --release'
//      } 
//   }

   stage('Android Build') {
   steps {
       JDK(jdk){
     bat 'ionic cordova build android --release'
       }
   }
  }

   stage('APK Sign') {
   steps {
      bat 'jarsigner -storepass october2017 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name'
   }
   }

//    stage('Stage Web Build') {
//       steps {
//         bat 'npm run build --prod'
//     }
//   }

//    stage('Publish Firebase Web') {
//       steps {
//       bat 'firebase deploy --token "Your Token Key"'
//    }
//   }

//    stage('Publish iOS') {
//       steps {
//        echo "Publish iOS Action"
//     }
//    }

//    stage('Publibat Android') {
//      steps {
//     echo "Publibat Android API Action"
//    }
//   }

 }
}