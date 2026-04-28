/**
 * ============================================
 * [syllabus.js] - 核心调度文件 (大纲总表)
 * ============================================
 * * 💡 【下次如何添加新科目/新文件的教学】：
 * * 第一步：新建数据文件
 * 在电脑里新建两个文件，例如 `f5_fizik_zh.js` (装华文内容) 和 `f5_fizik_ms.js` (装马来文内容)。
 * * 第二步：写入教学内容
 * 去新建的 js 文件里，参考 AddMath 的写法，把数据挂载到全局变量。
 * 例如：`window.Fizik_ZH = { "topic_id_1": { title: "...", quiz: "..." } };`
 * * 第三步：在 index.html 引入
 * 打开 index.html，在 <script> 区域，把你刚才建的两个文件引进来。
 * (必须写在 syllabus.js 的上方！)
 * * 第四步：在下面这绑定大纲
 * 在这个 window.SchoolSyllabus 数组里，新增一个大括号 {}。
 * 按照下面的格式写好 name (大标题), units (单元)...
 * 【最重要的一步】：把 db_zh 和 db_ms 指向你第二步设定的变量名！(如 window.Fizik_ZH)
 * 最后，把 topics 里填上对应内容的 ID 即可！
 * * ============================================
 */
window.SchoolSyllabus = [
    // ==========================================
    // 科目 1: F4 ADDITIONAL MATHEMATICS
    // ==========================================
    {
        name: "F4 ADDITIONAL MATHEMATICS",
        db_zh: window.f4_AddMath_ZH || {}, // 绑定华文数据包
        db_ms: window.f4_AddMath_MS || {}, // 绑定马来文数据包
        units: [
            {
                name: "CHAPTER 1: FUNCTIONS",
                sections: [
                    {
                        name: "Revisi Cepat",
                        points: [
                            {
                                name: "Lesson 1: 1.1 Fungsi",
                                topics: ["f4_am_c1_q1_rc"]
                            },

                            {   name: "Lesson 2: Funngsi Gubahan",
                                topics: ["f4_am_c1_q2_rc"]
                            },
                        ]
                    },
                    {
                        name: "1.2 Composite Functions",
                        points: [
                            {
                                name: "Lesson 1: Composite Functions",
                                topics: ["f4_am_c1_q1_comp"]  // 这里填写数据包里的 ID
                            }
                        ]
                    },
                    {
                        name: "1.3 Inverse Functions",
                        points: [
                            {
                                name: "Lesson 1: Concept & Graph",
                                topics: ["f4_am_c1_q2_inv"]
                            }
                        ]
                    }
                ]
            }
        ]
    },

    // ==========================================
    // 科目 2: F4 CHEMISTRY (如果准备好了就取消注释)
    // ==========================================
    //{
        //name: "F4 CHEMISTRY",
        //db_zh: window.f4_Chem_ZH || {},
        //db_ms: window.f4_Chem_MS || {},
        //units: [
       //    {
        //            name: "CHAPTER 2: BASIC CONCEPTS OF MATTER"
        //    }
        //]
    //}
];
