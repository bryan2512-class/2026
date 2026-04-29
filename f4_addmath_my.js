/**
 * ⚙️ 系统通用设置 (Global Settings 适用于所有引擎):
 * 【选填】 background: "white" (默认白纸), "grid" (灰色网格纸), "graph" (SPM 绿色坐标纸)
 * 【选填】 caption: 图表底部的说明文字
 * 【选填】 htmlLabels: [{ x: 50, y: 50, text: "\\( x^2 \\)", color: "red", size: "14px" }] (支持 LaTeX，x & y 为百分比 %)
 * * ----------------------------------------------------------------------------
 * 🟢 1. 坐标与图表引擎 [GRAF] (grafData)
 * ----------------------------------------------------------------------------
 * ▶ 基本画布设置:
 * 【选填】 type: 默认是 "function"。若设为 "inverse"，会自动生成 y=x 对称轴及反函数镜像图。
 * 【选填】 xMin, xMax, yMin, yMax, xStep, yStep: 坐标轴刻度与范围。
 * * ▶ 辅助测试线与标记 (Garisan Ujian & Mark):
 * 【选填】 verticalTests: [2, 4] -> 自动画垂直红虚线 (垂直线测试)
 * 【选填】 horizontalTests: [5] -> 自动画水平绿虚线 (水平线测试)
 * 【选填】 intersectPoints: [[2, 4]] -> 在指定坐标画出红色交点
 * 【选填】 mathLabels: [{ x: 2, y: 5, text: "\\( y=x \\)" }] -> 在真实的 (x,y) 坐标上精准悬浮文字！
 * 【选填】 markPoints: [{ x: 3, y: 0, label: "Punca", color: "black" }] -> 智能散点标记
 * * ▶ 线条模式 (lines: [{ ... }]) 
 * 【必填】 equation: "x**2" (用于连续函数/切线/法线) 或 points: [[1,2], [3,4]] (用于离散点/多边形)
 * 【选填】 mode: 
 * - "continuous" (默认, 自动检测并画平滑曲线或直线)
 * - "tangent" | "normal" -> 自动计算斜率画切线/法线。【必填】 atX: 3 (指定在哪个 x 坐标求导)
 * - "normal_dist" -> 自动画正态分布钟形曲线
 * - "discrete" (离散点), "step" (阶梯函数), "ogive" (累积频数图)
 * - "bar", "histogram", "pie", "scatter"
 * - "polygon" -> 连接所有的 points 画出封闭的多边形
 * 【选填】 color, borderWidth, pointRadius, tension (曲线弯曲度)
 * 【选填】 dashed: true (变成虚线，适用于 Ketaksamaan)
 * 【选填】 showEquation: true (仅限 tangent/normal，自动在图上写出计算好的 y=mx+c)
 * * ▶ 阴影与涂黑系统 (Kawasan Berlorek):
 * 【选填】 fill: "origin" (涂黑到 X 轴) 或 "dataset:0" (涂黑到第0条线，找两线交集面积)
 * 【选填】 fillColor: "rgba(0, 80, 160, 0.4)" (阴影颜色)
 * 【选填】 shadeRange: [1, 3] (限制这条线/阴影只在 x=1 到 x=3 之间出现)
 * * * ----------------------------------------------------------------------------
 * 🔵 2. 几何与统计图形引擎 [SHAPE] (shapeData)
 * ----------------------------------------------------------------------------
 * 【必填】 type: (必须选择以下一种类型)
 * * 📐 几何与角度 (Geometri):
 * - type: "geometry_angles" -> 【必填】 lines 或 arcs。 【选填】 parallel: 1 (平行箭头), isRightAngle: true (90度记号)
 * - type: "regular_polygon" -> 【必填】 sides (边数), r (半径)。 【选填】 showCenter: true
 * - type: "vector"          -> 【必填】 lines: [{x1,y1, x2,y2}]
 * - type: "grid_transform"  -> 【必填】 origin: {x, y}, shapes: [{points: [[x,y]...]}]。 【选填】 isImage: true
 * * 📊 统计与概率 (Statistik & Kebarangkalian):
 * - type: "boxplot"   -> 【必填】 min, q1, median, q3, max
 * - type: "stem_leaf" -> 【必填】 stems: ["1", "2"], leaves: [["1","2"], ["0"]]。 【选填】 key: "说明"
 * - type: "dotplot"   -> 【必填】 dots: [{val: 1, count: 3}]。 【选填】 min, max, step
 * - type: "tree"      -> 【必填】 branches: [{x1,y1, x2,y2}]。 【选填】 prob: "0.5", label: "A"
 * - type: "venn"      -> 【必填】 circles: [{cx, cy, r}]。 【选填】 shadedPaths: [{d: "M..."}], universal: true
 * - type: "network"   -> 【必填】 nodes: [{id:"A", x, y}], edges: [{x1, y1, x2, y2}]。 【选填】 weight
 * * 🧭 特定章节 (Bab Khusus):
 * - type: "number_line" -> 【必填】 inequalities: [{start, inclusive}]。 【选填】 end, endInclusive, dir: "right"
 * - type: "locus"       -> 【必填】 items: [{shape: "circle"|"line", x, y, r}]。 【选填】 points: [{x,y,label}]
 * - type: "bearing"     -> 【必填】 x, y, angle (角度)
 * - type: "earth"       -> (无需参数，自动生成地球与赤道)
 * * * ----------------------------------------------------------------------------
 * 🟡 3. 表格引擎 [TABLE] (tableData)
 * ----------------------------------------------------------------------------
 * 【必填】 rows: [ ["数据1", "数据2"], ["数据3", "数据4"] ]
 * 【选填】 direction: "horizontal" (横向，如函数表) | "vertical" (纵向，如统计表，默认)
 * 【选填】 headers: ["表头1", "表头2"]
 * * 💡 进阶合并单元格 (Colspan/Rowspan):
 * 将原本的 "文字" 替换为 Object: 
 * { text: "Jumlah", colspan: 2, align: "right", bg: "#e0f2fe", color: "blue" }
 * * * ----------------------------------------------------------------------------
 * 🟣 4. 映射引擎 [MAPPING] (mappingData)
 * ----------------------------------------------------------------------------
 * 【必填】 x: ["1", "2"], y: ["A", "B"] (Set X 和 Set Y 的内容)
 * 【选填】 type: "one-to-one" | "many-to-one" | "inverse" | "composite"
 * 【选填】 xLabel: "Set X", yLabel: "Set Y"
 * * 💡 自定义连线 (Custom Links):
 * 【选填】 links: [[0,0], [1,0], [2,1]] -> (代表 X 的第0项连去 Y 的第0项...)
 * * 💡 复合函数 (Composite):
 * 【必填】 z: ["P", "Q"] (第三个集合)
 * 【选填】 curveLabel: "gf" (最上方跨越的抛物线标记)
 * ============================================================================
 */

window.f4_AddMath_MS = {

    "f4_am_c1_q1_rc": {
        title: "Fungsi",
        quiz: `
        &rarr; Hubungan antara <b> Set \\(X\\) </b> dengan <b> Set \\(Y\\). </b>
        <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
        <b>Tips: </b> <br>
            1. Kata Kunci: <br>
                a. Domain <br>
                b. Kodomain <br>
                c. Objek <br>
                d. Imej <br>
                e. Julat <br><br>
            2. Tatatanda Fungsi= \\(f \\colon x \\to x^2\\) atau \\(f(x)=x^2\\)
         </div>

        [MAPPING1] <br><br>
        [MAPPING2]<br>
        <hr style="border: 0.5px solid #000;" /> <br><br>
        <b> Contoh Soalan: </b> <br><br>
                1. Diberi \\(f \\colon x \\to \\frac{5}{2x-3}, x \\neq \\frac{3}{2} \\). Cari <br>
                    a. \\(f(2)\\), <br>
                    b. nilai \\(x\\) dengan keadaan \\(f(x)=1\\), <br>
                    c. nilai-nilai \\(x\\) yang memetakan kepada dirinya sendiri. <br><br>
                    Ans: <br>
                    a. \\(f(2)=5\\) <br>
                    b. \\(x=4\\) <br>
                    c. \\(x=-1\\) dan \\(x=\\frac{5}{2} \\)
                    <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
                        <b> Tips Untuk Jawab: </b> <br>
                            a. Tunjukkan jalan kerja ganti \\(x=2\\) <br>
                            b. Tunjukkan jalan kerja ganti \\(f(x)=1\\). <br>
                            c. <b> Memetakan kepada dirinya sendiri </b> maksud \\(f(x)=x\\) <br>
                    </div> 
        `, 
            
            mappingData1: {
            type: "one-to-one",
            x: ["\\(X\\)", "\\(2\\)"],
            y: ["\\(X^2\\)", "\\(4\\)"],
            xLabel: "Set X",
            yLabel: "Set Y",
            caption: "\\(f(x)=x^2\\) Fungsi satu kepada satu (Gambar Rajah Anak Panah)"
            },

            mappingData2: {
            type: "many-to-one",
            x: ["\\(X_1\\)", "\\(X_2\\)"],
            y: ["\\(Y\\)"],
            xLabel: "Set X",
            yLabel: "Set Y",
            caption: "\\(f(X)=Y\\) Fungsi banyak kepada satu (Gambar Rajah Anak Panah)"
            },
    },

    "f4_am_c1_q2_rc": {
        title: "Ujian Garis Mencancang",
        quiz: `
        &rarr; Untuk menentukan fungsi atau bukan fungsi. <br>
        &rarr; Sekiranya garis mencancang hanya memotong graf pada satu tiitk sahaja, graf itu ialah fungsi. <br>
        [GRAF1] <br><br>
        [GRAF2] <br>
        <hr style="border: 0.5px solid #000;" /> <br><br>
        <b> Contoh Soalan: </b> <br><br>
        1. Tentukan sama ada graf di bawah fungsi atau bukan. <br>
        [GRAF3] <br><br><br>
        <b>Ans: </b> <br>
        [GRAF4]<br>
        Fungsi kerana garis mencancang hanya memotong graf pada satu titik sahaja. <br>

        <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
            <b> Tips Untuk Jawab: </b> <br>
                a. Tunjukkan jalan kerja melukis <b> Garis Mencancang </b> <br>
        </div> 

        `,
        grafData1: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -7 ,
            yMax: 8,
            xMax: 4,
            xMin: -5,
            lines: [
                {equation: "2*x**2 + 5*x - 3",
                    indVar: "x",
                    label: "Graf A"
                },
            ],
            verticalTests: [1],
            intersectPoints: [[1,4]],
            caption: "Graf ini ialah fungsi kerana garis mencancang hanya memotong graf pada satu titik sahaja."
        },

        grafData2: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -3,
            yMax: 3,
            xMin: -2,
            xMax: 9,
            lines: [
                {equation: "x = y**2",
                    indVar: "y",
                    label: "Graf B"
                },
            ],
            verticalTests: [1],
            intersectPoints: [[1,-1],[1,1]],
            caption: "Graf ini bukan fungsi kerana garis mencancang mmemotong graff pada dua titik."
        },

        grafData3: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -1,
            yMax: 8,
            xMin: 0,
            xMax: 8,
            lines: [
                {equation: "Math.abs(2*x - 6)",
                    indVar: "x",
                    label: "Graf C"
                },
            ],
            caption: ""

        },

        grafData4: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -1,
            yMax: 8,
            xMin: 0,
            xMax: 8,
            lines: [
                {equation: "Math.abs(2*x - 6)",
                    indVar: "x",
                    label: "Graf D",
                },
            ],
            verticalTests: [5],
            intersectPoints: [[5,4]],
            caption: ""
        },
    },
    
    "f4_am_c1_q3_rc": {
        title:  "Graf Fungsi Mutlak",
        quiz: `
        &rarr; Graf berbentuk <b> V </b>. <br>
        [GRAF1] <br>
        <hr style="border: 0.5px solid #000;" /> <br><br>
        <b> Contoh Soalan: </b> <br><br>
            1. Rajah di bawah menunjukkan sebahagian daripada graf fungsi nilai mutlak \\(f \\colon x \\to |2x-6|\\).<br>
            [GRAF2] <br><br>
            a. Cari: <br>
                i. \\(f(-2)\\) dan \\(f(9)\\), <br>
                ii. nilai-nilai \\(x\\) dengan keadaan \\(f(x)=10\\), <br>
                iii. nilai-nilai \\(x\\) yang memetakan kepada dirinya sendiri, <br>
                iv. domain bagi \\(f(x)< 14\\), <br>
                v. domain bagi \\(f(x) \\geqslant 2\\). <br> <br>
            b. Pada graf yang sama,lakarkan graf bagi \\(f(x) \\colon x \\to |x+2|\\) dan seterusnya dapatkan nilai \\(x\\) apabila \\(|2x-6| = |x+2|\\). <br><br><br>
            <b> Ans: </b> <br> 
                a) <br>
                  i. \\(f(-2)=10\\) dan \\(f(9)=12\\) <br>
                  ii. \\(x=-2\\) dan \\(x=8\\) <br>
                  iii. \\(x=2\\) dan \\(x=6\\) <br>
                  iv.\\(-4< x < 10\\) <br>
                  v. \\(x \\leqslant 2\\) dan \\(x \\geqslant 4\\) <br><br>
                  <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
                        <b> Tips Untuk Jawab: </b> <br>
                            i. Ganti \\(x = -2\\) dan \\(x = 9\\) <br>
                            ii. \\(|f(x)| = a \\to f(x) = -a \\, \\; atau \\, \\; f(x) = a\\) <br>
                            iii. \\(|f(x) = g(x)| \\to f(x) = -g(x) \\, \\; atau \\, \\; f(x) = g(x)\\) <br>
                            iv. \\(|f(x)| < a \\to -a < f(x) < a\\) <br>
                            v. \\(|f(x)| > a \\to f(x) < -a \\, \\; atau \\, \\; f(x) > a\\) <br><br>                                                        
                    </div> 

                  b. [GRAF3] <br>
                  \\(x=\\frac{4}{3}\\) dan \\(x=8\\)
                  <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
                        <b> Tips Untuk Jawab: </b> <br>
                           1.\\(|f(x)|=|g(x)| \\to [f(x)]^2=[g(x)]^2\\)
                    </div> 
                
        `,
        grafData1: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -6,
            yMax: 6,
            xMin: -2,
            xMax: 5, 
            tension: 0,
            points: [[-1,5], [0,3], [1,1], [1.4,0.2], [0,3], [1.5,0], [1.5,0], [1.5,0], [1.6,0.2], [2,1], [3,3], [4,5]],
            caption: "Graf Fungsi Mutlak"
        },
        
        grafData2: {
            type:  "function",
            graphLabel: "f(x)",
            yMin: -6,
            yMax: 6,
            xMin: -2,
            xMax: 7,
            tension: 0,
            points: [[0,6], [1,4], [3,0], [3,0], [3,0], [4,2], [5,4], [6,6]],
            caption: ""
        },

        grafData3: {
            type: "function",
            graphLabel: "f(x)",
            yMin: -8,
            yMax: 8,
            xMin: -5,
            xMax: 6,
            lines:[
                {label: "f(x)=|x+2|",
                 equation: "Math.abs(x + 2)",
                 color: "blue",                 
                },

                {label: "|f(x)=|2x-6|",
                 equation: "Math.abs(2*x - 6)",
                 color: "red",
                 dashed: true,
                },
            ],
            caption: ""        
        },
    },

    "f4_am_c1_q4_rc":{
        title: "Fungsi Gubahan",
        quiz: `
        &rarr; Hubungan antara fungsi \\(f\\) dan \\(g\\). <br>
        [MAPPING1] <br>
        <div style="font-size: 10px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;"> <br>
            <b> Tips Untuk Jawab: </b> <br>
                1. Fungsi yang disebutkan dulu, sebagai fungsi kedua dalam dua hubungan, seperti yang ditunjukkan dalam rajah atas. <br>
                2. Contohnya, \\(gf(x)\\) maksudnya \\(f(x)\\) digabungkan dalam \\(g(x)\\).                                                                      
        </div> 

        `,

        mappingData1: {
            type: "composite",
            x: ["\\(x\\)"],
            y: ["\\(y\\)"],
            z: ["\\(gf(x)\\)"],
            xLabel: "Set X",
            yLabel: "Set Y",
            zLabel: "Set Z",
            curveLabel: "gf",
            fLabel: "f",
            gLabel: "g",
            caption: "Pemetaan Fungsi Gubahan"
        },
    },
    
    "f4_am_c1_q1_comp": {
        title: "Apakah Fungsi Gubahan?",
        quiz: `
        <b>Fungsi Gubahan</b> berlaku apabila satu fungsi disubstitusikan ke dalam fungsi yang lain.<br><br>
        [MAPPING1]
        `,

        mappingData1: {
            type: "composite",
            x: ["\\(x\\)"], 
            y: ["\\(f(x)\\)"], 
            z: ["\\(gf(x)\\)"],
            xLabel: "Set X", 
            yLabel: "Set Y", 
            zLabel: "Set Z",
            curveLabel: "gf", 
            fLabel: "f",
            gLabel: "g",
            caption: "Pemetaan Fungsi Gubahan"
        },
    },

    "f4_am_c1_q2_inv": {
        title: "Apakah Fungsi Songsang?",
        quiz: `
        Graf fungsi songsang ialah pantulan pada garis lurus \\(y = x\\).<br><br>
        [MAPPING1]<br><br>
        [GRAF1]
        `,
        mappingData1: {
            type: "inverse",
            x: ["\\(x\\)"], y: ["\\(y\\)"],
            xLabel: "Domain", yLabel: "Kodomain",
            caption: "Pemetaan Fungsi Songsang"
        },
        grafData1: {
            type: "inverse",
            graphLabel: "f(x)",
            points: [[-2,-2], [0,2], [2,6]], 
            inversePoints: [[-2,-2], [2,0], [6,2]], 
            caption: "Pantulan pada garis y = x"
        }
    }

};
