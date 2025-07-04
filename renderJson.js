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
