let stopSprite; // 儲存停止動畫的精靈圖。
let walkSprite; // 儲存行走動畫的精靈圖。
let attackSprite; // 儲存攻擊動畫的精靈圖。
let characterX; // 儲存角色目前的水平位置。
let characterY; // 儲存角色目前的垂直位置。
let facing = 1; // 設定角色初始面向右方。
const stopFrameCount = 2; // 設定停止動畫的影格數量。
const walkFrameCount = 6; // 設定行走動畫的影格數量。
const attackFrameCount = 6; // 設定攻擊動畫的影格數量。
const frameHeight = 32; // 設定每個精靈影格的高度。
const moveSpeed = 3; // 設定角色每幀的移動速度。

function preload() { // 在畫布啟動前載入角色圖片。
  stopSprite = loadImage('1/stop/stop.png'); // 載入停止動畫精靈圖。
  walkSprite = loadImage('1/walk/walk.png'); // 載入行走動畫精靈圖。
  attackSprite = loadImage('1/attack/attack.png'); // 載入攻擊動畫精靈圖。
} // 結束圖片載入函式。

function setup() { // 初始化全螢幕畫布與角色位置。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  characterX = width / 2; // 將角色水平位置設在畫布中央。
  characterY = height / 2; // 將角色垂直位置設在畫布中央。
  imageMode(CORNER); // 使用圖片左上角作為繪圖座標。
  noSmooth(); // 保持像素精靈圖的邊緣清晰。
} // 結束初始化函式。

function draw() { // 每幀更新角色狀態並繪製畫面。
  background('#a8dadc'); // 使用指定的淺藍綠色清除畫布。
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否正按住。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否正按住。
  const isAttacking = mouseIsPressed && mouseButton === LEFT; // 檢查滑鼠左鍵是否正按住。
  const isWalking = movingRight !== movingLeft; // 只有單一方向鍵按下時才進入行走狀態。

  if (movingRight && !movingLeft) { // 判斷角色是否只往右移動。
    characterX += moveSpeed; // 將角色向右移動指定速度。
    facing = 1; // 設定角色面向右方。
  } // 結束向右移動判斷。
  if (movingLeft && !movingRight) { // 判斷角色是否只往左移動。
    characterX -= moveSpeed; // 將角色向左移動指定速度。
    facing = -1; // 設定角色面向左方。
  } // 結束向左移動判斷。

  const sprite = isAttacking ? attackSprite : isWalking ? walkSprite : stopSprite; // 依攻擊、行走或停止狀態選擇精靈圖。
  const frameCount = isAttacking ? attackFrameCount : isWalking ? walkFrameCount : stopFrameCount; // 依角色狀態選擇對應動畫影格數。
  const frameWidth = sprite.width / frameCount; // 以精靈圖總寬度平均計算單格寬度。
  const animationFrame = floor(millis() / 120) % frameCount; // 每 120 毫秒切換影格並循環播放。

  characterX = constrain(characterX, frameWidth / 2, max(frameWidth / 2, width - frameWidth / 2)); // 將角色限制在畫布可視範圍內。
  push(); // 暫存畫布的座標與縮放狀態。
  translate(characterX, characterY); // 將繪圖原點移至角色位置。
  scale(facing, 1); // 依面向方向翻轉角色圖片。
  image(sprite, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight, animationFrame * frameWidth, 0, frameWidth, frameHeight); // 繪製目前動畫影格。
  pop(); // 還原畫布的座標與縮放狀態。
} // 結束每幀繪製函式。

function windowResized() { // 視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗尺寸。
} // 結束視窗尺寸變更函式。
