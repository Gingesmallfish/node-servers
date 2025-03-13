const svgCaptcha = require('svg-captcha');

const getCaptcha = () => {
    let captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 验证码干扰线数量
        color: true,
        width: 150, // 增大宽度
        height: 50,
        background: '#f0f0f0', // 设置背景颜色

    });
    return {
        text: captcha.text.toLowerCase(),  // 将验证码文本转为小写
        data: captcha.data,
    };
}

module.exports = {
    getCaptcha,
}
