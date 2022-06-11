# 客户端与服务器数据通讯全流程  

```
用户发送数据结构 =>   Json协议数据编码  => 服务号|命令号  =>  加密数据包 
                   --------------
                   Buf 协议数据编码
                
=>   Websocket封包   =>  网络发送   =>  网络接收  =>   Websocket 解包
     -----------                                    ------------
     TCP封包                                        TCP 解包

=> 解密数据包 =>
    
=>   服务号|命令号 | 数据body   =>   数据解码           => 获取数据结构
                                 
                             =>   Buf 协议数据解码
```

- 不同编程语言的数据对象 => 序列化 => 二进制化 (protoBuf协议, 或变种)  | 文本化:(数据对象 => json数据文本, xml数据文本)  
- 会在序列化数据以后, 打上标识:[服务号(2个字节), 命令号(2个字节)] 
> 只有有了标识 => 是用哪种方式去对待这个数据;
> 为什么需要两个标识: 需要做, 网关 => 命令 => 对应的服务器上; => 这个服务器根据服务号,命令号,识别是哪个请求;
> 封包? 
>> 因为TCP是可靠传送协议, 发一个数据包过去 => 回应 => 再发下一个数据包;
>> TCP底层: 等更多的数据一起发过去, "blake"  "bycw"  => "blakeycw" 粘包问题;
>> TCP 会处理 => 分包拆包 [size, 数据内容, 校验];
>> H5 简化这个东西 => Websocket协议 => 分包拆包协议;  
> WebSocket是什么?
>> 底层基于TCP的, 实现了TCP封包,拆包问题的一种协议;  
>> 连接协议, 关闭协议, 发送数据的协议, 接受数据的协议;

- TCP + 自定义封包拆包协议 + protobuf序列化工具; 
- [WebSocket] + protobuf 系列化工具; Creator H5, android, iOS websocket => native实现; 服务器也要支持 Websocket;  

# 


