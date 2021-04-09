#需要配置具体处理请求的真实IP地址

upstream music {
    server 192.168.0.48:9080;  #这个IP地址是通过宿主机cmd命令查询的宿主机IP地址  这里不能配置localhost或者127.0.0.1，因为配置了只是代表具体的容器的自己，宿主机不能接收请求
}

location /api-pc {
    add_header Access-Control-Allow-Origin *;  //只允许的域名
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS; //只允许的方法
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    #上边配置的upstream，由那个服务进行处理
    proxy_pass http://music;
    access_log /var/log/nginx/www.v.com_access.log;     #配置此location攔截日誌
    error_log  /var/log/nginx/www.v.com_error.log debug;
}