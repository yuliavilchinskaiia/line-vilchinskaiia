export function createCustomCanvas(options) {
    const { 
        lineWidth = 5, 
        strokeColor = "#6BA160", 
        maxLineLength = 40, 
        blendMode = "normal" 
    } = options;

    if ('ontouchstart' in window) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const points = [];

    // Canvas initialization
    function initializeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "9999";
        canvas.style.pointerEvents = "none";
        canvas.style.mixBlendMode = blendMode;
        document.body.appendChild(canvas);
    }

    // Adjust canvas on window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    initializeCanvas();

    // Draw lines
    function drawLines() {
        if (points.length < 2) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.lineJoin = "round";

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
    }

    // Add points and animate
    function trackMouse(event) {
        const { clientX: x, clientY: y } = event;
        points.push({ x, y });

        if (points.length > maxLineLength) {
            points.shift();
        }

        drawLines();
    }

    document.addEventListener("mousemove", trackMouse);
}
