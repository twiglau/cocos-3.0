# 游戏框架 - 消息机制
|- | 消息中心 | -|
|--|--|--|
|- UI -|- NPC -|- Enemy -|
|刷新血量, 技能面板, 属性面板, 背包| 铁匠Npc,防具Npc,路人Npc | 狼, 僵尸 |  

## 所需类  
MessageCenter  Mananger -> ComponentBase -> cc.component  

## Message 需要三种类型  
1. UI/NPC/Enemy 三个大类型  
2. 大类型下的小类型: 如NPC 下, 铁匠, 防具, 路人 三种类型  
3. 消息的具体内容: content


# 有限状态机  
|   -     |     主角     |    -     |
|---------|-------------|-----------|
| 站立     |    跑步     |    攻击    |   


# 三个状态 - 需要一个父类  FSMState  
# FSMManager 需要管理状态  