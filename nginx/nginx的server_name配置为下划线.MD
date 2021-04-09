#nginx会解析http header里的host 找到匹配的server_name 如果没有则用默认的或者第一个

相当于默认配置：
server {
    listen 80;
    server_name _;
    return 404;
}

server {
    listen 80;
    server_name www.hello.com;
}

当用ip访问的时候 没有匹配的server 则会匹配到第一个server，返回404

