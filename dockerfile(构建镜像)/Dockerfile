#基于哪个镜像构建
FROM java:8

#说明镜像创作者信息
MAINTAINER alex <jiahangSocket@163.com>

#COPY指令和ADD指令的唯一区别在于是否支持从远程URL获取资源。COPY指令只能从执行docker build所在的主机上读取资源并复制到镜像中。而ADD指令还支持通过URL从远程服务器读取资源并复制到镜像中。
#满足同等功能的情况下，推荐使用COPY指令。ADD指令更擅长读取本地tar文件并解压缩。
ADD ./target/AsiaCloudFlatService-0.1.3.jar /home/springboot/springboot-dockerfile.jar

#解決容器內時間和宿主機不一致問題（容器內默认是UTC的0时区，如果不指定容器内时间会和宿主机相差8个小时）
RUN echo "Asia/Shanghai" > /etc/timezone;

#暴露容器的哪个端口
EXPOSE 9080

#启动命令
CMD ["java","-jar","/home/springboot/springboot-dockerfile.jar"]




#在当前目录运行build指令构建镜像
# -f 指定Dockerfile位置
# --tag, -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。
# 命令最后的点表示当前目录执行
# docker build -f ./Dockerfile -t asiacloud:v1 .


#运行该镜像
#docker的网络模式：
#   bridge模式： Docker的默认设置
#   host模式
#   none模式
#   container模式：
#    因此就不会拥有自己独立的IP，而是共享指定容器的IP172.17.0.2,
#    端口范围等网络资源，两个容器的进程通过lo网卡设备通信。
#    但这两个容器在其他的资源上，如文件系统、进程列表等还是隔离的。

#   overlay模式:
#    容器在两个跨主机进行通信的时候，是使用overlay network这个网络模式进行通信，
#    如果使用host也可以实现跨主机进行通信，直接使用这个物理的ip地址就可以进行通信。
#    overlay它会虚拟出一个网络比如10.0.9.3这个ip地址，在这个overlay网络模式里面，
#    有一个类似于服务网关的地址，然后把这个包转发到物理服务器这个地址，最终通过路由和交换，到达另一个服务器的ip地址。

#   --net=host 注意一定要使用host网络连接方式，否则项目会连接不上mysql，导致项目起不来。
# docker run -dp 9080:9080 --name asiacloud -v /h/volumes/springboot/logs:/log asiacloud:v1
