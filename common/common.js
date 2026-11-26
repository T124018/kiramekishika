// ヘッダーnavを読み込む
const commonScript = document.currentScript;
const header = document.getElementById('header');

if (commonScript && header) {
    fetch(new URL('../common/nav.html', commonScript.src))
    .then(response => {
        if (!response.ok) {
            throw new Error(`ヘッダーの読み込みに失敗しました: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        header.innerHTML = data;
        const nav = header.querySelector('#navArea');
        const button = header.querySelector('.toggle-btn');

        if (nav && button) {
            button.addEventListener('click', () => {
                nav.classList.toggle('open');
                const isOpen = nav.classList.contains('open');
                button.setAttribute('aria-expanded', String(isOpen));
                button.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
            });
        }
    })
    .catch(error => {
        console.error(error);
    });            
}

if (commonScript) {
    const loadFooter = () => {
        const footerUrl = new URL('footer.html', commonScript.src);
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = new URL('footer.css', commonScript.src).href;
        document.head.appendChild(stylesheet);

        fetch(footerUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`フッターの読み込みに失敗しました: ${response.status}`);
                }
                return response.text();
            })
            .then(markup => {
                const template = document.createElement('template');
                template.innerHTML = markup;
                const footer = template.content.querySelector('.site-footer');

                if (!footer) {
                    throw new Error('共通フッターが見つかりません。');
                }

                footer.querySelectorAll('img[src]').forEach(image => {
                    image.src = new URL(image.getAttribute('src'), footerUrl).href;
                });

                const footerPlaceholder = document.getElementById('footer');
                if (footerPlaceholder) {
                    footerPlaceholder.replaceWith(footer);
                } else {
                    document.body.appendChild(footer);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter, { once: true });
    } else {
        loadFooter();
    }
}
