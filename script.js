document.addEventListener('DOMContentLoaded', () => {
    // --- 自定义光标逻辑 ---
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const body = document.body;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 实时光标位置
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // 每一帧更新跟随者位置，实现平滑感
    const animateCursor = () => {
        // 经典的平滑插值公式：当前位置 + (目标位置 - 当前位置) * 平滑系数
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // 交互元素反馈
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            body.classList.remove('cursor-hover');
        });
    });

    // 文字内容反馈（可选）
    const textElements = document.querySelectorAll('p, h1, h2, h3');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // 这里可以添加针对文字的特殊光标样式
        });
    });

    // --- 原有滚动展示动画 ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // 初始调用
    revealOnScroll();
    
    // 监听滚动
    window.addEventListener('scroll', revealOnScroll);

    // 2. 导航栏平滑背景切换
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
        }
    });

    // 3. 技能标签轻微位移反馈 (增强 JS 交互感)
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mousemove', (e) => {
            const rect = tag.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / 10;
            const deltaY = (y - centerY) / 10;
            
            tag.style.transform = `translate(${deltaX}px, ${deltaY}px) translateY(-5px)`;
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translate(0, 0) translateY(0)';
        });
    });

    // 5. 微信弹窗逻辑
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatModal = document.getElementById('wechatModal');
    const closeModal = document.querySelector('.close-modal');

    wechatBtn.addEventListener('click', () => {
        wechatModal.style.display = 'flex';
        // 强制重绘以触发动画
        wechatModal.offsetHeight; 
        wechatModal.classList.add('active');
    });

    const hideModal = () => {
        wechatModal.classList.remove('active');
        setTimeout(() => {
            wechatModal.style.display = 'none';
        }, 500); // 等待动画结束
    };

    closeModal.addEventListener('click', hideModal);
    
    // 点击弹窗外部关闭
    wechatModal.addEventListener('click', (e) => {
        if (e.target === wechatModal) {
            hideModal();
        }
    });

    // 为关闭按钮和弹窗内元素添加光标交互
    [closeModal, wechatBtn].forEach(el => {
        el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });
});
