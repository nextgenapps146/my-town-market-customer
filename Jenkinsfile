pipeline {
  agent any
  stages {
    stage('Initialize') {
      parallel {
        stage('Git') {
          steps {
            bat 'git  \'https://github.com/nextgenapps146/my-town-market-customer.git\''
          }
        }

        stage('Tools') {
          steps {
            withNPM(npmrcConfig: 'npm install')
            tool(name: 'jdk1.9.0_281', type: 'C:\\Program Files\\Java\\jdk1.8.0_281')
          }
        }

        stage('Ionci Cordova') {
          steps {
            bat 'npm install -g ionic cordova'
          }
        }

      }
    }

    stage('Build') {
      steps {
        bat 'ionic cordova build ios --release\'
      }
    }

    stage('Signing Apk') {
      steps {
        signAndroidApks(androidHome: 'C:\\Users\\rishi\\AppData\\Local\\Android\\Sdk', apksToSign: 'my-town-market-customer', keyAlias: 'alias_name', keyStoreId: 'my-release-key.keystore', zipalignPath: 'C:\\Users\\rishi\\AppData\\Local\\Android\\Sdk\\build-tools\\30.0.3\\zipalign.exe')
      }
    }

  }
}
