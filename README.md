# 维护角色权限关系

1. 权限需要能够展示给非开发人员查看（客户、产品）
2. 权限需要一份中心文件，前后端的权限控制都来源于该文件

基于以上两点，我认为用 Excel 作为权限中心文件是比较合适的。
所以本项目就是将 Excel 的数据转化为前后端需要的权限文件。


### 使用方法
1. node app {Excel 文件绝对路径}
2. Excel 中 Sheet 名必须为 Permissions
3. Excel 具体使用方案，参见 Excel 范例