FROM registry-vpc.cn-beijing.aliyuncs.com/cmc/centos-nginx:1.7.0

MAINTAINER wjtester@sobey.com

ADD code /sobey/cimFront
ADD code/build/c_files/ /

RUN \
	rm -rf  /etc/nginx/conf.d/status.conf && \
	chmod 777 /config/init/*

