# xiangjsoncraft
这是npm包xiangjsoncraft的开源仓库（官方文档）

### XiangJsonCraft - 轻量级JSON配置与模板渲染工具

![XiangJsonCraft Logo](https://picsum.photos/seed/xiangjsoncraft/200/200)

# XiangJsonCraft

XiangJsonCraft是一个简单而强大的JSON配置与HTML模板渲染工具，专为前端开发者设计。通过简洁的API，它允许你使用JSON配置文件来定义样式和内容，并将其应用到HTML模板中，实现动态页面的快速构建。

## 特性

- **简单易用**：只需几行代码即可完成模板渲染
- **灵活配置**：通过JSON文件定义样式和内容
- **轻量级**：无额外依赖，体积小巧
- **高效渲染**：支持批量处理和动态更新
- **类型安全**：提供完整的TypeScript类型定义

## 安装

```bash
npm install xiangjsoncraft
```

## 快速开始

### 1. 创建JSON配置文件

首先，创建一个JSON配置文件，定义页面的样式和内容：

```json
// config.json
{
    "styles": {
        "body": {
            "margin": "0",
            "padding": "0",
            "fontFamily": "Arial, sans-serif"
        },
        "header": {
            "backgroundColor": "#3498db",
            "color": "white",
            "padding": "20px",
            "textAlign": "center"
        },
        "content": {
            "maxWidth": "800px",
            "margin": "0 auto",
            "padding": "20px"
        }
    },
    "content": {
        "title": "欢迎使用XiangJsonCraft",
        "subtitle": "简单高效的JSON配置与模板渲染工具",
        "paragraph": "XiangJsonCraft让你可以通过JSON配置文件轻松定义页面样式和内容，无需编写复杂的CSS和JavaScript代码。"
    }
}
```

### 2. 创建HTML模板

然后，创建一个HTML模板文件，使用占位符来表示动态内容：

```html
<!-- template.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style id="dynamic-styles"></style>
</head>
<body>
    <header class="header">
        <h1>{{title}}</h1>
        <p>{{subtitle}}</p>
    </header>
    <div class="content">
        <p>{{paragraph}}</p>
    </div>
</body>
</html>
```

### 3. 使用XiangJsonCraft渲染模板

最后，在JavaScript代码中使用XiangJsonCraft来渲染模板：

```javascript
const { renderTemplate } = require('xiangjsoncraft');
const fs = require('fs');
const path = require('path');

// 读取配置文件和模板文件
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

// 渲染模板
const renderedHtml = renderTemplate(template, config);

// 输出渲染结果
console.log(renderedHtml);

// 保存渲染结果到文件
fs.writeFileSync(path.join(__dirname, 'output.html'), renderedHtml);
```

## API文档

### `renderTemplate(template: string, config: Config): string`

将HTML模板和JSON配置文件渲染为最终的HTML字符串。

#### 参数

- `template`: 字符串，HTML模板内容
- `config`: 对象，包含样式和内容配置

#### 返回值

- 字符串，渲染后的HTML内容

#### 示例

```javascript
const renderedHtml = renderTemplate('<div class="container">{{title}}</div>', {
    styles: {
        container: {
            backgroundColor: 'lightblue',
            padding: '10px'
        }
    },
    content: {
        title: 'Hello, XiangJsonCraft!'
    }
});

console.log(renderedHtml);
// 输出: <div class="container" style="background-color: lightblue; padding: 10px;">Hello, XiangJsonCraft!</div>
```

### 配置文件格式

配置文件是一个JSON对象，包含两个主要属性：

#### `styles`

定义CSS样式的对象，每个键对应一个HTML元素的类名或ID，值是CSS属性的键值对。

```json
{
    "styles": {
        "myClass": {
            "color": "red",
            "fontSize": "16px"
        },
        "#myId": {
            "backgroundColor": "blue",
            "width": "100px"
        }
    }
}
```

#### `content`

定义动态内容的对象，键对应HTML模板中的占位符（如`{{title}}`），值是要替换的内容。

```json
{
    "content": {
        "title": "页面标题",
        "description": "这是一个描述文本"
    }
}
```

## 高级用法

### 批量处理多个模板

你可以使用XiangJsonCraft批量处理多个模板文件：

```javascript
const { renderTemplate } = require('xiangjsoncraft');
const fs = require('fs');
const path = require('path');

// 读取配置文件
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));

// 读取模板目录中的所有文件
const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'output');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 读取所有模板文件并渲染
fs.readdirSync(templatesDir).forEach(file => {
    if (file.endsWith('.html')) {
        const templatePath = path.join(templatesDir, file);
        const template = fs.readFileSync(templatePath, 'utf8');
        
        // 渲染模板
        const renderedHtml = renderTemplate(template, config);
        
        // 保存渲染结果
        const outputPath = path.join(outputDir, file);
        fs.writeFileSync(outputPath, renderedHtml);
        
        console.log(`已渲染并保存: ${file}`);
    }
});
```

### 在浏览器中使用

XiangJsonCraft也可以在浏览器环境中使用：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>浏览器中使用XiangJsonCraft</title>
    <script src="https://cdn.jsdelivr.net/npm/xiangjsoncraft/dist/xiangjsoncraft.min.js"></script>
</head>
<body>
    <div id="app"></div>
    
    <script>
        // 定义配置
        const config = {
            styles: {
                app: {
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                },
                title: {
                    color: '#3498db',
                    textAlign: 'center'
                }
            },
            content: {
                title: '欢迎使用XiangJsonCraft',
                message: '这是在浏览器中使用XiangJsonCraft的示例。'
            }
        };
        
        // 定义模板
        const template = `
            <div class="app">
                <h1 class="title">{{title}}</h1>
                <p>{{message}}</p>
            </div>
        `;
        
        // 渲染模板
        const renderedHtml = XiangJsonCraft.renderTemplate(template, config);
        
        // 将渲染结果插入到DOM中
        document.getElementById('app').innerHTML = renderedHtml;
    </script>
</body>
</html>
```

## 贡献指南

我们欢迎任何人贡献代码或提出建议。如果你想参与开发，请遵循以下步骤：

1. 克隆仓库：`git clone https://github.com/yourusername/xiangjsoncraft.git`
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交代码：`git commit -m "Add your feature"`
4. 推送分支：`git push origin feature/your-feature`
5. 创建Pull Request

## 许可证

MIT License

Copyright (c) 2023 xiang

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

- GitHub Issues: https://github.com/yourusername/xiangjsoncraft/issues
- Email: xiang@example.com

感谢使用XiangJsonCraft！
