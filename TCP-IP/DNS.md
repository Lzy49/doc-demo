# DNS 是什么
DNS 是`应用层`的一个协议。它的唯一工作就是为其他协议做`域名转换IP地址`的服务。
## 什么是IP地址
IP地址相当于服务器的身份证号，通过IP地址可以找到服务器。
## 为什么不直接用IP地址而用域名呢
因为 IP 地址不容易被人记住。而直接将域名当作IP地址，计算机不好识别。
# DNS 是怎么查询 IP 地址的
DNS查询IP地址是迭代查询的过程。
1. 检查操作系统本地的hosts文件是否存在该域名映射，没有走下一步 
2. 查询本地DNS服务器缓存是否有该域名映射，没有走下一步
3. 通过 TCP/IP 协议与根DNS服务器联系，获得域名服务器IP地址。
4. 通过 TCP/IP 协议与域名服务器联系，获得域名IP地址。
简写为3种查询方式：
查本地 -无-> 查DNS缓存 -无-> 查存该域名IP地址的服务器地址 -> 查该域名IP地址