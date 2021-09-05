#! /usr/bin/env bash

aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 920036772581.dkr.ecr.us-east-2.amazonaws.com
docker build -t igti-repository .
docker tag igti-repository:latest 920036772581.dkr.ecr.us-east-2.amazonaws.com/igti-repository:latest
docker push 920036772581.dkr.ecr.us-east-2.amazonaws.com/igti-repository:latest