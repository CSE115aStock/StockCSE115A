VERSION=`date '+%Y%m%d_%H%M'`;

zip -r dist/ss_`date +%Y%m%d_%H%M`.zip .ebextensions/ .flaskenv application.py portfolio.py twitter.py recomend.py requirements.txt social.py user_auth.py wsgi.py
aws s3 sync dist/ s3://socialstock-backend --acl public-read
aws elasticbeanstalk create-application-version --application-name social-stock-analyzer --version-label $VERSION --source-bundle S3Bucket="socialstock-backend",S3Key="ss_`date +%Y%m%d_%H%M`.zip"
aws elasticbeanstalk update-environment --application-name social-stock-analyzer --environment-name Socialstockanalyzer-env --version-label $VERSION
