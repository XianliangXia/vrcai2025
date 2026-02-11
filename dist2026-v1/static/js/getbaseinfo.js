document.addEventListener('DOMContentLoaded', function () {
    loadHeader()
    loadFooter()
    loadSharedContent()
});


/**
 * 加载公共页脚
 */

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');

    if (!footerContainer) {
        console.warn('未找到页脚容器元素 (#footer-container)');
        return;
    }

    // 加载footer.html文件
    fetch('footerTemp.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`加载页脚失败: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // 插入页脚内容
            footerContainer.innerHTML = html;

            // 页脚加载完成后，可以执行其他初始化操作
        })
        .catch(error => {
            console.error('加载页脚失败:', error);

        });

}

function loadHeader() {

    const headerContainer = document.getElementById('header-container');

    if (!headerContainer) {
        console.warn('未找到页脚容器元素 (#header-container)');
        return;
    }

    // 加载footer.html文件
    fetch('headerTemp.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`加载页脚失败: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // 插入页脚内容
            headerContainer.innerHTML = html;

            // 页脚加载完成后，可以执行其他初始化操作

        })
        .catch(error => {
            console.error('加载页脚失败:', error);
            reject(error)
        });

}

function loadSharedContent() {
    fetch('baseContent.json')
        .then(response => {
            if (!response.ok) throw new Error('加载共享内容失败');
            return response.json();
        })
        .then(data => {
            // 获取所有需要替换内容的元素
            const elements = document.querySelectorAll('[data-content]');

            const regs = document.querySelectorAll('.register');
            // 遍历所有元素并进行内容替换
            elements.forEach(element => {
                const contentKey = element.getAttribute('data-content');

                // 检查JSON中是否有对应的内容
                if (data[contentKey] !== undefined) {
                    // 直接替换元素的文本内容
                    element.textContent = data[contentKey];
                } else {
                    console.warn(`未找到内容键: ${contentKey}`);
                }
            })
            regs.forEach(reg => {


                if (reg && data['register']) {
                    // 将href属性赋值为data[register]的值
                    reg.setAttribute('href', data['register']);
                    console.log(`为元素设置href: ${data['register']}`);
                } else {
                    reg.setAttribute('href', '#');
                }
            });


        })

}