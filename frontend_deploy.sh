npm run build
aws s3 sync dist/ s3://socialstock-frontend --acl public-read
aws cloudfront create-invalidation \
    --distribution-id E2MLVIYSA3M0G2 \
    --paths "/*"