export function setScale() {
  function scaleHandler() {
    const designWidth = 1920;
    const designHeight = 1080;
    const wRatio = window.innerWidth / designWidth;
    const hRatio = window.innerHeight / designHeight;

    // 取较小值，保证内容完整显示
    const ratio = Math.min(wRatio, hRatio);

    const container = document.getElementById("app");
    container.style.width = designWidth + "px";
    container.style.height = designHeight + "px";
    container.style.transform = `scale(${ratio})`;
    container.style.transformOrigin = "left top";

    // 居中处理
    const marginLeft = (window.innerWidth - designWidth * ratio) / 2;
    const marginTop = (window.innerHeight - designHeight * ratio) / 2;
    container.style.marginLeft = marginLeft + "px";
    container.style.marginTop = marginTop + "px";
  }

  window.addEventListener("resize", scaleHandler);
}
