/**
 * ============================================
 * [f4_addmath_zh.js] - 附加数学 (华文内容包)
 * ============================================
 * 提示：修改或增加华文的题目、内容、图表坐标，都在这里操作！
 */
window.f4_AddMath_ZH = {

    "f4_am_c1_q1_rc": {
        title: "Fungsi",
        quiz: `
        &rarr; Hubungan antara <b> Set \\(X\\) </b> dengan <b> Set \\(Y\\) </b>.

        `
    },

    "f4_am_c1_q2_rc":{
        title: "Fungsi Gubahan",
        quiz: `
        &rarr; Hubungan antara fungsi \\(f\\) dan \\(g\\).
        `
    },
    
    // 内容 ID：必须与 syllabus.js 里的对应
    "f4_am_c1_q1_comp": {
        title: "什么是复合函数？",
        quiz: `
        <b>复合函数 (Fungsi Gubahan)</b> 是将一个函数代入另一个函数中。<br><br>
        [MAPPING1]
        `,
        mappingData1: {
            type: "composite", // 画复合函数三个圈圈
            curveLabel: "gf",  // 顶部抛物线箭头文字
            x: ["\\(x\\)"], y: ["\\(f(x)\\)"], z: ["\\(gf(x)\\)"],
            xLabel: "Set X", yLabel: "Set Y", zLabel: "Set Z",
            caption: "复合函数的映射"
        }
    },

    "f4_am_c1_q2_inv": {
        title: "什么是反函数？",
        quiz: `
        <b>反函数</b> 的图表是沿着直线 \\(y = x\\) 反射的。<br><br>
        [MAPPING1]<br><br>
        [GRAF1]
        `,
        mappingData1: {
            type: "inverse", // 画反函数的上下双向箭头
            x: ["\\(x\\)"], y: ["\\(y\\)"],
            xLabel: "Domain", yLabel: "Kodomain",
            caption: "反函数映射"
        },
        grafData1: {
            type: "inverse", // 自动画出 y=x 虚线
            graphLabel: "f(x)",
            points: [[-2,-2], [0,2], [2,6]], 
            inversePoints: [[-2,-2], [2,0], [6,2]], // 反函数的坐标点
            caption: "沿 y = x 反射"
        }
    }

};
