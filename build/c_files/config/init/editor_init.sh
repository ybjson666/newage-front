#!/bin/bash
# ROOT 配置修改文件

##################begin 配置区#####################
# 记录日志
DIR=/config/init
# 配置文件
CONFIG_FILE1=/etc/nginx/conf.d/cimFront.conf
##################end 配置区#######################


function CONFIG_FILE1_exsit()
{
env | grep "EDITOR_WEB_CFG_EDITOR_URL" || export EDITOR_WEB_CFG_EDITOR_URL="needtoset"
    sed -i "s#EDITOR_WEB_CFG_EDITOR_URL#$EDITOR_WEB_CFG_EDITOR_URL#g" $CONFIG_FILE1
    echo "EDITOR_WEB_CFG_EDITOR_URL replace $EDITOR_WEB_CFG_EDITOR_URL -> $CONFIG_FILE1" >> $DIR/change.log
}


############begin 执行#################
# 判断文件是否存在
ls $CONFIG_FILE1 >/dev/null 2>&1 && CONFIG_FILE1_exsit || echo "$CONFIG_FILE1 不存在" >> $DIR/change.log
