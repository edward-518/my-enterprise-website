# 上海聚建网络科技有限公司官网

该项目为上海聚建网络科技有限公司的企业官网，采用响应式科技风设计，涵盖品牌介绍、服务能力、合作案例及联系方式等完整内容模块。

## 📁 目录结构

```
.
├── index.html                 # 官网首页（四屏布局）
├── contact.html               # 联系我们页面
├── about/
│   ├── brands.html            # 合作品牌展示
│   ├── cases.html             # 战略合作伙伴
│   └── qualifications.html    # 资质认证
├── services/
│   ├── customerservice.html   # 客户服务能力
│   ├── design.html            # UPD设计服务
│   ├── development.html       # 技术开发服务
│   └── warehouse.html         # 仓储物流服务
├── css/
│   └── styles.css             # 主样式文件
├── js/
│   └── main.js                # 交互脚本
└── images/                    # 图片资源占位目录
```

## ✨ 功能亮点

- **四屏首页体验**：包含英雄区、关于我们、服务能力、联系我们四大模块，配合玻璃拟态与动效展示。
- **多页面支持**：服务能力、关于我们等页面提供更详尽的业务介绍与案例内容。
- **交互增强**：滚动揭示动画、数字自增、移动端导航折叠、邮箱复制等增强体验的交互。
- **响应式设计**：针对桌面与移动端进行优化，使用CSS Grid与Flexbox实现自适应布局。

## 🚀 本地预览

使用任意静态服务器即可预览，例如Python自带的HTTP服务器：

```bash
python3 -m http.server 8000
```

启动后访问 `http://localhost:8000` 即可查看网站效果。

## 🛠️ 技术栈

- **HTML5 + CSS3**：语义化结构与现代样式，包括`backdrop-filter`玻璃质感。
- **JavaScript**：Intersection Observer实现滚动动画，数据计数器，移动端导航与邮箱复制交互。
- **Web Fonts**：使用 Manrope 字体增强科技感与可读性。

## 📄 版权信息

- 公司名称：上海聚建网络科技有限公司
- 地址：上海市杨浦区密云路1018号703-704室
- 电话：021-55800598
- 邮箱：hr@cgather.com
- 官网域名：www.cgather.com

如需进一步自定义或拓展功能，可在现有基础上继续开发。
