FROM centos:7

COPY . /home/docker/app

ENV NODEJS_VERSION=v8.4.0
ENV PATH=/apps/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin

RUN yum -y install make gcc gcc-c++ && yum -y clean all
RUN yum -y install git unzip zlib1g-dev libpq-dev
RUN mkdir /apps && cd /apps && curl -s -L -O https://nodejs.org/dist/${NODEJS_VERSION}/node-${NODEJS_VERSION}-linux-x64.tar.xz && tar xf node-${NODEJS_VERSION}-linux-x64.tar.xz && mv node-${NODEJS_VERSION}-linux-x64 node

EXPOSE 3333