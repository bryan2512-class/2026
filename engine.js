/**
 * ============================================
 * ENGINE JS - Bryan's Universal Engine (Modular Edition)
 * ============================================
 * * 👑 【系统使用说明书：图表 [TYPE] 种类大全】 👑
 * * 当你在数据包 (如 f4_addmath_zh.js) 里写内容时，可以通过标签呼叫以下四大绘图引擎：
 * * 1. 坐标系曲线图引擎： [GRAF1], [GRAF2] ...对应 grafData1, grafData2
 * ▶ type: "function" (普通函数图)
 * - 选填：testLines: [2] -> 会在 X=2 画一条红色的垂直虚线（垂直线测试）。
 * - 选填：intersectPoints: [[2,4]] -> 会在坐标 (2,4) 画一个红色的交点。
 * ▶ type: "inverse" (反函数图)
 * - 必填：inversePoints: [[x,y], ...] -> 提供反函数的坐标。
 * - 效果：系统会自动画出 y = x 的灰色虚线（对称轴），并用红色画出反函数。
 * * 2. 集合映射图引擎： [MAPPING1], [MAPPING2] ...对应 mappingData1
 * ▶ (不写type) 或 type: "one-to-one" / "many-to-one" (普通映射)
 * - 效果：两个 Set，单向箭头。如果 x 数量多于 y，会自动连到同一个 y (多对一)。
 * ▶ type: "inverse" (反函数映射)
 * - 效果：两个 Set，顶部蓝箭头 (f)，底部会自动生成红色反向箭头 (f⁻¹)。
 * ▶ type: "composite" (复合函数映射)
 * - 效果：三个 Set (X,Y,Z)，上方会自动画出一条弯曲的抛物线越过中间。
 * - 选填：curveLabel: "gf" -> 自定义上方那条弯曲线的文字标签。
 * * 3. 财务/数据表格引擎： [TABLE1] ...对应 tableData1
 * ▶ (不需要写 type)
 * - 专为 Account 科目设计。必填 headers: [...] (表头名称) 和 rows: [[...], [...]] (每一行的数据)。
 * * 4. 几何/物理图形引擎： [SHAPE1] ...对应 shapeData1
 * ▶ type: "triangle" (三角形)
 * - 必填：points: "x1,y1 x2,y2 x3,y3" (输入三个角的绝对坐标)。
 * ▶ type: "circle" (圆形)
 * - 必填：cx (圆心x), cy (圆心y), r (半径)。
 * ▶ (通用选填)：labels: [{x: 100, y: 100, text: "Area"}] -> 可以在图形上任意位置加字。
 * * ============================================
 */

let currentPath = []; 
let currentLang = 'zh'; // 默认语言设定为华文

// ============================
// 路由与导航 (控制菜单点击和页面返回)
// ============================
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
    return d.topics[state.ti]; // 拿到具体内容的 ID
}

function goBack() {
    if (currentPath.length <= 1) { goHome(); return; }
    currentPath.pop(); const prevState = currentPath.pop(); 
    if (!prevState) { goHome(); return; }
    // 根据上一层的状态，重新渲染页面
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
    
    // 顶部路径追踪器，显示当前语言
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
            if (contentDB && contentDB[topicId]) {
                pathNames.push(contentDB[topicId].title);
            }
        }
    });
    b.innerText = "Path: " + langTag + pathNames.join(" > ");
}

function initSideBar() {
    const nav = document.getElementById("sidebarNav");
    if (!nav || !window.SchoolSyllabus) return;
    let html = `<h3 style="color: var(--primary-color); text-align: center; margin-bottom: 20px;">Menu</h3>`;
    html += `<div class="sb-item" onclick="goHome(); closeSidebar();">🏠 Home</div>`;
    
    // 遍历大纲文件，生成侧边栏菜单
    window.SchoolSyllabus.forEach((sub, i) => {
        html += `<div class="sb-subject-title" onclick="openSubject(${i}); closeSidebar();">${sub.name}</div>`;
        sub.units.forEach((unit, ui) => {
            html += `<div class="sb-item" style="padding-left: 20px;" onclick="openUnit(${i}, ${ui}); closeSidebar();">└ ${unit.name}</div>`;
        });
    });
    nav.innerHTML = html;
}

// ============================
// 页面渲染层 (UI 界面展示)
// ============================
function renderHome() {
    const app = document.getElementById("app");
    let html = `<h1 style="text-align:center; margin-bottom:30px; color:var(--primary-color);">📚 Bryan's Classroom</h1><div class="grid">`;
    window.SchoolSyllabus.forEach((sub, i) => {
        html += `<div class="card" onclick="openSubject(${i})"><h2 style="margin:0">${sub.name}</h2></div>`;
    });
    app.innerHTML = html + `</div>`;
}

function openSubject(i, isBack = false) {
    if (!isBack) pushState({ type: "subject", i: i });
    // 点进科目后，要求学生选择教学语言
    document.getElementById("app").innerHTML = `
        <div style="text-align:center; padding: 50px 0;">
            <h2 style="margin-bottom:30px;">Select Learning Language</h2>
            <div class="grid" style="max-width:600px; margin:0 auto;">
                <div class="card" onclick="setLanguage(${i}, 'zh')">
                    <div style="font-size:50px; margin-bottom:15px;"></div>
                    <div style="font-size:20px; font-weight:bold;">Chinese (ZH)</div>
                </div>
                <div class="card" onclick="setLanguage(${i}, 'ms')">
                    <div style="font-size:50px; margin-bottom:15px;"></div>
                    <div style="font-size:20px; font-weight:bold;">Malay (MS)</div>
                </div>
            </div>
        </div>
    `;
}

function setLanguage(subjectIndex, lang) { currentLang = lang; updateBreadcrumb(); initSideBar(); renderUnits(subjectIndex); }

function renderUnits(i) {
    const subject = window.SchoolSyllabus[i];
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
        // 去抓取对应的语言内容，如果没写，就显示 Data Pending
        let title = (contentDB && contentDB[topicId]) ? contentDB[topicId].title : "Data Pending...";
        html += `<div class="card" onclick="openTopic(${i},${ui},${si},${pi},${ti})">${title}</div>`;
    });
    document.getElementById("app").innerHTML = html + `</div>`;
}

// ============================
// Core: 终极页面渲染引擎 (正则替换画图占位符)
// ============================
function openTopic(i, ui, si, pi, ti, isBack = false) {
    const topicId = window.SchoolSyllabus[i].units[ui].sections[si].points[pi].topics[ti];
    if (!isBack) pushState({ type: "topic", i, ui, si, pi, ti });

    let subject = window.SchoolSyllabus[i];
    let contentDB = currentLang === 'zh' ? subject.db_zh : subject.db_ms;
    const topicData = (contentDB && contentDB[topicId]) ? contentDB[topicId] : { title: "Error", quiz: "Data content not found." };

    let content = topicData.quiz;
    const versionLabel = currentLang === 'zh' ? 'Chinese Version' : 'Malay Version';

    // 1. 替换 GRAF 占位符为 Canvas 画布
    content = content.replace(/\[GRAF(\d+)\]/g, (match, id) => `<div style="width:100%; max-width:550px; height:350px; margin: 30px auto; position:relative;"><canvas id="graf_canvas_${id}"></canvas></div>`);
    
    // 2. 替换 MAPPING 占位符 (加入 overflow-x 防止手机端挤压)
    content = content.replace(/\[MAPPING(\d+)\]/g, (match, id) => `
        <div style="width:100%; overflow-x:auto; padding: 10px 0;">
            <div id="mapping_container_${id}" style="position:relative; width:550px; height:280px; margin:0 auto; background:white; border-radius:15px; border:1px solid #e2e8f0; flex-shrink:0;"></div>
        </div>
    `);
    
    // 3. 替换 TABLE 占位符
    content = content.replace(/\[TABLE(\d+)\]/g, (match, id) => `<div style="width:100%; overflow-x:auto; margin:20px 0;"><div id="table_container_${id}"></div></div>`);
    
    // 4. 替换 SHAPE 占位符
    content = content.replace(/\[SHAPE(\d+)\]/g, (match, id) => `<div id="shape_container_${id}" style="width:100%; max-width:300px; height:200px; margin:20px auto; border: 1px dashed #cbd5e1; border-radius:10px;"></div>`);

    document.getElementById("app").innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 15px; border: var(--glass-border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <h1 style="margin:0; color:var(--primary-color);">${topicData.title}</h1>
            <span style="background:var(--primary-color); color:white; padding:4px 12px; border-radius:20px; font-size:12px;">${versionLabel}</span>
        </div>
        <hr style="border:0; border-top:1px solid rgba(0,0,0,0.1); margin:20px 0;">
        <div class="content-body" style="line-height:1.8; font-size:17px; overflow-x: auto;">
            ${content}
        </div>
    </div>`;
    
    // 执行绘图逻辑
    Object.keys(topicData).forEach(key => {
        if (key.startsWith('grafData')) drawRealGraph(`graf_canvas_${key.replace('grafData','')}`, topicData[key]);
        if (key.startsWith('mappingData')) drawMapping(`mapping_container_${key.replace('mappingData','')}`, topicData[key]);
        if (key.startsWith('tableData')) drawTable(`table_container_${key.replace('tableData','')}`, topicData[key]);
        if (key.startsWith('shapeData')) drawShape(`shape_container_${key.replace('shapeData','')}`, topicData[key]);
    });

    // 渲染数学公式
    if (window.MathJax) MathJax.typesetPromise();
}

// ----------------------------------------------------
// 具体绘图实现代码区 (Table, Shape, Mapping, Graph)
// ----------------------------------------------------

function drawTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = `<table style="width:100%; border-collapse: collapse; text-align:left; font-size:15px; min-width: 400px;">`;
    if (data.headers) {
        html += `<tr style="background: var(--accent-color); border-bottom: 2px solid var(--primary-color);">`;
        data.headers.forEach(h => html += `<th style="padding:12px;">${h}</th>`);
        html += `</tr>`;
    }
    data.rows.forEach(row => {
        html += `<tr style="border-bottom: 1px solid #e2e8f0;">`;
        row.forEach(cell => html += `<td style="padding:10px;">${cell}</td>`);
        html += `</tr>`;
    });
    html += `</table>`;
    if(data.caption) html += `<div style="text-align:center; font-size:12px; color:#64748b; margin-top:10px; font-weight:bold;">${data.caption}</div>`;
    container.innerHTML = html;
}

function drawShape(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let svg = `<svg viewBox="0 0 200 200" style="width:100%; height:100%;">`;
    if (data.type === "triangle") svg += `<polygon points="${data.points}" fill="rgba(0,80,160,0.1)" stroke="#0050a0" stroke-width="2"/>`;
    else if (data.type === "circle") svg += `<circle cx="${data.cx}" cy="${data.cy}" r="${data.r}" fill="rgba(0,80,160,0.1)" stroke="#0050a0" stroke-width="2"/>`;
    
    if (data.labels) data.labels.forEach(lbl => svg += `<text x="${lbl.x}" y="${lbl.y}" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle">${lbl.text}</text>`);
    svg += `</svg>`;
    if(data.caption) svg += `<div style="text-align:center; font-size:12px; color:#64748b; font-weight:bold; margin-top:-10px;">${data.caption}</div>`;
    container.innerHTML = svg;
}

function drawMapping(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const arrowId = `arrow_${containerId}`; const arrowRevId = `arrow_rev_${containerId}`; 
    
    let svgHTML = `<svg width="550" height="280" style="position:absolute; top:0; left:0; z-index:1; pointer-events:none;">
        <defs>
            <marker id="${arrowId}" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#0050a0" /></marker>
            <marker id="${arrowRevId}" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#e63946" /></marker>
        </defs>`;

    const ovalWidth = 90; const ovalHeight = 160; const centerY = 130; 

    const createSetHTML = (label, items, cx) => {
        let itemsHTML = items.map((item, index) => {
            let yPos = items.length === 1 ? (ovalHeight/2) : (ovalHeight / (items.length + 1)) * (index + 1);
            return `<div style="position:absolute; top:${yPos}px; left:50%; transform:translate(-50%, -50%); text-align:center; width:100%;">${item}</div>`;
        }).join('');
        return `
            <div style="position:absolute; left:${cx}px; top:${centerY}px; width:${ovalWidth}px; height:${ovalHeight}px; border:2px solid #0050a0; border-radius:50%; transform:translate(-50%, -50%); background:rgba(0,80,160,0.03); z-index:2;">
                <div style="position:absolute; bottom:-35px; width:100%; text-align:center; font-weight:bold; color:#0050a0;">${label}</div>
                ${itemsHTML}
            </div>`;
    };

    let html = "";

    if (data.type === "composite") {
        const cxX = 90, cxY = 275, cxZ = 460;
        
        html += createSetHTML(data.xLabel || 'Set X', data.x, cxX);
        html += createSetHTML(data.yLabel || 'Set Y', data.y, cxY);
        html += createSetHTML(data.zLabel || 'Set Z', data.z, cxZ);

        svgHTML += `<path d="M ${cxX} 60 Q ${cxY} -10 ${cxZ - 5} 60" fill="transparent" stroke="#0050a0" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#${arrowId})"/>`;
        html += `<div style="position:absolute; left:${cxY}px; top:-5px; transform:translateX(-50%); font-weight:bold; color:#0050a0; z-index:5;">\\(${data.curveLabel || 'gf'}\\)</div>`;
        
        svgHTML += `<line x1="${cxX + 45}" y1="${centerY}" x2="${cxY - 50}" y2="${centerY}" stroke="#0050a0" stroke-width="2" marker-end="url(#${arrowId})" />`;
        svgHTML += `<line x1="${cxY + 45}" y1="${centerY}" x2="${cxZ - 50}" y2="${centerY}" stroke="#0050a0" stroke-width="2" marker-end="url(#${arrowId})" />`;
        
        html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY - 35}px; transform:translateX(-50%); font-weight:bold; color:#0050a0;">\\(f\\)</div>`;
        html += `<div style="position:absolute; left:${(cxY+cxZ)/2}px; top:${centerY - 35}px; transform:translateX(-50%); font-weight:bold; color:#0050a0;">\\(g\\)</div>`;
        
    } else {
        const cxX = 160, cxY = 390;
        
        html += createSetHTML(data.xLabel || 'Set X', data.x, cxX);
        html += createSetHTML(data.yLabel || 'Set Y', data.y, cxY);
        
        data.x.forEach((xItem, index) => {
            let startY = centerY - (ovalHeight/2) + (data.x.length === 1 ? (ovalHeight/2) : (ovalHeight / (data.x.length + 1)) * (index + 1));
            let targetIndex = data.type === "many-to-one" ? 0 : Math.min(index, data.y.length - 1);
            let endY = centerY - (ovalHeight/2) + (data.y.length === 1 ? (ovalHeight/2) : (ovalHeight / (data.y.length + 1)) * (targetIndex + 1));
            
            svgHTML += `<line x1="${cxX + 45}" y1="${startY}" x2="${cxY - 50}" y2="${endY}" stroke="#0050a0" stroke-width="2" marker-end="url(#${arrowId})" />`;
        });
        
        if (data.type === "inverse") {
            svgHTML += `<line x1="${cxY - 45}" y1="${centerY + 20}" x2="${cxX + 50}" y2="${centerY + 20}" stroke="#e63946" stroke-width="2" marker-end="url(#${arrowRevId})" />`;
            html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY - 45}px; transform:translateX(-50%); font-weight:bold; color:#0050a0;">\\(f\\)</div>`;
            html += `<div style="position:absolute; left:${(cxX+cxY)/2}px; top:${centerY + 28}px; transform:translateX(-50%); font-weight:bold; color:#e63946;">\\(f^{-1}\\)</div>`;
        }
    }
    svgHTML += `</svg>`;
    container.innerHTML = svgHTML + html + `<div style="position:absolute; bottom:5px; width:100%; text-align:center; font-size:12px; color:#64748b; font-weight:bold;">${data.caption||''}</div>`;
}

function drawRealGraph(canvasId, grafData) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const datasets = [];

    datasets.push({ type: 'line', label: grafData.graphLabel || 'f(x)', data: grafData.points.map(p => ({ x: p[0], y: p[1] })), borderColor: '#0050a0', borderWidth: 2, tension: 0.4, fill: false, pointRadius: 0, pointHitRadius: 10 });

    if (grafData.type === "inverse") {
        const allX = grafData.points.map(p => p[0]); const allY = grafData.points.map(p => p[1]);
        const minVal = Math.min(...allX, ...allY) - 2; const maxVal = Math.max(...allX, ...allY) + 2;
        datasets.push({ type: 'line', label: 'y = x', data: [{x: minVal, y: minVal}, {x: maxVal, y: maxVal}], borderColor: 'gray', borderWidth: 2, borderDash: [5, 5], pointRadius: 0 });
        if (grafData.inversePoints) datasets.push({ type: 'line', label: 'f⁻¹(x)', data: grafData.inversePoints.map(p => ({ x: p[0], y: p[1] })), borderColor: '#e63946', borderWidth: 2, tension: 0.4, fill: false, pointRadius: 0 });
    } else if (grafData.type === "function") {
        const yVals = grafData.points.map(p => p[1]);
        const minY = Math.min(...yVals) - 5; const maxY = Math.max(...yVals) + 5;
        if (grafData.testLines) grafData.testLines.forEach(xVal => datasets.push({ type: 'line', label: 'Vertical Line', data: [{x: xVal, y: minY}, {x: xVal, y: maxY}], borderColor: 'red', borderWidth: 2, borderDash: [5, 5], pointRadius: 0 }));
        if (grafData.intersectPoints) datasets.push({ type: 'scatter', label: 'Intersection', data: grafData.intersectPoints.map(p => ({ x: p[0], y: p[1] })), backgroundColor: 'red', borderColor: 'white', borderWidth: 2, pointRadius: 6, z: 10 });
    }

    new Chart(ctx, {
        type: 'line', data: { datasets: datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: !!grafData.caption, text: grafData.caption }, legend: { display: true, position: 'bottom' } },
            scales: {
                x: { type: 'linear', position: 'center', border: { color: 'black', width: 2 }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 1 } },
                y: { position: 'center', border: { color: 'black', width: 2 }, grid: { color: 'rgba(0,0,0,0.05)' } }
            }
        }
    });
}
window.addEventListener('DOMContentLoaded', () => { goHome(); });
