/**
 * ============================================================================
 * 👑 BRYAN'S KSSM UNIVERSAL ENGINE (ULTIMATE VMAX - 600+ LINES EDITION) 👑
 * ============================================================================
 * * 📖 【使用说明书 - 目录】
 * * 🟢 1. 坐标与图表引擎 [GRAF] (grafData)
 * ----------------------------------------------------------------------------
 * ▶ 画布基础配置:
 * - background: "graph" (SPM绿格), "grid" (灰格), "white" (白纸) 【选填】
 * - type: "function" (默认) | "inverse" (自动生成反函数镜像图及 y=x 轴) 【选填】
 * - xMin, xMax, yMin, yMax, xStep, yStep: 坐标轴范围与刻度间隔 【选填】
 * ▶ 辅助线与标注:
 * - verticalTests: [x1, x2...] -> 红色垂直虚线 (垂直线测试) 【选填】
 * - verticalLabel: "名字" -> 在下方注释区显示的测试线名称 【选填】
 * - horizontalTests: [y1, y2...] -> 绿色水平虚线 (水平线测试) 【选填】
 * - horizontalLabel: "名字" -> 在下方注释区显示的测试线名称 【选填】
 * - intersectPoints: [[x,y]...] -> 红色交点标记 (自动在下方 Legend 说明) 【选填】
 * - intersectLabel: "名字" -> 交点在注释区的名字 【选填】
 * - mathLabels: [{ x, y, text, color }] -> 在真实的坐标点上贴 LaTeX 文字 【选填】
 * - markPoints: [{ x, y, label, color }] -> 智能散点标记点 【选填】
 * ▶ 线条配置 (lines: [{ ... }]):
 * - indVar: "x" (默认, y=f(x)) 或 indVar: "y" (x=f(y), 画 x=y^2 这种图形) 【必填一项】
 * - equation: "x**2" (支持 JS 算术符, sin, cos, tan, abs, PI, exp, sqrt) 【必填一项】
 * - points: [[x,y], [x,y]...] (手动坐标点绘制) 【必填一项】
 * - label: "线条名称" (显示在下方注释区) 【选填】
 * - mode: "continuous" (自动识别直/曲), "tangent" | "normal" (自动算微积分并画线),
 * "normal_dist" (正态分布), "step" (阶梯图), "ogive" (累积频数), "polygon" (涂黑区) 【选填】
 * - showEquation: true (针对 tangent/normal，自动在图上生成并贴出 y=mx+c 方程) 【选填】
 * - dashed: true (变虚线), fill: "origin" 或 "dataset:0" (区域涂黑) 【选填】
 * - tension: 0 (强制直线) | 0.4 (强制曲线) 【选填】
 * * 🔵 2. 几何与统计图形引擎 [SHAPE] (shapeData)
 * ----------------------------------------------------------------------------
 * ▶ 核心类型 (type):
 * - "geometry_angles": 线条与角度。parallel: 1 (平行箭头), isRightAngle: true (直角矩形)
 * - "regular_polygon": 自动正多边形。sides: 边数, r: 半径, showCenter: true (中心点)
 * - "vector": 向量箭头。lines: [{x1,y1, x2,y2}]
 * - "boxplot": 箱形图。min, q1, median, q3, max, minAxis, maxAxis
 * - "venn": 韦恩图。circles, shadedPaths: [{d: "SVG路径", fill: "颜色"}] (自定义涂黑)
 * - "locus": 轨迹。items: [{shape: "circle"|"line", x, y, r}], points: [...]
 * - "bearing": 方位角。x, y, angle (自动画北向 N 箭头和夹角线)
 * - "earth": 自动生成 3D 地球经纬球体 (赤道、地轴、南北极)
 * - "grid_transform": 变换网格。origin: {x,y}, shapes: [{points, isImage: true/false}]
 * - "tree": 概率树状图。branches: [{x1,y1,x2,y2, prob, label}]
 * - "stem_leaf": 茎叶图。stems: [], leaves: [[],[]], key: "说明"
 * - "dotplot": 点图。dots: [{val, count}], min, max, step
 * * 🟡 3. 表格引擎 [TABLE] (tableData)
 * ----------------------------------------------------------------------------
 * - rows: 数据数组 (每一行一个子数组) 【必填】
 * - direction: "horizontal" (横向, 适合函数表) | "vertical" (纵向, 默认) 【选填】
 * - headers: 表头数组 【选填】
 * - 💡 合并单元格: 单元格写为对象 { text: "文字", colspan: 2, bg: "颜色", align: "right" }
 * * 🟣 4. 映射引擎 [MAPPING] (mappingData)
 * ----------------------------------------------------------------------------
 * - type: "one-to-one" | "many-to-one" | "inverse" | "composite" 【选填】
 * - fLabel: "f", gLabel: "g" (自定义箭头上的标签，支持 LaTeX) 【选填】 🌟
 * - arrowColor: "#0050a0" (自定义所有箭头和标签的颜色) 【选填】 🌟
 * - links: [[0,0], [1,0]] (自定义连线, X索引 连去 Y索引) 【选填】
 * ============================================================================
 */

let currentPath = []; 
let currentLang = 'zh'; 

// ==========================================
// 1. 路由与导航系统 (Routing & Navigation)
// ==========================================
function pushState(state) { currentPath.push(state); updateBreadcrumb(); initSideBar(); }

function getDataFromState(state) {
    if (!window.SchoolSyllabus) return null;
    let d = window.SchoolSyllabus[state.i];
    if (!d) return null;
    if (state.type === 'subject') return d;
    d = d.units[state.ui];
    if (!d || state.type === 'unit') return d;
    d = d.sections[state.si];
    if (!d || state.type === 'section') return d;
    d = d.points[state.pi];
    if (!d || state.type === 'point') return d;
    return d.topics[state.ti];
}

function goBack() {
    if (currentPath.length <= 1) { goHome(); return; }
    currentPath.pop(); const prevState = currentPath.pop(); 
    if (!prevState) { goHome(); return; }
    if (prevState.type === 'subject') openSubject(prevState.i, true);
    else if (prevState.type === 'unit') openUnit(prevState.i, prevState.ui, true);
    else if (prevState.type === 'section') openSection(prevState.i, prevState.ui, prevState.si, true);
    else if (prevState.type === 'point') openPoint(prevState.i, prevState.ui, prevState.si, prevState.pi, true);
    else if (prevState.type === 'topic') openTopic(prevState.i, prevState.ui, prevState.si, prevState.pi, prevState.ti, true);
}

function goHome() { currentPath = []; renderHome(); initSideBar(); updateBreadcrumb(); }

function updateBreadcrumb() {
    const b = document.getElementById("pathDisplay");
    if (!b) return;
    if (currentPath.length === 0) { b.innerText = "Home"; return; }
    const langTag = currentLang === 'zh' ? "[ZH] " : "[MS] ";
    let pathNames = [];
    currentPath.forEach(state => {
        if (state.type !== 'topic') {
            let d = getDataFromState(state);
            if (d && d.name) pathNames.push(d.name);
        } else {
            let topicId = getDataFromState(state);
            let subject = window.SchoolSyllabus[state.i];
            let contentDB = currentLang === 'zh' ? subject.db_zh : subject.db_ms;
            if (contentDB && contentDB[topicId]) pathNames.push(contentDB[topicId].title);
        }
    });
    b.innerText = "Path: " + langTag + pathNames.join(" > ");
}

function initSideBar() {
    const nav = document.getElementById("sidebarNav");
    if (!nav || !window.SchoolSyllabus) return;
    let html = `<h3 style="color: var(--primary-color); text-align: center; margin-bottom: 20px;">Menu</h3>`;
    html += `<div class="sb-item" onclick="goHome(); closeSidebar();">🏠 Home</div>`;
    window.SchoolSyllabus.forEach((sub, i) => {
        html += `<div class="sb-subject-title" onclick="openSubject(${i}); closeSidebar();">${sub.name}</div>`;
        sub.units.forEach((unit, ui) => {
            html += `<div class="sb-item" style="padding-left: 20px;" onclick="openUnit(${i}, ${ui}); closeSidebar();">└ ${unit.name}</div>`;
        });
    });
    nav.innerHTML = html;
}

// ==========================================
// 2. 页面 UI 渲染引擎 (UI Component Rendering)
// ==========================================
function renderHome() {
    const app = document.getElementById("app");
    if(!app) return;
    let html = `<h1 style="text-align:center; margin-bottom:30px; color:var(--primary-color);">📚 Bryan's Classroom</h1><div class="grid">`;
    if(window.SchoolSyllabus) {
        window.SchoolSyllabus.forEach((sub, i) => {
            html += `<div class="card" onclick="openSubject(${i})"><h2 style="margin:0">${sub.name}</h2></div>`;
        });
    }
    app.innerHTML = html + `</div>`;
}

function openSubject(i, isBack = false) {
    if (!isBack) pushState({ type: "subject", i: i });
    document.getElementById("app").innerHTML = `
        <div style="text-align:center; padding: 50px 0;">
            <h2 style="margin-bottom:30px;">选择教学语言 / Select Language</h2>
            <div class="grid" style="max-width:600px; margin:0 auto;">
                <div class="card" onclick="setLanguage(${i}, 'zh')"><div style="font-size:20px; font-weight:bold;">Chinese (华文)</div></div>
                <div class="card" onclick="setLanguage(${i}, 'ms')"><div style="font-size:20px; font-weight:bold;">Malay (国文)</div></div>
            </div>
        </div>
    `;
}

function setLanguage(subjectIndex, lang) { currentLang = lang; updateBreadcrumb(); initSideBar(); renderUnits(subjectIndex); }

function renderUnits(i) {
    const subject = window.SchoolSyllabus[i];
    if(!subject) return;
    let html = `<h2>${subject.name}</h2><div class="grid">`;
    subject.units.forEach((unit, ui) => { html += `<div class="card" onclick="openUnit(${i},${ui})"><h3>${unit.name}</h3></div>`; });
    document.getElementById("app").innerHTML = html + `</div>`;
}

function openUnit(i, ui, isBack = false) {
    if (!isBack) pushState({ type: "unit", i, ui });
    const unit = window.SchoolSyllabus[i].units[ui];
    let html = `<h2>${unit.name}</h2><div class="grid">`;
    unit.sections.forEach((sec, si) => { html += `<div class="card" onclick="openSection(${i},${ui},${si})">${sec.name}</div>`; });
    document.getElementById("app").innerHTML = html + `</div>`;
}

function openSection(i, ui, si, isBack = false) {
    if (!isBack) pushState({ type: "section", i, ui, si });
    const sec = window.SchoolSyllabus[i].units[ui].sections[si];
    let html = `<h2>${sec.name}</h2><div class="grid">`;
    sec.points.forEach((pt, pi) => { html += `<div class="card" onclick="openPoint(${i},${ui},${si},${pi})">${pt.name}</div>`; });
    document.getElementById("app").innerHTML = html + `</div>`;
}

function openPoint(i, ui, si, pi, isBack = false) {
    if (!isBack) pushState({ type: "point", i, ui, si, pi });
    const pt = window.SchoolSyllabus[i].units[ui].sections[si].points[pi];
    let html = `<h2>${pt.name}</h2><div class="grid">`;
    pt.topics.forEach((topicId, ti) => {
        let subject = window.SchoolSyllabus[i];
        let contentDB = currentLang === 'zh' ? subject.db_zh : subject.db_ms;
        let title = (contentDB && contentDB[topicId]) ? contentDB[topicId].title : "Data Pending...";
        html += `<div class="card" onclick="openTopic(${i},${ui},${si},${pi},${ti})">${title}</div>`;
    });
    document.getElementById("app").innerHTML = html + `</div>`;
}

function openTopic(i, ui, si, pi, ti, isBack = false) {
    const topicId = window.SchoolSyllabus[i].units[ui].sections[si].points[pi].topics[ti];
    if (!isBack) pushState({ type: "topic", i, ui, si, pi, ti });
    let subject = window.SchoolSyllabus[i];
    let contentDB = currentLang === 'zh' ? subject.db_zh : subject.db_ms;
    const topicData = contentDB[topicId] || { title: "Error", quiz: "No Data found." };

    let content = topicData.quiz || "";
    const versionLabel = currentLang === 'zh' ? '华文版' : 'Malay Version';

    content = content.replace(/\[GRAF(\d+)\]/g, (m, id) => `<div style="width:100%; max-width:550px; height:420px; margin: 30px auto; position:relative;"><canvas id="graf_canvas_${id}"></canvas></div>`);
    content = content.replace(/\[MAPPING(\d+)\]/g, (m, id) => `<div style="width:100%; overflow-x:auto; padding: 10px 0;"><div id="mapping_container_${id}" style="position:relative; width:550px; height:280px; margin:0 auto; background:white; border-radius:15px; border:1px solid #e2e8f0;"></div></div>`);
    content = content.replace(/\[TABLE(\d+)\]/g, (m, id) => `<div id="table_container_${id}"></div>`);
    content = content.replace(/\[SHAPE(\d+)\]/g, (m, id) => `<div id="shape_container_${id}" style="width:100%; max-width:400px; margin:20px auto; position:relative;"></div>`);

    document.getElementById("app").innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 15px; border: var(--glass-border);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h1 style="color:var(--primary-color);">${topicData.title}</h1>
            <span style="background:var(--primary-color); color:white; padding:4px 12px; border-radius:20px; font-size:12px;">${versionLabel}</span>
        </div>
        <hr style="opacity:0.1; margin:20px 0;">
        <div class="content-body" style="font-size:17px; line-height:1.8;">${content}</div>
    </div>`;
    
    Object.keys(topicData).forEach(key => {
        if (key.startsWith('grafData')) drawRealGraph(`graf_canvas_${key.replace('grafData','')}`, topicData[key]);
        if (key.startsWith('mappingData')) drawMapping(`mapping_container_${key.replace('mappingData','')}`, topicData[key]);
        if (key.startsWith('tableData')) drawTable(`table_container_${key.replace('tableData','')}`, topicData[key]);
        if (key.startsWith('shapeData')) drawShape(`shape_container_${key.replace('shapeData','')}`, topicData[key]);
    });
    if (window.MathJax) MathJax.typesetPromise();
}

// ==========================================
// 3. 终极表格引擎 [TABLE] (合并单元格优化版)
// ==========================================
function drawTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container || !data) return;
    let html = `<div style="overflow-x:auto; margin: 20px 0;"><table style="width:100%; border-collapse: collapse; text-align:center; min-width: 400px; border: 2px solid #0050a0; background: white;">`;
    
    const renderCell = (cell, isHeader = false, defaultBg = "") => {
        let tag = isHeader ? "th" : "td";
        let style = `padding:12px; border: 1px solid #cbd5e1; ${defaultBg}`;
        if (typeof cell === 'object' && cell !== null) {
            let colSp = cell.colspan ? ` colspan="${cell.colspan}"` : "";
            let rowSp = cell.rowspan ? ` rowspan="${cell.rowspan}"` : "";
            if (cell.bg) style += ` background:${cell.bg};`;
            if (cell.color) style += ` color:${cell.color};`;
            if (cell.align) style += ` text-align:${cell.align};`;
            if (cell.bold) style += ` font-weight:bold;`;
            return `<${tag} style="${style}"${colSp}${rowSp}>${cell.text || ""}</${tag}>`;
        }
        return `<${tag} style="${style}">${cell !== undefined ? cell : ""}</${tag}>`;
    };

    if (data.direction === "horizontal") {
        data.rows.forEach((row, rIdx) => {
            let bg = rIdx === 0 ? "background: rgba(0, 80, 160, 0.1); font-weight:bold; color: #0050a0;" : "";
            html += `<tr>`;
            row.forEach((cell, cIdx) => html += renderCell(cell, rIdx === 0 || cIdx === 0, cIdx === 0 ? "background:rgba(0,80,160,0.1);font-weight:bold;" : bg));
            html += `</tr>`;
        });
    } else {
        if (data.headers) {
            html += `<tr style="background: rgba(0, 80, 160, 0.1); color: #0050a0; font-weight:bold;">`;
            data.headers.forEach(h => html += renderCell(h, true));
            html += `</tr>`;
        }
        data.rows.forEach((row, rIdx) => {
            html += `<tr style="${rIdx % 2 === 0 ? 'background:#fff' : 'background:#f8fafc'}">`;
            row.forEach(cell => html += renderCell(cell));
            html += `</tr>`;
        });
    }
    container.innerHTML = html + `</table></div>${data.caption ? `<div style="text-align:center; font-size:13px; color:#64748b; margin-top:5px; font-weight:bold;">${data.caption}</div>` : ''}`;
}

// ==========================================
// 4. 终极映射引擎 [MAPPING] (复合/箭头标注自定义版) 🌟 更新
// ==========================================
function drawMapping(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container || !data) return;
    
    // 🌟 自定义参数：箭头颜色、标签 f 和 g
    const arrowColor = data.arrowColor || "#0050a0";
    const fLabel = data.fLabel || "f";
    const gLabel = data.gLabel || "g";
    
    const arrowId = `arrow_${containerId}`; const arrowRevId = `arrow_rev_${containerId}`; 
    let svgHTML = `<svg width="550" height="280" style="position:absolute; top:0; left:0; pointer-events:none; z-index:1;"><defs><marker id="${arrowId}" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="${arrowColor}" /></marker><marker id="${arrowRevId}" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#e63946" /></marker></defs>`;
    const ovalWidth = 90; const ovalHeight = 160; const centerY = 130; 
    
    const createSetHTML = (label, items, cx) => {
        let itemsHTML = (items||[]).map((item, idx) => {
            let yPos = items.length === 1 ? (ovalHeight/2) : (ovalHeight / (items.length + 1)) * (idx + 1);
            return `<div style="position:absolute; top:${yPos}px; left:50%; transform:translate(-50%, -50%); text-align:center; width:100%; font-weight:500;">${item}</div>`;
        }).join('');
        return `<div style="position:absolute; left:${cx}px; top:${centerY}px; width:${ovalWidth}px; height:${ovalHeight}px; border:2px solid #0050a0; border-radius:50%; transform:translate(-50%, -50%); background:rgba(0,80,160,0.03); z-index:2;"><div style="position:absolute; bottom:-35px; width:100%; text-align:center; font-weight:bold; color:#0050a0;">${label}</div>${itemsHTML}</div>`;
    };
    
    let html = "";
    if (data.type === "composite") {
        const cxX = 90, cxY = 275, cxZ = 460;
        html += createSetHTML(data.xLabel || 'Set X', data.x||[], cxX) + createSetHTML(data.yLabel || 'Set Y', data.y||[], cxY) + createSetHTML(data.zLabel || 'Set Z', data.z||[], cxZ);
        
        // 顶部跨越曲线 (gf)
        svgHTML += `<path d="M ${cxX} 60 Q ${cxY} -10 ${cxZ - 5} 60" fill="transparent" stroke="${arrowColor}" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#${arrowId})"/>`;
        html += `<div style="position:absolute; left:${cxY}px; top:-5px; transform:translateX(-50%); font-weight:bold; color:${arrowColor}; z-index:5;">\\(${data.curveLabel || 'gf'}\\)</div>`;
        
        // 🌟 第一个箭头 + 自定义标注 fLabel
        svgHTML += `<line x1="${cxX + 45}" y1="${centerY}" x2="${cxY - 50}" y2="${centerY}" stroke="${arrowColor}" stroke-width="2" marker-end="url(#${arrowId})" />`;
        html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY - 35}px; transform:translateX(-50%); font-weight:bold; color:${arrowColor};">\\(${fLabel}\\)</div>`;
        
        // 🌟 第二个箭头 + 自定义标注 gLabel
        svgHTML += `<line x1="${cxY + 45}" y1="${centerY}" x2="${cxZ - 50}" y2="${centerY}" stroke="${arrowColor}" stroke-width="2" marker-end="url(#${arrowId})" />`;
        html += `<div style="position:absolute; left:${(cxY+cxZ)/2}px; top:${centerY - 35}px; transform:translateX(-50%); font-weight:bold; color:${arrowColor};">\\(${gLabel}\\)</div>`;
        
    } else {
        const cxX = 160, cxY = 390; let xD = data.x||[]; let yD = data.y||[];
        html += createSetHTML(data.xLabel || 'Set X', xD, cxX) + createSetHTML(data.yLabel || 'Set Y', yD, cxY);
        
        if (data.links) {
            data.links.forEach(l => {
                let sY = centerY - (ovalHeight/2) + (xD.length === 1 ? (ovalHeight/2) : (ovalHeight / (xD.length + 1)) * (l[0] + 1));
                let eY = centerY - (ovalHeight/2) + (yD.length === 1 ? (ovalHeight/2) : (ovalHeight / (yD.length + 1)) * (l[1] + 1));
                svgHTML += `<line x1="${cxX + 45}" y1="${sY}" x2="${cxY - 50}" y2="${eY}" stroke="${arrowColor}" stroke-width="2" marker-end="url(#${arrowId})" />`;
            });
        } else {
            xD.forEach((item, i) => {
                let sY = centerY - (ovalHeight/2) + (xD.length === 1 ? (ovalHeight/2) : (ovalHeight / (xD.length + 1)) * (i + 1));
                let targetIdx = data.type === "many-to-one" ? 0 : Math.min(i, yD.length - 1);
                let eY = centerY - (ovalHeight/2) + (yD.length === 1 ? (ovalHeight/2) : (ovalHeight / (yD.length + 1)) * (targetIdx + 1));
                svgHTML += `<line x1="${cxX + 45}" y1="${sY}" x2="${cxY - 50}" y2="${eY}" stroke="${arrowColor}" stroke-width="2" marker-end="url(#${arrowId})" />`;
            });
        }
        
        // 🌟 普通映射标注
        html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY - 35}px; transform:translateX(-50%); font-weight:bold; color:${arrowColor};">\\(${fLabel}\\)</div>`;

        if (data.type === "inverse") {
            svgHTML += `<line x1="${cxY - 45}" y1="${centerY + 20}" x2="${cxX + 50}" y2="${centerY + 20}" stroke="#e63946" stroke-width="2" marker-end="url(#${arrowRevId})" />`;
            html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY + 28}px; transform:translateX(-50%); font-weight:bold; color:#e63946;">\\(f^{-1}\\)</div>`;
        }
    }
    container.innerHTML = svgHTML + `</svg>` + html + (data.caption ? `<div style="position:absolute; bottom:5px; width:100%; text-align:center; font-size:12px; color:#64748b; font-weight:bold;">${data.caption}</div>` : '');
}

// ==========================================
// 5. 终极几何图形引擎 [SHAPE] (F1-F5 全功能版)
// ==========================================
function drawShape(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container || !data) return;
    const w = data.width || 350; const h = data.height || 300;
    
    // 背景处理
    let bg = data.background === "graph" ? `<rect width="100%" height="100%" fill="#f0fff4"/><defs><pattern id="sg_${containerId}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,150,80,0.15)" stroke-width="0.5"/></pattern><pattern id="g_${containerId}" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="url(#sg_${containerId})"/><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,150,80,0.4)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#g_${containerId})"/>` : (data.background === "grid" ? `<defs><pattern id="gg_${containerId}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#gg_${containerId})"/>` : `<rect width="100%" height="100%" fill="white"/>`);

    let svg = `<svg viewBox="0 0 ${w} ${h}" style="width:100%; border:1px solid #ddd; border-radius:8px;">${bg}<defs><marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#0050a0" /></marker></defs>`;

    if (data.type === "polygon" || data.type === "triangle") {
        svg += `<polygon points="${data.points}" fill="rgba(0,80,160,0.1)" stroke="#0050a0" stroke-width="2"/>`;
    } else if (data.type === "regular_polygon") {
        let pts = []; for(let i=0; i<data.sides; i++) { let a = (i * 2 * Math.PI / data.sides) - (Math.PI/2); pts.push(`${w/2 + data.r*Math.cos(a)},${h/2 + data.r*Math.sin(a)}`); }
        svg += `<polygon points="${pts.join(' ')}" fill="rgba(0,80,160,0.1)" stroke="#0050a0" stroke-width="2"/>`;
        if (data.showCenter) svg += `<circle cx="${w/2}" cy="${h/2}" r="3" fill="red"/>`;
    } else if (data.type === "boxplot") {
        let pad = 40; let rX = w - pad*2; let minA = data.minAxis||0; let maxA = data.maxAxis||10; let s = rX/(maxA - minA || 1);
        let xM = pad + (data.min-minA)*s; let xQ1 = pad + (data.q1-minA)*s; let xMed = pad + (data.median-minA)*s; let xQ3 = pad + (data.q3-minA)*s; let xMax = pad + (data.max-minA)*s;
        svg += `<line x1="${pad}" y1="${h-40}" x2="${w-pad}" y2="${h-40}" stroke="#1e293b" stroke-width="2"/><rect x="${xQ1}" y="${h/2-20}" width="${xQ3-xQ1}" height="40" fill="rgba(0,80,160,0.1)" stroke="#0050a0" stroke-width="2"/><line x1="${xM}" y1="${h/2}" x2="${xQ1}" y2="${h/2}" stroke="#0050a0"/><line x1="${xQ3}" y1="${h/2}" x2="${xMax}" y2="${h/2}" stroke="#0050a0"/><line x1="${xMed}" y1="${h/2-20}" x2="${xMed}" y2="${h/2+20}" stroke="red" stroke-width="2"/>`;
    } else if (data.type === "bearing") {
        let sx = data.x||w/2; let sy = data.y||h/2;
        svg += `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy-60}" stroke="#000" stroke-width="2" marker-end="url(#arr)"/><text x="${sx-5}" y="${sy-65}" font-weight="bold">N</text>`;
        let r = (data.angle-90)*Math.PI/180; svg += `<line x1="${sx}" y1="${sy}" x2="${sx+80*Math.cos(r)}" y2="${sy+80*Math.sin(r)}" stroke="blue" stroke-width="2" marker-end="url(#arr)"/>`;
    } else if (data.type === "earth") {
        let cx = w/2, cy = h/2, r = 80;
        svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1e293b" stroke-width="2"/><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="25" fill="none" stroke="#94a3b8" stroke-dasharray="4,4"/><line x1="${cx}" y1="${cy-r-10}" x2="${cx}" y2="${cy+r+10}" stroke="#1e293b" stroke-dasharray="5,2"/><text x="${cx}" y="${cy-r-15}" text-anchor="middle">N</text><text x="${cx}" y="${cy+r+25}" text-anchor="middle">S</text>`;
    } else if (data.type === "geometry_angles") {
        if(data.lines) data.lines.forEach(l => {
            svg += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="#1e293b" stroke-width="2"/>`;
            if (l.parallel) {
                let mx = (l.x1+l.x2)/2; let my = (l.y1+l.y2)/2; let ang = Math.atan2(l.y2-l.y1, l.x2-l.x1)*180/Math.PI;
                svg += `<polygon points="0,-5 10,0 0,5" fill="red" transform="translate(${mx},${my}) rotate(${ang})"/>`;
            }
        });
        if(data.arcs) data.arcs.forEach(a => {
            if (a.isRightAngle) {
                let rad1 = a.startAngle * Math.PI/180; let rad2 = a.endAngle * Math.PI/180;
                let p1 = {x: a.x + 15*Math.cos(rad1), y: a.y + 15*Math.sin(rad1)};
                let p2 = {x: a.x + 15*Math.cos(rad2), y: a.y + 15*Math.sin(rad2)};
                let p3 = {x: p1.x + 15*Math.cos(rad2), y: p1.y + 15*Math.sin(rad2)};
                svg += `<polyline points="${p1.x},${p1.y} ${p3.x},${p3.y} ${p2.x},${p2.y}" fill="none" stroke="red" stroke-width="1.5"/>`;
            }
        });
    }
    
    let labelHTML = "";
    if (data.htmlLabels) data.htmlLabels.forEach(l => labelHTML += `<div style="position:absolute; left:${l.x}%; top:${l.y}%; transform:translate(-50%,-50%); color:${l.color||'#000'}; font-size:${l.size||'15px'}; pointer-events:none; font-weight:bold;">${l.text}</div>`);
    container.innerHTML = svg + `</svg>` + labelHTML + (data.caption ? `<div style="text-align:center; font-size:12px; color:#64748b; font-weight:bold; margin-top:5px;">${data.caption}</div>` : '');
}

// ==========================================
// 终极坐标图引擎 [GRAF] (原生 Legend + 自定义自变量版)
// ==========================================
function drawRealGraph(canvasId, grafData) {
    const canvas = document.getElementById(canvasId); 
    if (!canvas || !grafData) return;
    const ctx = canvas.getContext('2d');
    
    let existingChart = Chart.getChart(ctx); 
    if (existingChart) existingChart.destroy();

    const datasets = [];
    canvas.style.backgroundColor = grafData.background === "graph" ? "#f0fff4" : (grafData.background === "grid" ? "#f8fafc" : "#fff");

    const minX = grafData.xMin !== undefined ? grafData.xMin : -10; 
    const maxX = grafData.xMax !== undefined ? grafData.xMax : 10;
    const minY = grafData.yMin !== undefined ? grafData.yMin : -10; 
    const maxY = grafData.yMax !== undefined ? grafData.yMax : 10;

    let lines = grafData.lines || [];
    if (grafData.equation || grafData.points) {
        lines.push({ 
            label: grafData.graphLabel, 
            equation: grafData.equation, 
            points: grafData.points, 
            color: grafData.color, 
            mode: grafData.mode, 
            indVar: grafData.indVar 
        });
    }

    lines.forEach((line, idx) => {
        let pts = [];
        let independent = line.indVar || "x"; 
        
        if (line.mode === 'tangent' || line.mode === 'normal') {
            try {
                let eq = (line.equation||"").replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/x\^2/g,'Math.pow(x,2)');
                let f = new Function('x', `return ${eq}`); 
                let x0 = line.atX||0; let y1 = f(x0); let h = 0.0001;
                let mt = (f(x0+h)-f(x0-h))/(2*h); 
                let m = line.mode === 'tangent' ? mt : (Math.abs(mt) < 0.0001 ? 10000 : -1/mt);
                for(let x=minX; x<=maxX; x+=(maxX-minX)/50) pts.push({x: x, y: m*(x-x0)+y1});
                if(line.showEquation) {
                    let c = y1 - m*x0; 
                    let eqT = `y = ${m.toFixed(2)}x ${c>=0?'+':'-'} ${Math.abs(c).toFixed(2)}`;
                    grafData.mathLabels = grafData.mathLabels || []; 
                    grafData.mathLabels.push({x: x0+1.2, y: m*1.2+y1+0.5, text: `\\(${eqT}\\)`, color: line.color || 'red'});
                }
            } catch(e) {}
        }
        else if (line.equation) {
            let fS = line.equation.replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/x\^2/g,'Math.pow(x,2)').replace(/y\^2/g,'Math.pow(y,2)');
            if (independent === "y") { 
                let f = new Function('y', `return ${fS}`);
                for(let y=minY; y<=maxY; y+=(maxY-minY)/150) { 
                    let rx = f(y); if(!isNaN(rx)) pts.push({x: rx, y: y}); 
                }
            } else { 
                let f = new Function('x', `return ${fS}`);
                for(let x=minX; x<=maxX; x+=(maxX-minX)/150) { 
                    let ry = f(x); if(!isNaN(ry)) pts.push({x: x, y: ry}); 
                }
            }
        } 
        else if (line.points) { 
            pts = Array.isArray(line.points[0]) ? line.points.map(p => ({x: p[0], y: p[1]})) : line.points; 
        }

        let tension = (line.tension !== undefined) ? line.tension : 0.4;
        if (pts.length >= 3 && line.tension === undefined) {
            let isS = true; let dx0 = pts[1].x-pts[0].x; let dy0 = pts[1].y-pts[0].y;
            for(let k=2; k<pts.length; k++) {
                if(Math.abs(dx0*(pts[k].y-pts[k-1].y)-dy0*(pts[k].x-pts[k-1].x))>0.0001) { isS=false; break; }
            }
            if(isS) tension = 0;
        }

        datasets.push({
            label: line.label || `Garis ${idx+1}`, 
            data: pts,
            borderColor: line.color || '#0050a0', 
            borderWidth: 2, 
            tension: tension,
            borderDash: line.dashed ? [5,5] : [], 
            pointRadius: line.pointRadius || 0,
            fill: line.fill === 'origin' ? 'origin' : (typeof line.fill === 'string' && line.fill.startsWith('dataset') ? parseInt(line.fill.split(':')[1]) : false),
            pointStyle: 'line'
        });
    });

    if (grafData.verticalTests) {
        grafData.verticalTests.forEach((x, i) => {
            datasets.push({ 
                label: i===0 ? (grafData.verticalLabel || "Ujian Mencancang") : "__HIDDEN__", 
                data: [{x:x, y:minY-50},{x:x, y:maxY+50}], 
                borderColor: 'red', borderDash: [5,5], pointRadius: 0, pointStyle: 'rectRot' 
            });
        });
    }
    if (grafData.horizontalTests) {
        grafData.horizontalTests.forEach((y, i) => {
            datasets.push({ 
                label: i===0 ? (grafData.horizontalLabel || "Ujian Mengufuk") : "__HIDDEN__", 
                data: [{x:minX-50, y:y},{x:maxX+50, y:y}], 
                borderColor: 'green', borderDash: [5,5], pointRadius: 0, pointStyle: 'rectRot' 
            });
        });
    }
    if (grafData.intersectPoints) {
        datasets.push({ 
            label: grafData.intersectLabel || "Titik Persilangan", 
            data: grafData.intersectPoints.map(p=>({x:p[0], y:p[1]})), 
            backgroundColor: 'red', pointRadius: 7, showLine: false, type: 'scatter', pointStyle: 'circle' 
        });
    }

    new Chart(ctx, {
        type: 'line', 
        data: { datasets: datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { 
                legend: { 
                    display: true, 
                    position: 'bottom', 
                    labels: { 
                        usePointStyle: true, 
                        filter: (item) => item.text !== "__HIDDEN__" && item.text !== null 
                    } 
                }, 
                title: { display: !!grafData.caption, text: grafData.caption, font: {size: 14} } 
            },
            scales: {
                x: { type: 'linear', position: 'center', min: minX, max: maxX, ticks: { stepSize: grafData.xStep || 1 }, grid: {color: 'rgba(0,0,0,0.05)'} },
                y: { type: 'linear', position: 'center', min: minY, max: maxY, ticks: { stepSize: grafData.yStep || 1 }, grid: {color: 'rgba(0,0,0,0.05)'} }
            }
        }
    });

    const wrap = canvas.parentElement; wrap.style.position = 'relative';
    if (grafData.mathLabels) {
        setTimeout(() => {
            let h = ""; let chart = Chart.getChart(ctx);
            grafData.mathLabels.forEach(l => {
                let px = chart.scales.x.getPixelForValue(l.x); 
                let py = chart.scales.y.getPixelForValue(l.y);
                h += `<div style="position:absolute; left:${px}px; top:${py}px; transform:translate(-50%,-50%); color:${l.color||'#0050a0'}; font-size:15px; pointer-events:none; font-weight:bold; white-space:nowrap; text-shadow: 1px 1px 2px white;">${l.text}</div>`;
            });
            const d = document.createElement('div'); d.innerHTML = h; wrap.appendChild(d);
            if (window.MathJax) MathJax.typesetPromise([wrap]);
        }, 200);
    }
}


window.addEventListener('DOMContentLoaded', () => { goHome(); });
