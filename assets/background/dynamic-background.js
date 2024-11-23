 // dynamic-background.js

// 获取日出日落时间
function getSunriseSunset(lat, lon) {
  return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}`)
    .then(response => response.json())
    .then(data => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);
      return { sunrise, sunset };
    });
}

// 更换背景图片
function updateBackgroundImage(sunrise, sunset) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const nowTime = hours * 3600 + minutes * 60 + seconds;
  const sunriseTime = sunrise.getHours() * 3600 + sunrise.getMinutes() * 60 + sunrise.getSeconds();
  const sunsetTime = sunset.getHours() * 3600 + sunset.getMinutes() * 60 + sunset.getSeconds();

  let backgroundImage = '';
  let backgroundSize = '';
  let backgroundPosition = '';

  // 根据当前时间选择背景图片
  if (nowTime < sunriseTime) {
    backgroundImage = 'sunrise-before.jpg';
  } else if (nowTime < sunriseTime + 3600) {
    backgroundImage = 'sunrise.jpg';
  } else if (nowTime < sunriseTime + 3600 * 2) {
    backgroundImage = 'after-sunrise.jpg';
  } else if (nowTime < sunriseTime + 3600 * 6) {
    backgroundImage = 'morning.jpg';
  } else if (nowTime < sunriseTime + 3600 * 8) {
    backgroundImage = 'noon.jpg';
  } else if (nowTime < sunriseTime + 3600 * 13) {
    backgroundImage = 'afternoon.jpg';
  } else if (nowTime < sunsetTime - 3600 * 2) {
    backgroundImage = 'before-sunset.jpg';
  } else if (nowTime < sunsetTime) {
    backgroundImage = 'sunset.jpg';
  } else {
    backgroundImage = 'night.jpg';
  }

  // 检测媒体查询条件
  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  // 根据媒体查询条件设置背景图片样式
  if (isSmallScreen) {
    backgroundSize = 'contain';
  } else if (isLandscape) {
    backgroundSize = 'auto 100%';
  } else {
    backgroundSize = 'cover';
  }

  // 更换背景图片并设置样式
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = backgroundSize;
  document.body.style.backgroundPosition = backgroundPosition;
}

// 获取用户位置信息并更新背景图片
function initDynamicBackground() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getSunriseSunset(lat, lon).then(({ sunrise, sunset }) => {
        updateBackgroundImage(sunrise, sunset);
      });
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// 监听窗口尺寸变化，更新背景图片
window.addEventListener('resize', initDynamicBackground);

// 初始化动态背景
initDynamicBackground();

