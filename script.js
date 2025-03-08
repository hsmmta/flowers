function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const flap = document.querySelector('.flap');
    
    // 添加信封打开动画
    flap.style.animation = 'openFlap 0.8s forwards';
    envelope.style.transform = 'scale(0.9) rotate(5deg)';
    envelope.style.transition = 'all 0.3s ease-in-out';
    
    // 0.3秒后显示信件
    setTimeout(() => {
        envelope.style.display = 'none';
        letter.classList.add('show');
        
        // 添加花瓣飘落效果（增加花瓣数量并优化动画）
        createPetals();
        
        // 添加背景音乐
        const audio = new Audio('heartbeat.mp3');
        audio.play().catch(() => { /* 自动播放被阻止时的处理 */ });
    }, 300);
}

function createPetals() {
    const container = document.querySelector('.envelope-container');
    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        container.appendChild(petal);
        
        // 随机初始位置
        const startX = Math.random() * 100;
        const startY = Math.random() * 50;
        
        // 动画参数
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 1;
        const rotation = Math.random() * 360;
        
        petal.style.cssText = `
            left: ${startX}%;
            top: ${startY}%;
            animation: fall-${i} ${duration}s ${delay}s linear infinite;
            transform: rotate(${rotation}deg);
        `;
        
        // 动态创建飘落动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall-${i} {
                0% {
                    transform: translate(0, 0) rotate(${rotation}deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, 100vh) rotate(${rotation + 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 移动端点击事件处理（优化触摸响应）
document.querySelector('.envelope').addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.classList.add('active');
    openEnvelope();
});

// 添加触摸结束样式重置
document.querySelector('.envelope').addEventListener('touchend', function() {
    this.classList.remove('active');
});
