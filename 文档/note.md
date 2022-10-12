### 知识产权从业人员信息化管理系统

#### 功能设置参考可以有：
1、基本信息
企业信息录入（单位名称、地址、联系人、联系电话）
个人信息录入（姓名、性别、学历、专业、职位、职称等）；
2、工作履历（填写履历保存）；
3、继续教育（参加的在职各类培训记录保存）；
4、经典案例（录入做过的经典案例信息，比如：案例名称，年份，所属业务类型专利/商标/版权，案例基本情况简介，问题争议点、方案解决）；
5、信息检索（设置一个检索栏，关键词，所属业务类型专利/商标/版权，自动检索出相关同类型信息）
6、在线互动沟通（根据以上的信息检索可以进行互动交流）。

#### 修改部分：
登录：版权所有

基本信息：备注换做个人简介

信息检索：增加工作年限，点击查看。

在线互动：增加搜索栏，搜索出来的图标需要展示姓名、工作年限、个人简介。

先就这样我觉得可以了，接下来处理下说明书和源代码，其中写说明书的过程中，功能模块里面的内容需要重新处理下。

基本信息：单位名称随便编写：比如北京一二三知识产权代理有限公司、上海科勒知识产权代理有限公司；电话也随便编写成11位；

工作履历：单位名称随便编写：比如北京一二三知识产权代理有限公司、上海科勒知识产权代理有限公司；职位名称为：知识产权顾问、知识产权经理、知识产权合伙人、专利工程师等；

继续教育：1；机构：中国版权保护中心--培训内容：版权经纪人业务培训班2；机构：中国知识产权培训中心--培训内容：专利检索；其他的随便写培训内容必须和专利、版权、商标相关即可；

信息检索：单位名称和电话如上。

在线互动沟通：个人简介需要稍微写多一点，比如：毕业于重庆工商大学，从事知识产权申报多年，具有丰富的行业经验，熟悉知识产权行业管理体系以及发展前沿趋势，曾服务于美国客座教授、挪威兼职教授、大专院校科研教学工作者、医院专职专家、企业项目咨询申报等。擅长知识产权事务办理、高新技术企业、政府项目申报及同行相关业务咨询。欢迎您的来访，期待与您的合作！

这个模板的首页界面XXX版权所有删除

源代码你看着办吧，不一定只要3000行，反正说明书体现的界面都需要源代码体现出来


---
参考地址：
https://www.25175.net/systems/zscqgz.html

参考项目：
https://github.com/HongjianguoWebDevelopmentGroup/hongjianguoOffice

参考图片：
https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%B7%A5%E4%BD%9C%E7%BB%8F%E5%8E%86%E8%A1%A8%E5%8D%95&step_word=&hs=0&pn=8&spn=0&di=7117150749552803841&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3667699525%2C1639848959&os=859873507%2C3917603261&simid=3667699525%2C1639848959&adpicid=0&lpn=0&ln=1386&fr=&fmq=1664365706121_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fpic.ruiwen.com%2Fallimg%2F201603%2F3930-1603301QQ62J.png%26refer%3Dhttp%3A%2F%2Fpic.ruiwen.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1666961890%26t%3D760f2dd00d61a07ca560a7f4f93ceb61&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B67tojg_z%26e3Bv54AzdH3F3twgstAzdH3F3twgstxtwzwtAzdH3F3twgstktw52jxtwzwtAzdH3Fmadcac_z%26e3Bip4s&gsm=900000000000009&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCw1LDEsNiw0LDMsNyw4LDIsOQ%3D%3D

打包文件时：将dist和release清除干净，否则会将dist的剩余文件打包到exe文件中electron-builder.json5中的files配置如此