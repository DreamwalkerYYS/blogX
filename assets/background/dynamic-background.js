// 使用ipapi获取地理位置信息
function getGeoInfoByIP() {
    fetch('http://ip-api.com/json/')
        .then(response => response.json())
        .then(data => {
            const lat = data.latitude;
            const lng = data.longitude;
            // 使用经纬度更新背景图片
            updateBackgroundImage(lat, lng);
        })
        .catch(error => console.error('Error fetching IP info:', error));
}

// 根据经纬度和当前时间更换背景图片
function updateBackgroundImage(lat, lng) {
    const now = new Date();
    const times = SunCalc.getTimes(now, lat, lng);
    const sunPos = SunCalc.getPosition(now, lat, lng);
    const altitude = sunPos.altitude; // 太阳高度角

    let backgroundImage = '';

    if (now >= times.sunrise && now < times.sunriseEnd) {
        // 日出时
        backgroundImage = 'https://img.picgo.net/2024/12/01/sunrisefbdd02496de6fa9a.jpg';
    } else if (now >= times.sunriseEnd && now < times.goldenHourEnd) {
        // 日出后
        backgroundImage = 'https://img.picgo.net/2024/12/01/after-sunrise0fb492a6a59d7ea8.jpg';
    } else if (now >= times.goldenHourEnd && now < times.solarNoon) {
        // 上午
        backgroundImage = 'https://img.picgo.net/2024/12/01/morning71674465f59c76f6.jpg';
    } else if (now >= times.solarNoon && now < times.goldenHour) {
        // 中午
        backgroundImage = 'https://img.picgo.net/2024/12/01/noon880c74aa051d9e47.jpg';
    } else if (now >= times.goldenHour && now < times.sunsetStart) {
        // 下午
        backgroundImage = 'https://img.picgo.net/2024/12/01/afternoon1d1f7cff61d492d1.jpg';
    } else if (now >= times.sunsetStart && now < times.sunset) {
        // 日落前
        backgroundImage = 'https://img.picgo.net/2024/12/01/before-sunsete9cc02e165511cf7.jpg';
    } else if (now >= times.sunset && now < times.dusk) {
        // 日落时
        backgroundImage = 'https://img.picgo.net/2024/12/01/sunsetd2b9acbb51df672a.jpg';
    } else {
        // 夜晚
        backgroundImage = 'https://img.picgo.net/2024/12/01/nightc09ff382af818c7a.jpg';
    }

    // 更换背景图片
    document.body.style.backgroundImage = `url(${backgroundImage})`;
}

// 初始化背景图片
getGeoInfoByIP();

// 可以设置定时器，定时更新背景图片
setInterval(() => {
    getGeoInfoByIP(); // 重新获取地理位置信息，并更新背景图片
}, 1000 * 60 * 5); // 每5分钟更新一次




