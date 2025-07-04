
![XiangJsonCraft Logo](https://picsum.photos/seed/xiangjsoncraft/200/200)

# XiangJsonCraft 官方文档

XiangJsonCraft 是一个简单而强大的 JSON 配置与 HTML 页面渲染工具，专为前端开发者设计。通过简洁的 API，它允许你使用 JSON 配置文件来定义样式和内容，并将其应用到 HTML 页面中，实现动态页面的快速构建。

## 特性

- **简单易用**：只需几行代码即可完成页面渲染
- **灵活配置**：通过 JSON 文件定义样式和内容
- **轻量级**：无额外依赖，体积小巧

## 安装

```bash
npm install xiangjsoncraft
```

## 快速开始

### 1. 创建 JSON 配置文件

首先，创建一个 JSON 配置文件 `config.json`，定义页面的样式和内容：

```json
{
    "styles": {
        "body": {
            "margin": "0",
            "padding": "0",
            "boxSizing": "border-box"
        },
        "header": {
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "padding": "10px",
            "backgroundColor": "azure"
        },
        "headerP": {
            "color": "black",
            "fontSize": "16px"
        }
    },
    "content": {
        "headerText": "Dynamic Header Text"
    }
}
```

### 2. 创建 HTML 页面

然后，创建一个 HTML 页面 `index.html`，引入 JavaScript 文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style id="style-block"></style> 
</head>
<body>
    <header>
        <p id="header-text"></p>
    </header>
    <!-- 引入外部 JavaScript 文件 -->
    <script type="module">
        import { renderJson } from './renderJson.js';
        renderJson();
    </script>
</body>
</html>
```

### 3. 编写渲染函数

在 `renderJson.js` 中编写渲染函数：

```javascript
// 定义 replaceCamelCase 方法
String.prototype.replaceCamelCase = function (separator = '-') {
    return this.replace(/[A-Z]/g, function (match) {
        return separator + match.toLowerCase();
    });
};

// 封装 JSON 渲染函数
function renderJson() {
    // 使用 fetch API 获取 JSON 文件
    fetch('./config.json')
        .then(response => {
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error('网络响应失败');
            }
            // 将响应转换为 JSON 格式
            return response.json();
        })
        .then(config => {
            // 动态创建样式表
            const styleBlock = document.getElementById('style-block');
            styleBlock.innerHTML = `
                * { ${Object.entries(config.styles.body).map(([key, value]) => `${key}: ${value};`).join(' ')} }
                header { ${Object.entries(config.styles.header).map(([key, value]) => `${key.replaceCamelCase()}: ${value};`).join(' ')} }
                header p { ${Object.entries(config.styles.headerP).map(([key, value]) => `${key}: ${value};`).join(' ')} }
            `;

            // 动态设置内容
            document.getElementById('header-text').innerText = config.content.headerText;
        })
        .catch(error => {
            console.error('获取 JSON 文件时出错:', error);
        });
}

// 导出渲染函数
export { renderJson };
```

### 4. 运行项目

在浏览器中打开 `index.html` 文件，即可看到渲染后的页面。

## API 文档

### `renderJson()`

从 `config.json` 文件中读取样式和内容配置，并将其应用到 HTML 页面中。

#### 示例

```javascript
import { renderJson } from './renderJson.js';
renderJson();
```

## 贡献指南

我们欢迎任何人贡献代码或提出建议。如果你想参与开发，请遵循以下步骤：

1. 克隆仓库：`git clone https://github.com/dxiang-wiki/xiangjsoncraft.git`
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交代码：`git commit -m "Add your feature"`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## 许可证

MIT License

Copyright (c) 2025 xiang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 联系我们

如果你有任何问题或建议，请通过以下方式联系我们：

- GitHub Issues: https://github.com/dxiang-wiki/xiangjsoncraft/issues
- Email: 3631247406@qq.com

感谢使用 XiangJsonCraft！
