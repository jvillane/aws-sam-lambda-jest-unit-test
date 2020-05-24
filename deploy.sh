#!/bin/bash

: "${STACK_NAME:=$1}"
: "${S3_BUCKET:=$2}"

if [[ -z ${STACK_NAME} ]] ; then
  echo "No stackname was provided."
  echo "Use: sh deploy.sh <STACK_NAME> <S3_BUCKET>"
  exit 2
fi

if [[ -z ${S3_BUCKET} ]] ; then
  echo "No s3 bucket was provided."
  echo "Use: sh deploy.sh <STACK_NAME> <S3_BUCKET>"
  exit 2
fi

FILENAME=$(echo $RANDOM.${STACK_NAME} | openssl dgst -sha1 | sed 's/^.* //')
S3_SWAGGER="s3://$S3_BUCKET/$STACK_NAME/$FILENAME"

aws s3 cp openapi.yaml ${S3_SWAGGER} --sse

echo '...cleaning distribution folder'
rm -rf dist && mkdir dist

echo '...building production source code node_modules'
rm -rf node_modules && npm install && tsc

sam package --output-template-file packaged.yaml --template-file cloudformation.yaml --s3-bucket ${S3_BUCKET}
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name ${STACK_NAME} \
  --parameter-overrides SwaggerS3File=${S3_SWAGGER}

exit 0
