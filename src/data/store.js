// ═══════════════════════════════════════════════════════════
// مخزن البيانات - منصة التقييم الصحي
// وزارة الصحة العراقية
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY = 'health_eval_data';

// البيانات الأولية
const initialData = {
  directorates: [
  {
    "id": 1,
    "name": "دائرة صحة بغداد / الرصافة",
    "description": "تغطي الجانب الشرقي من العاصمة بغداد وتشمل عدة أقضية ونواحي",
    "location": "بغداد - الرصافة",
    "sectors": [
      {
        "id": 101,
        "name": "قطاع الأعظمية",
        "healthCenters": [
          {
            "id": 1001,
            "name": "مركز صحي الأعظمية",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1002,
            "name": "مركز صحي الوزيرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 1003,
            "name": "مركز صحي الكاظمية الشرقية",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 3000,
            "name": "مركز صحي القاهرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3001,
            "name": "مركز صحي سبع أبكار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 102,
        "name": "قطاع الرصافة",
        "healthCenters": [
          {
            "id": 1004,
            "name": "مركز صحي الرصافة",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1005,
            "name": "مركز صحي الفضل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3002,
            "name": "مركز صحي باب الشيخ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3003,
            "name": "مركز صحي الشيخ عمر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3004,
            "name": "مركز صحي أبو سيفين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 103,
        "name": "قطاع الشعب",
        "healthCenters": [
          {
            "id": 1006,
            "name": "مركز صحي مدينة الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 1007,
            "name": "مركز صحي الحبيبية",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 3005,
            "name": "مركز صحي الشعب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3006,
            "name": "مركز صحي الثعالبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3007,
            "name": "مركز صحي الجزائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 104,
        "name": "قطاع الصدر الأول",
        "healthCenters": [
          {
            "id": 3008,
            "name": "مركز صحي الكيارة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3009,
            "name": "مركز صحي الحبيبية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3010,
            "name": "مركز صحي الداخل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3011,
            "name": "مركز صحي القطاع 1",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3012,
            "name": "مركز صحي القطاع 10",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 105,
        "name": "قطاع الصدر الثاني",
        "healthCenters": [
          {
            "id": 3013,
            "name": "مركز صحي الجوادر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3014,
            "name": "مركز صحي الأورفلي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3015,
            "name": "مركز صحي القطاع 25",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3016,
            "name": "مركز صحي القطاع 40",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3017,
            "name": "مركز صحي الداخل الشرقي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 106,
        "name": "قطاع المدائن",
        "healthCenters": [
          {
            "id": 3018,
            "name": "مركز صحي جسر ديالى",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3019,
            "name": "مركز صحي سلمان باك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3020,
            "name": "مركز صحي اللج",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3021,
            "name": "مركز صحي الوردية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3022,
            "name": "مركز صحي الجعفرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 107,
        "name": "قطاع بغداد الجديدة",
        "healthCenters": [
          {
            "id": 3023,
            "name": "مركز صحي المشتل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3024,
            "name": "مركز صحي الأمين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3025,
            "name": "مركز صحي الفضيلية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3026,
            "name": "مركز صحي الغدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3027,
            "name": "مركز صحي الكفاءات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 108,
        "name": "قطاع الاستقلال",
        "healthCenters": [
          {
            "id": 3028,
            "name": "مركز صحي الحسينية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3029,
            "name": "مركز صحي بوب الشام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3030,
            "name": "مركز صحي الثعالبة الثانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3031,
            "name": "مركز صحي الراشدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3032,
            "name": "مركز صحي الزهور الأولى",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 109,
        "name": "قطاع التاجي (الرصافة)",
        "healthCenters": [
          {
            "id": 3033,
            "name": "مركز صحي التاجي (الرصافة) الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3034,
            "name": "مركز صحي التاجي (الرصافة) النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3035,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3036,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3037,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 110,
        "name": "قطاع الزهور",
        "healthCenters": [
          {
            "id": 3038,
            "name": "مركز صحي الزهور الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3039,
            "name": "مركز صحي الزهور النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3040,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3041,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3042,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 111,
        "name": "قطاع الحسينية",
        "healthCenters": [
          {
            "id": 3043,
            "name": "مركز صحي الحسينية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3044,
            "name": "مركز صحي الحسينية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3045,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3046,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3047,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 112,
        "name": "قطاع المعامل",
        "healthCenters": [
          {
            "id": 3048,
            "name": "مركز صحي المعامل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3049,
            "name": "مركز صحي المعامل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3050,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3051,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3052,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 113,
        "name": "قطاع جسر ديالى",
        "healthCenters": [
          {
            "id": 3053,
            "name": "مركز صحي جسر ديالى الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3054,
            "name": "مركز صحي جسر ديالى النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3055,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3056,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3057,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2001,
        "name": "مركز أسنان تخصصي الرصافة",
        "status": "evaluated",
        "score": 88,
        "stage1Score": 90,
        "stage2Score": 86,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "answers": {
          "u_1_daily_reg": 10,
          "u_1_spend_reg": 10,
          "u_1_docs_reg": 10,
          "u_1_chairs": 10,
          "u_1_materials": 10,
          "u_1_inf_control": 10,
          "u_2_daily_reg": 10,
          "u_2_spend_reg": 10,
          "u_2_docs_reg": 10,
          "u_2_chairs": 10,
          "u_2_materials": 10,
          "u_2_inf_control": 10,
          "u_3_daily_reg": 10,
          "u_3_spend_reg": 10,
          "u_3_docs_reg": 10,
          "u_3_chairs": 10,
          "u_3_materials": 10,
          "u_3_inf_control": 10,
          "u_4_daily_reg": 10,
          "u_4_spend_reg": 10,
          "u_4_docs_reg": 10,
          "u_4_chairs": 10,
          "u_4_materials": 10,
          "u_4_inf_control": 10,
          "u_5_daily_reg": 10,
          "u_5_spend_reg": 10,
          "u_5_docs_reg": 10,
          "u_5_chairs": 10,
          "u_5_materials": 10,
          "u_5_inf_control": 10,
          "u_6_daily_reg": 10,
          "u_6_spend_reg": 10,
          "u_6_docs_reg": 10,
          "u_6_chairs": 10,
          "u_6_materials": 10,
          "u_6_inf_control": 10,
          "u_7_daily_reg": 10,
          "u_7_spend_reg": 10,
          "u_7_docs_reg": 10,
          "u_7_chairs": 10,
          "u_7_materials": 10,
          "u_7_inf_control": 10,
          "u_8_daily_reg": 10,
          "u_8_spend_reg": 10,
          "u_8_docs_reg": 10,
          "u_8_chairs": 10,
          "u_8_materials": 10,
          "u_8_inf_control": 10,
          "u_9_daily_reg": 10,
          "u_9_spend_reg": 10,
          "u_9_docs_reg": 10,
          "u_9_chairs": 10,
          "u_9_materials": 10,
          "u_9_inf_control": 10,
          "u_10_daily_reg": 10,
          "u_10_spend_reg": 10,
          "u_10_docs_reg": 10,
          "u_10_chairs": 10,
          "u_10_materials": 10,
          "u_10_inf_control": 10,
          "u_11_daily_reg": 10,
          "u_11_spend_reg": 10,
          "u_11_docs_reg": 10,
          "u_11_chairs": 10,
          "u_11_materials": 10,
          "u_11_inf_control": 10,
          "inf_waste_reg": 30,
          "inf_injury_reg": 30,
          "inf_vaccines": 40
        }
      },
      {
        "id": 2002,
        "name": "مركز أسنان تخصصي بغداد الجديدة",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2039,
        "name": "مركز أسنان تخصصي الصدر",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "دائرة صحة بغداد / الكرخ",
    "description": "تغطي الجانب الغربي من العاصمة بغداد والبلدات التابعة لها",
    "location": "بغداد - الكرخ",
    "sectors": [
      {
        "id": 201,
        "name": "قطاع الكرخ",
        "healthCenters": [
          {
            "id": 1008,
            "name": "مركز صحي الشواكة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 1009,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3058,
            "name": "مركز صحي الكريمات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3059,
            "name": "مركز صحي الرحمانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3060,
            "name": "مركز صحي الشيخ معروف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 202,
        "name": "قطاع الكاظمية",
        "healthCenters": [
          {
            "id": 1010,
            "name": "م.ص النور",
            "status": "evaluated",
            "score": 93,
            "serviceScore": 40,
            "indicatorScore": 53,
            "answers": {
              "s_fillings": 10,
              "s_extractions": 10,
              "s_cleaning": 10,
              "s_exam": 10,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1011,
            "name": "م.ص الخطيب",
            "status": "evaluated",
            "score": 80,
            "serviceScore": 23,
            "indicatorScore": 57,
            "answers": {
              "s_fillings": 6,
              "s_extractions": 6,
              "s_cleaning": 6,
              "s_exam": 6,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1025,
            "name": "م.ص الجوادين",
            "status": "evaluated",
            "score": 77,
            "serviceScore": 23,
            "indicatorScore": 54,
            "answers": {
              "s_fillings": 6,
              "s_extractions": 6,
              "s_cleaning": 6,
              "s_exam": 6,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1026,
            "name": "م.ص العراق الجديد",
            "status": "evaluated",
            "score": 72,
            "serviceScore": 25,
            "indicatorScore": 47,
            "answers": {
              "s_fillings": 6,
              "s_extractions": 6,
              "s_cleaning": 6,
              "s_exam": 6,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1027,
            "name": "م.ص الوفاء",
            "status": "evaluated",
            "score": 70,
            "serviceScore": 23,
            "indicatorScore": 47,
            "answers": {
              "s_fillings": 6,
              "s_extractions": 6,
              "s_cleaning": 6,
              "s_exam": 6,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1028,
            "name": "م.ص الشهيد الصدر",
            "status": "evaluated",
            "score": 69,
            "serviceScore": 16,
            "indicatorScore": 53,
            "answers": {
              "s_fillings": 4,
              "s_extractions": 4,
              "s_cleaning": 4,
              "s_exam": 4,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          }
        ]
      },
      {
        "id": 203,
        "name": "قطاع المنصور",
        "healthCenters": [
          {
            "id": 3061,
            "name": "مركز صحي الداودي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3062,
            "name": "مركز صحي اليرموك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3063,
            "name": "مركز صحي الحارثية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3064,
            "name": "مركز صحي الإسكان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3065,
            "name": "مركز صحي الوشاش",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 204,
        "name": "قطاع الدورة",
        "healthCenters": [
          {
            "id": 3066,
            "name": "مركز صحي أبو تشير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3067,
            "name": "مركز صحي الميكانيك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3068,
            "name": "مركز صحي الآثاريين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3069,
            "name": "مركز صحي هور رجب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3070,
            "name": "مركز صحي الوادي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 205,
        "name": "قطاع المحمودية",
        "healthCenters": [
          {
            "id": 3071,
            "name": "مركز صحي الرشيد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3072,
            "name": "مركز صحي اللطيفية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3073,
            "name": "مركز صحي اليوسفية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3074,
            "name": "مركز صحي صدر اليوسفية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3075,
            "name": "مركز صحي اليوسفية الثانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 206,
        "name": "قطاع التاجي",
        "healthCenters": [
          {
            "id": 3076,
            "name": "مركز صحي التاجي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3077,
            "name": "مركز صحي التاجي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3078,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3079,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3080,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 207,
        "name": "قطاع الطارمية",
        "healthCenters": [
          {
            "id": 3081,
            "name": "مركز صحي الطارمية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3082,
            "name": "مركز صحي الطارمية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3083,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3084,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3085,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 208,
        "name": "قطاع أبو غريب",
        "healthCenters": [
          {
            "id": 3086,
            "name": "مركز صحي النصر والسلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3087,
            "name": "مركز صحي الزيدان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3088,
            "name": "مركز صحي خان ضاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3089,
            "name": "مركز صحي عكركوف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3090,
            "name": "مركز صحي الحمدانية الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 209,
        "name": "قطاع الرضوانية",
        "healthCenters": [
          {
            "id": 3091,
            "name": "مركز صحي الرضوانية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3092,
            "name": "مركز صحي الرضوانية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3093,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3094,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3095,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 210,
        "name": "قطاع البياع",
        "healthCenters": [
          {
            "id": 3096,
            "name": "مركز صحي البياع الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3097,
            "name": "مركز صحي البياع النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3098,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3099,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3100,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 211,
        "name": "قطاع حي العامل",
        "healthCenters": [
          {
            "id": 3101,
            "name": "مركز صحي حي العامل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3102,
            "name": "مركز صحي حي العامل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3103,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3104,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3105,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 212,
        "name": "قطاع الحرية",
        "healthCenters": [
          {
            "id": 3106,
            "name": "مركز صحي الحرية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3107,
            "name": "مركز صحي الحرية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3108,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3109,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3110,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 213,
        "name": "قطاع اليوسفية",
        "healthCenters": [
          {
            "id": 3111,
            "name": "مركز صحي اليوسفية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3112,
            "name": "مركز صحي اليوسفية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3113,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3114,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3115,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 214,
        "name": "قطاع اللطيفية",
        "healthCenters": [
          {
            "id": 3116,
            "name": "مركز صحي اللطيفية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3117,
            "name": "مركز صحي اللطيفية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3118,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3119,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3120,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2003,
        "name": "مركز أسنان تخصصي الكرخ",
        "status": "evaluated",
        "score": 83,
        "stage1Score": 85,
        "stage2Score": 81,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "answers": {
          "u_1_daily_reg": 10,
          "u_1_spend_reg": 10,
          "u_1_docs_reg": 10,
          "u_1_chairs": 10,
          "u_1_materials": 10,
          "u_1_inf_control": 10,
          "u_2_daily_reg": 10,
          "u_2_spend_reg": 10,
          "u_2_docs_reg": 10,
          "u_2_chairs": 10,
          "u_2_materials": 10,
          "u_2_inf_control": 10,
          "u_3_daily_reg": 10,
          "u_3_spend_reg": 10,
          "u_3_docs_reg": 10,
          "u_3_chairs": 10,
          "u_3_materials": 10,
          "u_3_inf_control": 10,
          "u_4_daily_reg": 10,
          "u_4_spend_reg": 10,
          "u_4_docs_reg": 10,
          "u_4_chairs": 10,
          "u_4_materials": 10,
          "u_4_inf_control": 10,
          "u_5_daily_reg": 10,
          "u_5_spend_reg": 10,
          "u_5_docs_reg": 10,
          "u_5_chairs": 10,
          "u_5_materials": 10,
          "u_5_inf_control": 10,
          "u_6_daily_reg": 10,
          "u_6_spend_reg": 10,
          "u_6_docs_reg": 10,
          "u_6_chairs": 10,
          "u_6_materials": 10,
          "u_6_inf_control": 10,
          "u_7_daily_reg": 10,
          "u_7_spend_reg": 10,
          "u_7_docs_reg": 10,
          "u_7_chairs": 10,
          "u_7_materials": 10,
          "u_7_inf_control": 10,
          "u_8_daily_reg": 10,
          "u_8_spend_reg": 10,
          "u_8_docs_reg": 10,
          "u_8_chairs": 10,
          "u_8_materials": 10,
          "u_8_inf_control": 10,
          "u_9_daily_reg": 10,
          "u_9_spend_reg": 10,
          "u_9_docs_reg": 10,
          "u_9_chairs": 10,
          "u_9_materials": 10,
          "u_9_inf_control": 10,
          "u_10_daily_reg": 10,
          "u_10_spend_reg": 10,
          "u_10_docs_reg": 10,
          "u_10_chairs": 10,
          "u_10_materials": 10,
          "u_10_inf_control": 10,
          "u_11_daily_reg": 10,
          "u_11_spend_reg": 10,
          "u_11_docs_reg": 10,
          "u_11_chairs": 10,
          "u_11_materials": 10,
          "u_11_inf_control": 10,
          "inf_waste_reg": 30,
          "inf_injury_reg": 30,
          "inf_vaccines": 40
        }
      },
      {
        "id": 2040,
        "name": "مركز أسنان تخصصي العامرية",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2041,
        "name": "مركز أسنان تخصصي المحمودية",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "دائرة صحة صلاح الدين",
    "description": "تغطي محافظة صلاح الدين بجميع أقضيتها ونواحيها",
    "location": "صلاح الدين - تكريت",
    "sectors": [
      {
        "id": 301,
        "name": "قطاع تكريت",
        "healthCenters": [
          {
            "id": 1012,
            "name": "مركز صحي تكريت",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1013,
            "name": "مركز صحي العلم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3121,
            "name": "مركز صحي حي الزهور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3122,
            "name": "مركز صحي الديوم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3123,
            "name": "مركز صحي العلم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 302,
        "name": "قطاع سامراء",
        "healthCenters": [
          {
            "id": 3124,
            "name": "مركز صحي الجبيرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3125,
            "name": "مركز صحي الخضراء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3126,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3127,
            "name": "مركز صحي الجيزانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3128,
            "name": "مركز صحي المعتصم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 303,
        "name": "قطاع بيجي",
        "healthCenters": [
          {
            "id": 3129,
            "name": "مركز صحي البعيجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3130,
            "name": "مركز صحي التحرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3131,
            "name": "مركز صحي الزيتون",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3132,
            "name": "مركز صحي الصينية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3133,
            "name": "مركز صحي البو جواري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3134,
            "name": "مركز صحي الزوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3135,
            "name": "مركز صحي البو طعمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3136,
            "name": "مركز صحي الحجاج",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3137,
            "name": "مركز صحي مكحول",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 304,
        "name": "قطاع بلد",
        "healthCenters": [
          {
            "id": 3138,
            "name": "مركز صحي يثرب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3139,
            "name": "مركز صحي الضلوعية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3140,
            "name": "مركز صحي عزيز بلد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3141,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3142,
            "name": "مركز صحي بلد الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 305,
        "name": "قطاع الدجيل",
        "healthCenters": [
          {
            "id": 3143,
            "name": "مركز صحي الشيخ جميل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3144,
            "name": "مركز صحي البو علوان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3145,
            "name": "مركز صحي السجلة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3146,
            "name": "مركز صحي الدجيل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3147,
            "name": "مركز صحي الدجيل الجنوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 306,
        "name": "قطاع طوزخورماتو",
        "healthCenters": [
          {
            "id": 3148,
            "name": "مركز صحي سليمان بيك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3149,
            "name": "مركز صحي ينكجة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3150,
            "name": "مركز صحي بسطاملي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3151,
            "name": "مركز صحي آمرلي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3152,
            "name": "مركز صحي الطوز الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 307,
        "name": "قطاع الشرقاط",
        "healthCenters": [
          {
            "id": 3153,
            "name": "مركز صحي سديرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3154,
            "name": "مركز صحي مسحك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3155,
            "name": "مركز صحي الخصم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3156,
            "name": "مركز صحي جميلة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3157,
            "name": "مركز صحي اجمسة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 308,
        "name": "قطاع الدور",
        "healthCenters": [
          {
            "id": 3158,
            "name": "مركز صحي الدور الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3159,
            "name": "مركز صحي الدور النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3160,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3161,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3162,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 309,
        "name": "قطاع العلم",
        "healthCenters": [
          {
            "id": 3163,
            "name": "مركز صحي العلم الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3164,
            "name": "مركز صحي العلم النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3165,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3166,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3167,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 310,
        "name": "قطاع سليمان بيك",
        "healthCenters": [
          {
            "id": 3168,
            "name": "مركز صحي سليمان بيك الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3169,
            "name": "مركز صحي سليمان بيك النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3170,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3171,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3172,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 311,
        "name": "قطاع يثرب",
        "healthCenters": [
          {
            "id": 3173,
            "name": "مركز صحي يثرب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3174,
            "name": "مركز صحي يثرب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3175,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3176,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3177,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 312,
        "name": "قطاع الضلوعية",
        "healthCenters": [
          {
            "id": 3178,
            "name": "مركز صحي الضلوعية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3179,
            "name": "مركز صحي الضلوعية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3180,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3181,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3182,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 313,
        "name": "قطاع حمرين",
        "healthCenters": [
          {
            "id": 3183,
            "name": "مركز صحي حمرين الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3184,
            "name": "مركز صحي حمرين النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3185,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3186,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3187,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2004,
        "name": "المركز التخصصي لطب الأسنان في تكريت",
        "status": "evaluated",
        "score": 79,
        "stage1Score": 81,
        "stage2Score": 77,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "answers": {
          "u_1_daily_reg": 10,
          "u_1_spend_reg": 10,
          "u_1_docs_reg": 10,
          "u_1_chairs": 10,
          "u_1_materials": 10,
          "u_1_inf_control": 10,
          "u_2_daily_reg": 10,
          "u_2_spend_reg": 10,
          "u_2_docs_reg": 10,
          "u_2_chairs": 10,
          "u_2_materials": 10,
          "u_2_inf_control": 10,
          "u_3_daily_reg": 10,
          "u_3_spend_reg": 10,
          "u_3_docs_reg": 10,
          "u_3_chairs": 10,
          "u_3_materials": 10,
          "u_3_inf_control": 10,
          "u_4_daily_reg": 10,
          "u_4_spend_reg": 10,
          "u_4_docs_reg": 10,
          "u_4_chairs": 10,
          "u_4_materials": 10,
          "u_4_inf_control": 10,
          "u_5_daily_reg": 10,
          "u_5_spend_reg": 10,
          "u_5_docs_reg": 10,
          "u_5_chairs": 10,
          "u_5_materials": 10,
          "u_5_inf_control": 10,
          "u_6_daily_reg": 10,
          "u_6_spend_reg": 10,
          "u_6_docs_reg": 10,
          "u_6_chairs": 10,
          "u_6_materials": 10,
          "u_6_inf_control": 10,
          "u_7_daily_reg": 10,
          "u_7_spend_reg": 10,
          "u_7_docs_reg": 10,
          "u_7_chairs": 10,
          "u_7_materials": 10,
          "u_7_inf_control": 10,
          "u_8_daily_reg": 10,
          "u_8_spend_reg": 10,
          "u_8_docs_reg": 10,
          "u_8_chairs": 10,
          "u_8_materials": 10,
          "u_8_inf_control": 10,
          "u_9_daily_reg": 10,
          "u_9_spend_reg": 10,
          "u_9_docs_reg": 10,
          "u_9_chairs": 10,
          "u_9_materials": 10,
          "u_9_inf_control": 10,
          "u_10_daily_reg": 10,
          "u_10_spend_reg": 10,
          "u_10_docs_reg": 10,
          "u_10_chairs": 10,
          "u_10_materials": 10,
          "u_10_inf_control": 10,
          "u_11_daily_reg": 10,
          "u_11_spend_reg": 10,
          "u_11_docs_reg": 10,
          "u_11_chairs": 10,
          "u_11_materials": 10,
          "u_11_inf_control": 10,
          "inf_waste_reg": 30,
          "inf_injury_reg": 30,
          "inf_vaccines": 40
        }
      }
    ]
  },
  {
    "id": 4,
    "name": "دائرة صحة البصرة",
    "description": "تغطي محافظة البصرة وجميع أقضيتها ونواحيها الجنوبية والشرقية",
    "location": "البصرة",
    "sectors": [
      {
        "id": 401,
        "name": "قطاع البصرة الأول",
        "healthCenters": [
          {
            "id": 1019,
            "name": "مركز صحي البصرة",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1020,
            "name": "مركز صحي العشار",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 1021,
            "name": "مركز صحي الجبيلة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3188,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3189,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 402,
        "name": "قطاع البصرة الثاني",
        "healthCenters": [
          {
            "id": 1022,
            "name": "مركز صحي الزبير",
            "status": "evaluated",
            "score": 78,
            "serviceScore": 30,
            "indicatorScore": 48,
            "answers": {
              "s_fillings": 8,
              "s_extractions": 8,
              "s_cleaning": 8,
              "s_exam": 8,
              "q_chair": 2,
              "q_xray": 2,
              "q_materials": 2,
              "q_fridge": 1,
              "q_daily_reg": 2,
              "q_spend_reg": 2,
              "q_referrals": 2,
              "q_ocp_reg": 2,
              "q_ocp_visits": 2,
              "q_ocp_card": 2,
              "q_ocp_dentists": 2,
              "q_ocp_parents": 2,
              "q_ocp_school": 1,
              "q_ocp_parent_card": 2,
              "q_ocp_workshop": 2,
              "q_inf_prec": 2,
              "q_inf_safety": 2,
              "q_inf_waste": 2,
              "q_inf_ultra": 2,
              "q_inf_autoclave": 2,
              "q_inf_clean": 2,
              "q_inf_vaccine": 2,
              "q_inf_extractor": 2,
              "q_inf_wrapper": 2,
              "q_inf_guidelines": 2,
              "q_inf_tools": 2,
              "q_inf_training": 2
            }
          },
          {
            "id": 3190,
            "name": "مركز صحي البصرة الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3191,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3192,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3193,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 403,
        "name": "قطاع الزبير",
        "healthCenters": [
          {
            "id": 3194,
            "name": "مركز صحي الزبير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3195,
            "name": "مركز صحي الزبير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3196,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3197,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3198,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 404,
        "name": "قطاع أبو الخصيب",
        "healthCenters": [
          {
            "id": 3199,
            "name": "مركز صحي أبو الخصيب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3200,
            "name": "مركز صحي أبو الخصيب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3201,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3202,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3203,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 405,
        "name": "قطاع القرنة",
        "healthCenters": [
          {
            "id": 3204,
            "name": "مركز صحي القرنة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3205,
            "name": "مركز صحي القرنة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3206,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3207,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3208,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 406,
        "name": "قطاع شط العرب",
        "healthCenters": [
          {
            "id": 3209,
            "name": "مركز صحي شط العرب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3210,
            "name": "مركز صحي شط العرب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3211,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3212,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3213,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 407,
        "name": "قطاع الفاو",
        "healthCenters": [
          {
            "id": 3214,
            "name": "مركز صحي الفاو الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3215,
            "name": "مركز صحي الفاو النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3216,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3217,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3218,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 408,
        "name": "قطاع المدينة",
        "healthCenters": [
          {
            "id": 3219,
            "name": "مركز صحي المدينة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3220,
            "name": "مركز صحي المدينة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3221,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3222,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3223,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 409,
        "name": "قطاع الهارثة",
        "healthCenters": [
          {
            "id": 3224,
            "name": "مركز صحي الهارثة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3225,
            "name": "مركز صحي الهارثة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3226,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3227,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3228,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 410,
        "name": "قطاع سفوان",
        "healthCenters": [
          {
            "id": 3229,
            "name": "مركز صحي سفوان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3230,
            "name": "مركز صحي سفوان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3231,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3232,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3233,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 411,
        "name": "قطاع أم قصر",
        "healthCenters": [
          {
            "id": 3234,
            "name": "مركز صحي أم قصر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3235,
            "name": "مركز صحي أم قصر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3236,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3237,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3238,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 412,
        "name": "قطاع نشوة",
        "healthCenters": [
          {
            "id": 3239,
            "name": "مركز صحي نشوة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3240,
            "name": "مركز صحي نشوة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3241,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3242,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3243,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 413,
        "name": "قطاع الدير",
        "healthCenters": [
          {
            "id": 3244,
            "name": "مركز صحي الدير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3245,
            "name": "مركز صحي الدير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3246,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3247,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3248,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 414,
        "name": "قطاع السيبة",
        "healthCenters": [
          {
            "id": 3249,
            "name": "مركز صحي السيبة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3250,
            "name": "مركز صحي السيبة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3251,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3252,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3253,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2005,
        "name": "مركز أسنان تخصصي البصرة التخصصي",
        "status": "evaluated",
        "score": 92,
        "stage1Score": 94,
        "stage2Score": 90,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "answers": {
          "u_1_daily_reg": 10,
          "u_1_spend_reg": 10,
          "u_1_docs_reg": 10,
          "u_1_chairs": 10,
          "u_1_materials": 10,
          "u_1_inf_control": 10,
          "u_2_daily_reg": 10,
          "u_2_spend_reg": 10,
          "u_2_docs_reg": 10,
          "u_2_chairs": 10,
          "u_2_materials": 10,
          "u_2_inf_control": 10,
          "u_3_daily_reg": 10,
          "u_3_spend_reg": 10,
          "u_3_docs_reg": 10,
          "u_3_chairs": 10,
          "u_3_materials": 10,
          "u_3_inf_control": 10,
          "u_4_daily_reg": 10,
          "u_4_spend_reg": 10,
          "u_4_docs_reg": 10,
          "u_4_chairs": 10,
          "u_4_materials": 10,
          "u_4_inf_control": 10,
          "u_5_daily_reg": 10,
          "u_5_spend_reg": 10,
          "u_5_docs_reg": 10,
          "u_5_chairs": 10,
          "u_5_materials": 10,
          "u_5_inf_control": 10,
          "u_6_daily_reg": 10,
          "u_6_spend_reg": 10,
          "u_6_docs_reg": 10,
          "u_6_chairs": 10,
          "u_6_materials": 10,
          "u_6_inf_control": 10,
          "u_7_daily_reg": 10,
          "u_7_spend_reg": 10,
          "u_7_docs_reg": 10,
          "u_7_chairs": 10,
          "u_7_materials": 10,
          "u_7_inf_control": 10,
          "u_8_daily_reg": 10,
          "u_8_spend_reg": 10,
          "u_8_docs_reg": 10,
          "u_8_chairs": 10,
          "u_8_materials": 10,
          "u_8_inf_control": 10,
          "u_9_daily_reg": 10,
          "u_9_spend_reg": 10,
          "u_9_docs_reg": 10,
          "u_9_chairs": 10,
          "u_9_materials": 10,
          "u_9_inf_control": 10,
          "u_10_daily_reg": 10,
          "u_10_spend_reg": 10,
          "u_10_docs_reg": 10,
          "u_10_chairs": 10,
          "u_10_materials": 10,
          "u_10_inf_control": 10,
          "u_11_daily_reg": 10,
          "u_11_spend_reg": 10,
          "u_11_docs_reg": 10,
          "u_11_chairs": 10,
          "u_11_materials": 10,
          "u_11_inf_control": 10,
          "inf_waste_reg": 30,
          "inf_injury_reg": 30,
          "inf_vaccines": 40
        }
      },
      {
        "id": 2006,
        "name": "مركز أسنان تخصصي المعقل التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2044,
        "name": "مركز أسنان تخصصي الزبير التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "دائرة صحة نينوى",
    "description": "تغطي محافظة نينوى ومركزها مدينة الموصل وباقي أقضيتها الشمالية والجنوبية",
    "location": "نينوى - الموصل",
    "sectors": [
      {
        "id": 501,
        "name": "قطاع الموصل الأيمن",
        "healthCenters": [
          {
            "id": 3254,
            "name": "مركز صحي الموصل الأيمن الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3255,
            "name": "مركز صحي الموصل الأيمن النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3256,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3257,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3258,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 502,
        "name": "قطاع الموصل الأيسر",
        "healthCenters": [
          {
            "id": 3259,
            "name": "مركز صحي الموصل الأيسر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3260,
            "name": "مركز صحي الموصل الأيسر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3261,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3262,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3263,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 503,
        "name": "قطاع تلعفر",
        "healthCenters": [
          {
            "id": 3264,
            "name": "مركز صحي تلعفر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3265,
            "name": "مركز صحي تلعفر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3266,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3267,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3268,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 504,
        "name": "قطاع سنجار",
        "healthCenters": [
          {
            "id": 3269,
            "name": "مركز صحي سنجار الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3270,
            "name": "مركز صحي سنجار النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3271,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3272,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3273,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 505,
        "name": "قطاع الحضر",
        "healthCenters": [
          {
            "id": 3274,
            "name": "مركز صحي الحضر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3275,
            "name": "مركز صحي الحضر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3276,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3277,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3278,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 506,
        "name": "قطاع الشيخان",
        "healthCenters": [
          {
            "id": 3279,
            "name": "مركز صحي الشيخان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3280,
            "name": "مركز صحي الشيخان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3281,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3282,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3283,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 507,
        "name": "قطاع تلكيف",
        "healthCenters": [
          {
            "id": 3284,
            "name": "مركز صحي تلكيف الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3285,
            "name": "مركز صحي تلكيف النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3286,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3287,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3288,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 508,
        "name": "قطاع الحمدانية",
        "healthCenters": [
          {
            "id": 3289,
            "name": "مركز صحي الحمدانية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3290,
            "name": "مركز صحي الحمدانية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3291,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3292,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3293,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 509,
        "name": "قطاع البعاج",
        "healthCenters": [
          {
            "id": 3294,
            "name": "مركز صحي البعاج الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3295,
            "name": "مركز صحي البعاج النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3296,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3297,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3298,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 510,
        "name": "قطاع مخمور",
        "healthCenters": [
          {
            "id": 3299,
            "name": "مركز صحي مخمور الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3300,
            "name": "مركز صحي مخمور النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3301,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3302,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3303,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 511,
        "name": "قطاع ربيعة",
        "healthCenters": [
          {
            "id": 3304,
            "name": "مركز صحي ربيعة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3305,
            "name": "مركز صحي ربيعة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3306,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3307,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3308,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 512,
        "name": "قطاع زمار",
        "healthCenters": [
          {
            "id": 3309,
            "name": "مركز صحي زمار الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3310,
            "name": "مركز صحي زمار النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3311,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3312,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3313,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 513,
        "name": "قطاع القيارة",
        "healthCenters": [
          {
            "id": 3314,
            "name": "مركز صحي القيارة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3315,
            "name": "مركز صحي القيارة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3316,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3317,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3318,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 514,
        "name": "قطاع العياضية",
        "healthCenters": [
          {
            "id": 3319,
            "name": "مركز صحي العياضية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3320,
            "name": "مركز صحي العياضية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3321,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3322,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3323,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 515,
        "name": "قطاع حمام العليل",
        "healthCenters": [
          {
            "id": 3324,
            "name": "مركز صحي حمام العليل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3325,
            "name": "مركز صحي حمام العليل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3326,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3327,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3328,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 516,
        "name": "قطاع برطلة",
        "healthCenters": [
          {
            "id": 3329,
            "name": "مركز صحي برطلة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3330,
            "name": "مركز صحي برطلة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3331,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3332,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3333,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 517,
        "name": "قطاع النمرود",
        "healthCenters": [
          {
            "id": 3334,
            "name": "مركز صحي النمرود الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3335,
            "name": "مركز صحي النمرود النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3336,
            "name": "مركز صحي حي النور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3337,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3338,
            "name": "مركز صحي حي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2007,
        "name": "مركز أسنان تخصصي نينوى التخصصي",
        "status": "evaluated",
        "score": 79,
        "stage1Score": 81,
        "stage2Score": 77,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ],
        "answers": {
          "u_1_daily_reg": 10,
          "u_1_spend_reg": 10,
          "u_1_docs_reg": 10,
          "u_1_chairs": 10,
          "u_1_materials": 10,
          "u_1_inf_control": 10,
          "u_2_daily_reg": 10,
          "u_2_spend_reg": 10,
          "u_2_docs_reg": 10,
          "u_2_chairs": 10,
          "u_2_materials": 10,
          "u_2_inf_control": 10,
          "u_3_daily_reg": 10,
          "u_3_spend_reg": 10,
          "u_3_docs_reg": 10,
          "u_3_chairs": 10,
          "u_3_materials": 10,
          "u_3_inf_control": 10,
          "u_4_daily_reg": 10,
          "u_4_spend_reg": 10,
          "u_4_docs_reg": 10,
          "u_4_chairs": 10,
          "u_4_materials": 10,
          "u_4_inf_control": 10,
          "u_5_daily_reg": 10,
          "u_5_spend_reg": 10,
          "u_5_docs_reg": 10,
          "u_5_chairs": 10,
          "u_5_materials": 10,
          "u_5_inf_control": 10,
          "u_6_daily_reg": 10,
          "u_6_spend_reg": 10,
          "u_6_docs_reg": 10,
          "u_6_chairs": 10,
          "u_6_materials": 10,
          "u_6_inf_control": 10,
          "u_7_daily_reg": 10,
          "u_7_spend_reg": 10,
          "u_7_docs_reg": 10,
          "u_7_chairs": 10,
          "u_7_materials": 10,
          "u_7_inf_control": 10,
          "u_8_daily_reg": 10,
          "u_8_spend_reg": 10,
          "u_8_docs_reg": 10,
          "u_8_chairs": 10,
          "u_8_materials": 10,
          "u_8_inf_control": 10,
          "u_9_daily_reg": 10,
          "u_9_spend_reg": 10,
          "u_9_docs_reg": 10,
          "u_9_chairs": 10,
          "u_9_materials": 10,
          "u_9_inf_control": 10,
          "u_10_daily_reg": 10,
          "u_10_spend_reg": 10,
          "u_10_docs_reg": 10,
          "u_10_chairs": 10,
          "u_10_materials": 10,
          "u_10_inf_control": 10,
          "u_11_daily_reg": 10,
          "u_11_spend_reg": 10,
          "u_11_docs_reg": 10,
          "u_11_chairs": 10,
          "u_11_materials": 10,
          "u_11_inf_control": 10,
          "inf_waste_reg": 30,
          "inf_injury_reg": 30,
          "inf_vaccines": 40
        }
      },
      {
        "id": 2008,
        "name": "مركز أسنان تخصصي الحدباء التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2045,
        "name": "مركز أسنان تخصصي تلعفر التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "دائرة صحة ذي قار",
    "description": "تغطي محافظة ذي قار وأقضيتها السبعة ومركزها مدينة الناصرية",
    "location": "ذي قار - الناصرية",
    "sectors": [
      {
        "id": 601,
        "name": "قطاع الناصرية",
        "healthCenters": [
          {
            "id": 3339,
            "name": "مركز صحي الناصرية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3340,
            "name": "مركز صحي الناصرية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3341,
            "name": "مركز صحي أريدو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3342,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3343,
            "name": "مركز صحي الفداء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 602,
        "name": "قطاع الشطرة",
        "healthCenters": [
          {
            "id": 3344,
            "name": "مركز صحي الشطرة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3345,
            "name": "مركز صحي الشطرة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3346,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3347,
            "name": "مركز صحي الفداء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3348,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 603,
        "name": "قطاع الرفاعي",
        "healthCenters": [
          {
            "id": 3349,
            "name": "مركز صحي الرفاعي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3350,
            "name": "مركز صحي الرفاعي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3351,
            "name": "مركز صحي الفداء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3352,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3353,
            "name": "مركز صحي الغراف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 604,
        "name": "قطاع سوق الشيوخ",
        "healthCenters": [
          {
            "id": 3354,
            "name": "مركز صحي سوق الشيوخ الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3355,
            "name": "مركز صحي سوق الشيوخ النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3356,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3357,
            "name": "مركز صحي الغراف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3358,
            "name": "مركز صحي البطحاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 605,
        "name": "قطاع الجبايش",
        "healthCenters": [
          {
            "id": 3359,
            "name": "مركز صحي الجبايش الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3360,
            "name": "مركز صحي الجبايش النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3361,
            "name": "مركز صحي الغراف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3362,
            "name": "مركز صحي البطحاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3363,
            "name": "مركز صحي الغدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 606,
        "name": "قطاع الغراف",
        "healthCenters": [
          {
            "id": 3364,
            "name": "مركز صحي الغراف الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3365,
            "name": "مركز صحي الغراف النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3366,
            "name": "مركز صحي البطحاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3367,
            "name": "مركز صحي الغدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3368,
            "name": "مركز صحي سيد دخيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 607,
        "name": "قطاع قلعة سكر",
        "healthCenters": [
          {
            "id": 3369,
            "name": "مركز صحي قلعة سكر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3370,
            "name": "مركز صحي قلعة سكر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3371,
            "name": "مركز صحي الغدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3372,
            "name": "مركز صحي سيد دخيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3373,
            "name": "مركز صحي الإصلاح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 608,
        "name": "قطاع الفجر",
        "healthCenters": [
          {
            "id": 3374,
            "name": "مركز صحي الفجر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3375,
            "name": "مركز صحي الفجر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3376,
            "name": "مركز صحي سيد دخيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3377,
            "name": "مركز صحي الإصلاح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3378,
            "name": "مركز صحي الفضيلية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 609,
        "name": "قطاع النصر",
        "healthCenters": [
          {
            "id": 3379,
            "name": "مركز صحي النصر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3380,
            "name": "مركز صحي النصر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3381,
            "name": "مركز صحي الإصلاح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3382,
            "name": "مركز صحي الفضيلية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3383,
            "name": "مركز صحي اور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 610,
        "name": "قطاع البطحاء",
        "healthCenters": [
          {
            "id": 3384,
            "name": "مركز صحي البطحاء الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3385,
            "name": "مركز صحي البطحاء النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3386,
            "name": "مركز صحي الفضيلية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3387,
            "name": "مركز صحي اور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3388,
            "name": "مركز صحي الحبوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 611,
        "name": "قطاع الدواية",
        "healthCenters": [
          {
            "id": 3389,
            "name": "مركز صحي الدواية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3390,
            "name": "مركز صحي الدواية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3391,
            "name": "مركز صحي اور",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3392,
            "name": "مركز صحي الحبوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3393,
            "name": "مركز صحي أريدو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 612,
        "name": "قطاع سيد دخيل",
        "healthCenters": [
          {
            "id": 3394,
            "name": "مركز صحي سيد دخيل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3395,
            "name": "مركز صحي سيد دخيل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3396,
            "name": "مركز صحي الحبوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3397,
            "name": "مركز صحي أريدو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3398,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 613,
        "name": "قطاع الفضيلية",
        "healthCenters": [
          {
            "id": 3399,
            "name": "مركز صحي الفضيلية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3400,
            "name": "مركز صحي الفضيلية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3401,
            "name": "مركز صحي أريدو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3402,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3403,
            "name": "مركز صحي الفداء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 614,
        "name": "قطاع الإصلاح",
        "healthCenters": [
          {
            "id": 3404,
            "name": "مركز صحي الإصلاح الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3405,
            "name": "مركز صحي الإصلاح النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3406,
            "name": "مركز صحي الصالحية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3407,
            "name": "مركز صحي الفداء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3408,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2009,
        "name": "مركز أسنان تخصصي الناصرية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2046,
        "name": "مركز أسنان تخصصي الشطرة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2047,
        "name": "مركز أسنان تخصصي سوق الشيوخ التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "دائرة صحة الأنبار",
    "description": "تغطي محافظة الأنبار الشاسعة بجميع أقضيتها الغربية والشرقية",
    "location": "الأنبار - الرمادي",
    "sectors": [
      {
        "id": 701,
        "name": "قطاع الرمادي",
        "healthCenters": [
          {
            "id": 3409,
            "name": "مركز صحي الرمادي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3410,
            "name": "مركز صحي الرمادي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3411,
            "name": "مركز صحي البوعساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3412,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3413,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 702,
        "name": "قطاع الفلوجة",
        "healthCenters": [
          {
            "id": 3414,
            "name": "مركز صحي الفلوجة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3415,
            "name": "مركز صحي الفلوجة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3416,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3417,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3418,
            "name": "مركز صحي الخالدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 703,
        "name": "قطاع هيت",
        "healthCenters": [
          {
            "id": 3419,
            "name": "مركز صحي هيت الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3420,
            "name": "مركز صحي هيت النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3421,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3422,
            "name": "مركز صحي الخالدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3423,
            "name": "مركز صحي الحبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 704,
        "name": "قطاع حديثة",
        "healthCenters": [
          {
            "id": 3424,
            "name": "مركز صحي حديثة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3425,
            "name": "مركز صحي حديثة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3426,
            "name": "مركز صحي الخالدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3427,
            "name": "مركز صحي الحبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3428,
            "name": "مركز صحي البغدادي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 705,
        "name": "قطاع عانة",
        "healthCenters": [
          {
            "id": 3429,
            "name": "مركز صحي عانة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3430,
            "name": "مركز صحي عانة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3431,
            "name": "مركز صحي الحبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3432,
            "name": "مركز صحي البغدادي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3433,
            "name": "مركز صحي العبيدي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 706,
        "name": "قطاع راوة",
        "healthCenters": [
          {
            "id": 3434,
            "name": "مركز صحي راوة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3435,
            "name": "مركز صحي راوة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3436,
            "name": "مركز صحي البغدادي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3437,
            "name": "مركز صحي العبيدي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3438,
            "name": "مركز صحي القيروان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 707,
        "name": "قطاع الرطبة",
        "healthCenters": [
          {
            "id": 3439,
            "name": "مركز صحي الرطبة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3440,
            "name": "مركز صحي الرطبة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3441,
            "name": "مركز صحي العبيدي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3442,
            "name": "مركز صحي القيروان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3443,
            "name": "مركز صحي البوعيثة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 708,
        "name": "قطاع القائم",
        "healthCenters": [
          {
            "id": 3444,
            "name": "مركز صحي القائم الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3445,
            "name": "مركز صحي القائم النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3446,
            "name": "مركز صحي القيروان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3447,
            "name": "مركز صحي البوعيثة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3448,
            "name": "مركز صحي النساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 709,
        "name": "قطاع الكرمة",
        "healthCenters": [
          {
            "id": 3449,
            "name": "مركز صحي الكرمة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3450,
            "name": "مركز صحي الكرمة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3451,
            "name": "مركز صحي البوعيثة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3452,
            "name": "مركز صحي النساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3453,
            "name": "مركز صحي الصقلاوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 710,
        "name": "قطاع الخالدية",
        "healthCenters": [
          {
            "id": 3454,
            "name": "مركز صحي الخالدية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3455,
            "name": "مركز صحي الخالدية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3456,
            "name": "مركز صحي النساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3457,
            "name": "مركز صحي الصقلاوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3458,
            "name": "مركز صحي البوعساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 711,
        "name": "قطاع الحبانية",
        "healthCenters": [
          {
            "id": 3459,
            "name": "مركز صحي الحبانية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3460,
            "name": "مركز صحي الحبانية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3461,
            "name": "مركز صحي الصقلاوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3462,
            "name": "مركز صحي البوعساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3463,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 712,
        "name": "قطاع البغدادي",
        "healthCenters": [
          {
            "id": 3464,
            "name": "مركز صحي البغدادي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3465,
            "name": "مركز صحي البغدادي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3466,
            "name": "مركز صحي البوعساف",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3467,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3468,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 713,
        "name": "قطاع العبيدي",
        "healthCenters": [
          {
            "id": 3469,
            "name": "مركز صحي العبيدي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3470,
            "name": "مركز صحي العبيدي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3471,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3472,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3473,
            "name": "مركز صحي الخالدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 714,
        "name": "قطاع القيروان",
        "healthCenters": [
          {
            "id": 3474,
            "name": "مركز صحي القيروان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3475,
            "name": "مركز صحي القيروان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3476,
            "name": "مركز صحي الفرات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3477,
            "name": "مركز صحي الخالدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3478,
            "name": "مركز صحي الحبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2010,
        "name": "مركز أسنان تخصصي الرمادي التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2024,
        "name": "مركز أسنان تخصصي الفلوجة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2048,
        "name": "مركز أسنان تخصصي هيت التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "دائرة صحة بابل",
    "description": "تغطي محافظة بابل ومركزها مدينة Hلة وأقضيتها المحيطة",
    "location": "بابل - الحلة",
    "sectors": [
      {
        "id": 801,
        "name": "قطاع الحلة الأول",
        "healthCenters": [
          {
            "id": 3479,
            "name": "مركز صحي الحلة الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3480,
            "name": "مركز صحي الحلة الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3481,
            "name": "مركز صحي المهندسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3482,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3483,
            "name": "مركز صحي الحمزة الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 802,
        "name": "قطاع الحلة الثاني",
        "healthCenters": [
          {
            "id": 3484,
            "name": "مركز صحي الحلة الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3485,
            "name": "مركز صحي الحلة الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3486,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3487,
            "name": "مركز صحي الحمزة الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3488,
            "name": "مركز صحي الإسكندرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 803,
        "name": "قطاع المحاويل",
        "healthCenters": [
          {
            "id": 3489,
            "name": "مركز صحي المحاويل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3490,
            "name": "مركز صحي المحاويل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3491,
            "name": "مركز صحي الحمزة الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3492,
            "name": "مركز صحي الإسكندرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3493,
            "name": "مركز صحي جرف النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 804,
        "name": "قطاع المسيب",
        "healthCenters": [
          {
            "id": 3494,
            "name": "مركز صحي المسيب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3495,
            "name": "مركز صحي المسيب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3496,
            "name": "مركز صحي الإسكندرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3497,
            "name": "مركز صحي جرف النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3498,
            "name": "مركز صحي الكفل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 805,
        "name": "قطاع الهاشمية",
        "healthCenters": [
          {
            "id": 3499,
            "name": "مركز صحي الهاشمية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3500,
            "name": "مركز صحي الهاشمية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3501,
            "name": "مركز صحي جرف النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3502,
            "name": "مركز صحي الكفل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3503,
            "name": "مركز صحي السدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 806,
        "name": "قطاع القاسم",
        "healthCenters": [
          {
            "id": 3504,
            "name": "مركز صحي القاسم الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3505,
            "name": "مركز صحي القاسم النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3506,
            "name": "مركز صحي الكفل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3507,
            "name": "مركز صحي السدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3508,
            "name": "مركز صحي نادر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 807,
        "name": "قطاع الحمزة الغربي",
        "healthCenters": [
          {
            "id": 3509,
            "name": "مركز صحي الحمزة الغربي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3510,
            "name": "مركز صحي الحمزة الغربي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3511,
            "name": "مركز صحي السدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3512,
            "name": "مركز صحي نادر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3513,
            "name": "مركز صحي باب المشهد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 808,
        "name": "قطاع الإسكندرية",
        "healthCenters": [
          {
            "id": 3514,
            "name": "مركز صحي الإسكندرية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3515,
            "name": "مركز صحي الإسكندرية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3516,
            "name": "مركز صحي نادر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3517,
            "name": "مركز صحي باب المشهد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3518,
            "name": "مركز صحي الثورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 809,
        "name": "قطاع جرف النصر",
        "healthCenters": [
          {
            "id": 3519,
            "name": "مركز صحي جرف النصر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3520,
            "name": "مركز صحي جرف النصر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3521,
            "name": "مركز صحي باب المشهد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3522,
            "name": "مركز صحي الثورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3523,
            "name": "مركز صحي الكرامة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 810,
        "name": "قطاع الكفل",
        "healthCenters": [
          {
            "id": 3524,
            "name": "مركز صحي الكفل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3525,
            "name": "مركز صحي الكفل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3526,
            "name": "مركز صحي الثورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3527,
            "name": "مركز صحي الكرامة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3528,
            "name": "مركز صحي المهندسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 811,
        "name": "قطاع السدة",
        "healthCenters": [
          {
            "id": 3529,
            "name": "مركز صحي السدة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3530,
            "name": "مركز صحي السدة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3531,
            "name": "مركز صحي الكرامة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3532,
            "name": "مركز صحي المهندسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3533,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 812,
        "name": "قطاع مشروع المسيب",
        "healthCenters": [
          {
            "id": 3534,
            "name": "مركز صحي مشروع المسيب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3535,
            "name": "مركز صحي مشروع المسيب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3536,
            "name": "مركز صحي المهندسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3537,
            "name": "مركز صحي الجزيرة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3538,
            "name": "مركز صحي الحمزة الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2100,
        "name": "مركز أسنان تخصصي الحلة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2101,
        "name": "مركز أسنان تخصصي المحاويل التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2102,
        "name": "مركز أسنان تخصصي المسيب التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 9,
    "name": "دائرة صحة كربلاء المقدسة",
    "description": "تغطي محافظة كربلاء وأقضيتها ونواحيها بالكامل والمناطق المحيطة",
    "location": "كربلاء المقدسة",
    "sectors": [
      {
        "id": 901,
        "name": "قطاع كربلاء الأول",
        "healthCenters": [
          {
            "id": 3539,
            "name": "مركز صحي كربلاء الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3540,
            "name": "مركز صحي كربلاء الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3541,
            "name": "مركز صحي الجدول الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3542,
            "name": "مركز صحي عون",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3543,
            "name": "مركز صحي حي الوفاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 902,
        "name": "قطاع كربلاء الثاني",
        "healthCenters": [
          {
            "id": 3544,
            "name": "مركز صحي كربلاء الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3545,
            "name": "مركز صحي كربلاء الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3546,
            "name": "مركز صحي عون",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3547,
            "name": "مركز صحي حي الوفاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3548,
            "name": "مركز صحي باب الخان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 903,
        "name": "قطاع الهندية",
        "healthCenters": [
          {
            "id": 3549,
            "name": "مركز صحي الهندية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3550,
            "name": "مركز صحي الهندية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3551,
            "name": "مركز صحي حي الوفاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3552,
            "name": "مركز صحي باب الخان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3553,
            "name": "مركز صحي باب السلالمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 904,
        "name": "قطاع عين التمر",
        "healthCenters": [
          {
            "id": 3554,
            "name": "مركز صحي عين التمر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3555,
            "name": "مركز صحي عين التمر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3556,
            "name": "مركز صحي باب الخان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3557,
            "name": "مركز صحي باب السلالمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3558,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 905,
        "name": "قطاع الحسينية",
        "healthCenters": [
          {
            "id": 3559,
            "name": "مركز صحي الحسينية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3560,
            "name": "مركز صحي الحسينية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3561,
            "name": "مركز صحي باب السلالمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3562,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3563,
            "name": "مركز صحي الملحق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 906,
        "name": "قطاع الحر",
        "healthCenters": [
          {
            "id": 3564,
            "name": "مركز صحي الحر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3565,
            "name": "مركز صحي الحر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3566,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3567,
            "name": "مركز صحي الملحق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3568,
            "name": "مركز صحي حي المعلمين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 907,
        "name": "قطاع الجدول الغربي",
        "healthCenters": [
          {
            "id": 3569,
            "name": "مركز صحي الجدول الغربي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3570,
            "name": "مركز صحي الجدول الغربي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3571,
            "name": "مركز صحي الملحق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3572,
            "name": "مركز صحي حي المعلمين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3573,
            "name": "مركز صحي الشباب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 908,
        "name": "قطاع عون",
        "healthCenters": [
          {
            "id": 3574,
            "name": "مركز صحي عون الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3575,
            "name": "مركز صحي عون النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3576,
            "name": "مركز صحي حي المعلمين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3577,
            "name": "مركز صحي الشباب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3578,
            "name": "مركز صحي الحر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 909,
        "name": "قطاع حي الوفاء",
        "healthCenters": [
          {
            "id": 3579,
            "name": "مركز صحي حي الوفاء الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3580,
            "name": "مركز صحي حي الوفاء النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3581,
            "name": "مركز صحي الشباب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3582,
            "name": "مركز صحي الحر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3583,
            "name": "مركز صحي الجدول الغربي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2103,
        "name": "مركز أسنان تخصصي كربلاء التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2104,
        "name": "مركز أسنان تخصصي الهندية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2105,
        "name": "مركز أسنان تخصصي الحسينية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "دائرة صحة النجف الأشرف",
    "description": "تغطي محافظة النجف ومركزها مدينة النجف الأشرف والكوفة وبقية الأقضية والبادية",
    "location": "النجف الأشرف",
    "sectors": [
      {
        "id": 1001,
        "name": "قطاع النجف الشمالي",
        "healthCenters": [
          {
            "id": 3584,
            "name": "مركز صحي النجف الشمالي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3585,
            "name": "مركز صحي النجف الشمالي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3586,
            "name": "مركز صحي العباسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3587,
            "name": "مركز صحي الرضوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3588,
            "name": "مركز صحي حي الأمير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1002,
        "name": "قطاع النجف الجنوبي",
        "healthCenters": [
          {
            "id": 3589,
            "name": "مركز صحي النجف الجنوبي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3590,
            "name": "مركز صحي النجف الجنوبي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3591,
            "name": "مركز صحي الرضوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3592,
            "name": "مركز صحي حي الأمير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3593,
            "name": "مركز صحي حي العدالة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1003,
        "name": "قطاع الكوفة",
        "healthCenters": [
          {
            "id": 3594,
            "name": "مركز صحي الكوفة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3595,
            "name": "مركز صحي الكوفة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3596,
            "name": "مركز صحي حي الأمير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3597,
            "name": "مركز صحي حي العدالة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3598,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1004,
        "name": "قطاع المناذرة",
        "healthCenters": [
          {
            "id": 3599,
            "name": "مركز صحي المناذرة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3600,
            "name": "مركز صحي المناذرة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3601,
            "name": "مركز صحي حي العدالة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3602,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3603,
            "name": "مركز صحي النجف القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1005,
        "name": "قطاع المشخاب",
        "healthCenters": [
          {
            "id": 3604,
            "name": "مركز صحي المشخاب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3605,
            "name": "مركز صحي المشخاب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3606,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3607,
            "name": "مركز صحي النجف القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3608,
            "name": "مركز صحي المشراق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1006,
        "name": "قطاع الحيدرية",
        "healthCenters": [
          {
            "id": 3609,
            "name": "مركز صحي الحيدرية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3610,
            "name": "مركز صحي الحيدرية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3611,
            "name": "مركز صحي النجف القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3612,
            "name": "مركز صحي المشراق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3613,
            "name": "مركز صحي المشخاب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1007,
        "name": "قطاع العباسية",
        "healthCenters": [
          {
            "id": 3614,
            "name": "مركز صحي العباسية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3615,
            "name": "مركز صحي العباسية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3616,
            "name": "مركز صحي المشراق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3617,
            "name": "مركز صحي المشخاب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3618,
            "name": "مركز صحي الحيدرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1008,
        "name": "قطاع الشبكة",
        "healthCenters": [
          {
            "id": 3619,
            "name": "مركز صحي الشبكة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3620,
            "name": "مركز صحي الشبكة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3621,
            "name": "مركز صحي المشخاب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3622,
            "name": "مركز صحي الحيدرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3623,
            "name": "مركز صحي العباسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1009,
        "name": "قطاع القادسية (النجف)",
        "healthCenters": [
          {
            "id": 3624,
            "name": "مركز صحي القادسية (النجف) الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3625,
            "name": "مركز صحي القادسية (النجف) النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3626,
            "name": "مركز صحي الحيدرية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3627,
            "name": "مركز صحي العباسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3628,
            "name": "مركز صحي الرضوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1010,
        "name": "قطاع الرضوية",
        "healthCenters": [
          {
            "id": 3629,
            "name": "مركز صحي الرضوية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3630,
            "name": "مركز صحي الرضوية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3631,
            "name": "مركز صحي العباسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3632,
            "name": "مركز صحي الرضوية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3633,
            "name": "مركز صحي حي الأمير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2106,
        "name": "مركز أسنان تخصصي النجف التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2107,
        "name": "مركز أسنان تخصصي الغري التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2108,
        "name": "مركز أسنان تخصصي الكوفة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 11,
    "name": "دائرة صحة القادسية",
    "description": "تغطي محافظة القادسية ومركزها مدينة الديوانية وأقضية الشامية وعفك والحمزة",
    "location": "القادسية - الديوانية",
    "sectors": [
      {
        "id": 1101,
        "name": "قطاع الديوانية الأول",
        "healthCenters": [
          {
            "id": 3634,
            "name": "مركز صحي الديوانية الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3635,
            "name": "مركز صحي الديوانية الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3636,
            "name": "مركز صحي سومر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3637,
            "name": "مركز صحي آل بدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3638,
            "name": "مركز صحي نفر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1102,
        "name": "قطاع الديوانية الثاني",
        "healthCenters": [
          {
            "id": 3639,
            "name": "مركز صحي الديوانية الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3640,
            "name": "مركز صحي الديوانية الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3641,
            "name": "مركز صحي آل بدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3642,
            "name": "مركز صحي نفر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3643,
            "name": "مركز صحي غماس",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1103,
        "name": "قطاع الشامية",
        "healthCenters": [
          {
            "id": 3644,
            "name": "مركز صحي الشامية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3645,
            "name": "مركز صحي الشامية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3646,
            "name": "مركز صحي نفر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3647,
            "name": "مركز صحي غماس",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3648,
            "name": "مركز صحي الشنافية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1104,
        "name": "قطاع عفك",
        "healthCenters": [
          {
            "id": 3649,
            "name": "مركز صحي عفك الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3650,
            "name": "مركز صحي عفك النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3651,
            "name": "مركز صحي غماس",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3652,
            "name": "مركز صحي الشنافية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3653,
            "name": "مركز صحي الشامية الجنوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1105,
        "name": "قطاع الحمزة",
        "healthCenters": [
          {
            "id": 3654,
            "name": "مركز صحي الحمزة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3655,
            "name": "مركز صحي الحمزة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3656,
            "name": "مركز صحي الشنافية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3657,
            "name": "مركز صحي الشامية الجنوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3658,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1106,
        "name": "قطاع الدغارة",
        "healthCenters": [
          {
            "id": 3659,
            "name": "مركز صحي الدغارة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3660,
            "name": "مركز صحي الدغارة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3661,
            "name": "مركز صحي الشامية الجنوبي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3662,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3663,
            "name": "مركز صحي الإسكان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1107,
        "name": "قطاع السنية",
        "healthCenters": [
          {
            "id": 3664,
            "name": "مركز صحي السنية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3665,
            "name": "مركز صحي السنية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3666,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3667,
            "name": "مركز صحي الإسكان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3668,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1108,
        "name": "قطاع سومر",
        "healthCenters": [
          {
            "id": 3669,
            "name": "مركز صحي سومر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3670,
            "name": "مركز صحي سومر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3671,
            "name": "مركز صحي الإسكان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3672,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3673,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1109,
        "name": "قطاع آل بدير",
        "healthCenters": [
          {
            "id": 3674,
            "name": "مركز صحي آل بدير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3675,
            "name": "مركز صحي آل بدير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3676,
            "name": "مركز صحي حي العسكري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3677,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3678,
            "name": "مركز صحي السنية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1110,
        "name": "قطاع نفر",
        "healthCenters": [
          {
            "id": 3679,
            "name": "مركز صحي نفر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3680,
            "name": "مركز صحي نفر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3681,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3682,
            "name": "مركز صحي السنية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3683,
            "name": "مركز صحي سومر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1111,
        "name": "قطاع غماس",
        "healthCenters": [
          {
            "id": 3684,
            "name": "مركز صحي غماس الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3685,
            "name": "مركز صحي غماس النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3686,
            "name": "مركز صحي السنية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3687,
            "name": "مركز صحي سومر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3688,
            "name": "مركز صحي آل بدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1112,
        "name": "قطاع الشنافية",
        "healthCenters": [
          {
            "id": 3689,
            "name": "مركز صحي الشنافية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3690,
            "name": "مركز صحي الشنافية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3691,
            "name": "مركز صحي سومر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3692,
            "name": "مركز صحي آل بدير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3693,
            "name": "مركز صحي نفر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2109,
        "name": "مركز أسنان تخصصي الديوانية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2110,
        "name": "مركز أسنان تخصصي الشامية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2111,
        "name": "مركز أسنان تخصصي عفك التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 12,
    "name": "دائرة صحة واسط",
    "description": "تغطي محافظة واسط ومركزها مدينة الكوت وأقضيتها الشمالية والجنوبية والحدودية",
    "location": "واسط - الكوت",
    "sectors": [
      {
        "id": 1201,
        "name": "قطاع الكوت الأول",
        "healthCenters": [
          {
            "id": 3694,
            "name": "مركز صحي الكوت الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3695,
            "name": "مركز صحي الكوت الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3696,
            "name": "مركز صحي الموفقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3697,
            "name": "مركز صحي شيخ سعد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3698,
            "name": "مركز صحي البشائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1202,
        "name": "قطاع الكوت الثاني",
        "healthCenters": [
          {
            "id": 3699,
            "name": "مركز صحي الكوت الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3700,
            "name": "مركز صحي الكوت الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3701,
            "name": "مركز صحي شيخ سعد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3702,
            "name": "مركز صحي البشائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3703,
            "name": "مركز صحي الدبوني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1203,
        "name": "قطاع النعمانية",
        "healthCenters": [
          {
            "id": 3704,
            "name": "مركز صحي النعمانية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3705,
            "name": "مركز صحي النعمانية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3706,
            "name": "مركز صحي البشائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3707,
            "name": "مركز صحي الدبوني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3708,
            "name": "مركز صحي الهورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1204,
        "name": "قطاع الصويرة",
        "healthCenters": [
          {
            "id": 3709,
            "name": "مركز صحي الصويرة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3710,
            "name": "مركز صحي الصويرة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3711,
            "name": "مركز صحي الدبوني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3712,
            "name": "مركز صحي الهورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3713,
            "name": "مركز صحي الكوت القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1205,
        "name": "قطاع الحي",
        "healthCenters": [
          {
            "id": 3714,
            "name": "مركز صحي الحي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3715,
            "name": "مركز صحي الحي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3716,
            "name": "مركز صحي الهورة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3717,
            "name": "مركز صحي الكوت القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3718,
            "name": "مركز صحي الجهاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1206,
        "name": "قطاع العزيزية",
        "healthCenters": [
          {
            "id": 3719,
            "name": "مركز صحي العزيزية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3720,
            "name": "مركز صحي العزيزية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3721,
            "name": "مركز صحي الكوت القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3722,
            "name": "مركز صحي الجهاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3723,
            "name": "مركز صحي الربيع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1207,
        "name": "قطاع بدرة",
        "healthCenters": [
          {
            "id": 3724,
            "name": "مركز صحي بدرة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3725,
            "name": "مركز صحي بدرة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3726,
            "name": "مركز صحي الجهاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3727,
            "name": "مركز صحي الربيع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3728,
            "name": "مركز صحي أنوار الكوت",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1208,
        "name": "قطاع زرباطية",
        "healthCenters": [
          {
            "id": 3729,
            "name": "مركز صحي زرباطية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3730,
            "name": "مركز صحي زرباطية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3731,
            "name": "مركز صحي الربيع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3732,
            "name": "مركز صحي أنوار الكوت",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3733,
            "name": "مركز صحي زرباطية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1209,
        "name": "قطاع الموفقية",
        "healthCenters": [
          {
            "id": 3734,
            "name": "مركز صحي الموفقية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3735,
            "name": "مركز صحي الموفقية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3736,
            "name": "مركز صحي أنوار الكوت",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3737,
            "name": "مركز صحي زرباطية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3738,
            "name": "مركز صحي الموفقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1210,
        "name": "قطاع شيخ سعد",
        "healthCenters": [
          {
            "id": 3739,
            "name": "مركز صحي شيخ سعد الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3740,
            "name": "مركز صحي شيخ سعد النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3741,
            "name": "مركز صحي زرباطية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3742,
            "name": "مركز صحي الموفقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3743,
            "name": "مركز صحي شيخ سعد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1211,
        "name": "قطاع البشائر",
        "healthCenters": [
          {
            "id": 3744,
            "name": "مركز صحي البشائر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3745,
            "name": "مركز صحي البشائر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3746,
            "name": "مركز صحي الموفقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3747,
            "name": "مركز صحي شيخ سعد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3748,
            "name": "مركز صحي البشائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1212,
        "name": "قطاع الدبوني",
        "healthCenters": [
          {
            "id": 3749,
            "name": "مركز صحي الدبوني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3750,
            "name": "مركز صحي الدبوني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3751,
            "name": "مركز صحي شيخ سعد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3752,
            "name": "مركز صحي البشائر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3753,
            "name": "مركز صحي الدبوني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2112,
        "name": "مركز أسنان تخصصي الكوت التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2113,
        "name": "مركز أسنان تخصصي النعمانية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2114,
        "name": "مركز أسنان تخصصي الصويرة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 13,
    "name": "دائرة صحة ميسان",
    "description": "تغطي محافظة ميسان ومركزها مدينة العمارة وأقضية المجر والكحلاء والميمونة",
    "location": "ميسان - العمارة",
    "sectors": [
      {
        "id": 1301,
        "name": "قطاع العمارة الأول",
        "healthCenters": [
          {
            "id": 3754,
            "name": "مركز صحي العمارة الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3755,
            "name": "مركز صحي العمارة الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3756,
            "name": "مركز صحي المجر الصغير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3757,
            "name": "مركز صحي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3758,
            "name": "مركز صحي علي الشرقي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1302,
        "name": "قطاع العمارة الثاني",
        "healthCenters": [
          {
            "id": 3759,
            "name": "مركز صحي العمارة الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3760,
            "name": "مركز صحي العمارة الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3761,
            "name": "مركز صحي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3762,
            "name": "مركز صحي علي الشرقي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3763,
            "name": "مركز صحي القطاع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1303,
        "name": "قطاع المجر الكبير",
        "healthCenters": [
          {
            "id": 3764,
            "name": "مركز صحي المجر الكبير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3765,
            "name": "مركز صحي المجر الكبير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3766,
            "name": "مركز صحي علي الشرقي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3767,
            "name": "مركز صحي القطاع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3768,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1304,
        "name": "قطاع قلعة صالح",
        "healthCenters": [
          {
            "id": 3769,
            "name": "مركز صحي قلعة صالح الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3770,
            "name": "مركز صحي قلعة صالح النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3771,
            "name": "مركز صحي القطاع",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3772,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3773,
            "name": "مركز صحي الشبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1305,
        "name": "قطاع الكحلاء",
        "healthCenters": [
          {
            "id": 3774,
            "name": "مركز صحي الكحلاء الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3775,
            "name": "مركز صحي الكحلاء النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3776,
            "name": "مركز صحي حي الحسين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3777,
            "name": "مركز صحي الشبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3778,
            "name": "مركز صحي أبو رمانة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1306,
        "name": "قطاع الميمونة",
        "healthCenters": [
          {
            "id": 3779,
            "name": "مركز صحي الميمونة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3780,
            "name": "مركز صحي الميمونة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3781,
            "name": "مركز صحي الشبانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3782,
            "name": "مركز صحي أبو رمانة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3783,
            "name": "مركز صحي الماجدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1307,
        "name": "قطاع علي الغربي",
        "healthCenters": [
          {
            "id": 3784,
            "name": "مركز صحي علي الغربي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3785,
            "name": "مركز صحي علي الغربي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3786,
            "name": "مركز صحي أبو رمانة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3787,
            "name": "مركز صحي الماجدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3788,
            "name": "مركز صحي القادسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1308,
        "name": "قطاع المشرح",
        "healthCenters": [
          {
            "id": 3789,
            "name": "مركز صحي المشرح الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3790,
            "name": "مركز صحي المشرح النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3791,
            "name": "مركز صحي الماجدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3792,
            "name": "مركز صحي القادسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3793,
            "name": "مركز صحي المشرح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1309,
        "name": "قطاع المجر الصغير",
        "healthCenters": [
          {
            "id": 3794,
            "name": "مركز صحي المجر الصغير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3795,
            "name": "مركز صحي المجر الصغير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3796,
            "name": "مركز صحي القادسية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3797,
            "name": "مركز صحي المشرح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3798,
            "name": "مركز صحي المجر الصغير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1310,
        "name": "قطاع السلام",
        "healthCenters": [
          {
            "id": 3799,
            "name": "مركز صحي السلام الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3800,
            "name": "مركز صحي السلام النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3801,
            "name": "مركز صحي المشرح",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3802,
            "name": "مركز صحي المجر الصغير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3803,
            "name": "مركز صحي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1311,
        "name": "قطاع علي الشرقي",
        "healthCenters": [
          {
            "id": 3804,
            "name": "مركز صحي علي الشرقي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3805,
            "name": "مركز صحي علي الشرقي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3806,
            "name": "مركز صحي المجر الصغير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3807,
            "name": "مركز صحي السلام",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3808,
            "name": "مركز صحي علي الشرقي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2115,
        "name": "مركز أسنان تخصصي العمارة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2116,
        "name": "مركز أسنان تخصصي المجر الكبير التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2117,
        "name": "مركز أسنان تخصصي قلعة صالح التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 14,
    "name": "دائرة صحة المثنى",
    "description": "تغطي محافظة المثنى ومركزها مدينة السماوة والرميثة وقضاء الخضر والبادية الجنوبية",
    "location": "المثنى - السماوة",
    "sectors": [
      {
        "id": 1401,
        "name": "قطاع السماوة الأول",
        "healthCenters": [
          {
            "id": 3809,
            "name": "مركز صحي السماوة الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3810,
            "name": "مركز صحي السماوة الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3811,
            "name": "مركز صحي المجد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3812,
            "name": "مركز صحي النجمي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3813,
            "name": "مركز صحي الهلال",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1402,
        "name": "قطاع السماوة الثاني",
        "healthCenters": [
          {
            "id": 3814,
            "name": "مركز صحي السماوة الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3815,
            "name": "مركز صحي السماوة الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3816,
            "name": "مركز صحي النجمي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3817,
            "name": "مركز صحي الهلال",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3818,
            "name": "مركز صحي بصية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1403,
        "name": "قطاع الرميثة",
        "healthCenters": [
          {
            "id": 3819,
            "name": "مركز صحي الرميثة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3820,
            "name": "مركز صحي الرميثة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3821,
            "name": "مركز صحي الهلال",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3822,
            "name": "مركز صحي بصية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3823,
            "name": "مركز صحي الحكيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1404,
        "name": "قطاع الخضر",
        "healthCenters": [
          {
            "id": 3824,
            "name": "مركز صحي الخضر الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3825,
            "name": "مركز صحي الخضر النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3826,
            "name": "مركز صحي بصية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3827,
            "name": "مركز صحي الحكيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3828,
            "name": "مركز صحي السماوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1405,
        "name": "قطاع السلمان",
        "healthCenters": [
          {
            "id": 3829,
            "name": "مركز صحي السلمان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3830,
            "name": "مركز صحي السلمان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3831,
            "name": "مركز صحي الحكيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3832,
            "name": "مركز صحي السماوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3833,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1406,
        "name": "قطاع الوركاء",
        "healthCenters": [
          {
            "id": 3834,
            "name": "مركز صحي الوركاء الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3835,
            "name": "مركز صحي الوركاء النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3836,
            "name": "مركز صحي السماوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3837,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3838,
            "name": "مركز صحي الشرقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1407,
        "name": "قطاع المجد",
        "healthCenters": [
          {
            "id": 3839,
            "name": "مركز صحي المجد الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3840,
            "name": "مركز صحي المجد النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3841,
            "name": "مركز صحي الصدر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3842,
            "name": "مركز صحي الشرقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3843,
            "name": "مركز صحي الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1408,
        "name": "قطاع النجمي",
        "healthCenters": [
          {
            "id": 3844,
            "name": "مركز صحي النجمي الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3845,
            "name": "مركز صحي النجمي النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3846,
            "name": "مركز صحي الشرقية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3847,
            "name": "مركز صحي الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3848,
            "name": "مركز صحي الوركاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1409,
        "name": "قطاع الهلال",
        "healthCenters": [
          {
            "id": 3849,
            "name": "مركز صحي الهلال الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3850,
            "name": "مركز صحي الهلال النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3851,
            "name": "مركز صحي الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3852,
            "name": "مركز صحي الوركاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3853,
            "name": "مركز صحي المجد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1410,
        "name": "قطاع بصية",
        "healthCenters": [
          {
            "id": 3854,
            "name": "مركز صحي بصية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3855,
            "name": "مركز صحي بصية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3856,
            "name": "مركز صحي الوركاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3857,
            "name": "مركز صحي المجد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3858,
            "name": "مركز صحي النجمي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2118,
        "name": "مركز أسنان تخصصي السماوة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2119,
        "name": "مركز أسنان تخصصي الرميثة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2120,
        "name": "مركز أسنان تخصصي الخضر التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 15,
    "name": "دائرة صحة كركوك",
    "description": "تغطي محافظة كركوك ونواحيها بالكامل وتتميز بالتنوع الثقافي والجغرافي والأقضية المرتبطة",
    "location": "كركوك",
    "sectors": [
      {
        "id": 1501,
        "name": "قطاع كركوك الأول",
        "healthCenters": [
          {
            "id": 3859,
            "name": "مركز صحي كركوك الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3860,
            "name": "مركز صحي كركوك الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3861,
            "name": "مركز صحي شوان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3862,
            "name": "مركز صحي تسعين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3863,
            "name": "مركز صحي النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1502,
        "name": "قطاع كركوك الثاني",
        "healthCenters": [
          {
            "id": 3864,
            "name": "مركز صحي كركوك الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3865,
            "name": "مركز صحي كركوك الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3866,
            "name": "مركز صحي تسعين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3867,
            "name": "مركز صحي النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3868,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1503,
        "name": "قطاع الحويجة",
        "healthCenters": [
          {
            "id": 3869,
            "name": "مركز صحي الحويجة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3870,
            "name": "مركز صحي الحويجة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3871,
            "name": "مركز صحي النصر",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3872,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3873,
            "name": "مركز صحي حي واسط",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1504,
        "name": "قطاع داقوق",
        "healthCenters": [
          {
            "id": 3874,
            "name": "مركز صحي داقوق الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3875,
            "name": "مركز صحي داقوق النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3876,
            "name": "مركز صحي العروبة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3877,
            "name": "مركز صحي حي واسط",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3878,
            "name": "مركز صحي القادسية كركوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1505,
        "name": "قطاع الدبس",
        "healthCenters": [
          {
            "id": 3879,
            "name": "مركز صحي الدبس الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3880,
            "name": "مركز صحي الدبس النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3881,
            "name": "مركز صحي حي واسط",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3882,
            "name": "مركز صحي القادسية كركوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3883,
            "name": "مركز صحي الرياض",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1506,
        "name": "قطاع الرياض",
        "healthCenters": [
          {
            "id": 3884,
            "name": "مركز صحي الرياض الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3885,
            "name": "مركز صحي الرياض النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3886,
            "name": "مركز صحي القادسية كركوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3887,
            "name": "مركز صحي الرياض",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3888,
            "name": "مركز صحي الرشاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1507,
        "name": "قطاع الرشاد",
        "healthCenters": [
          {
            "id": 3889,
            "name": "مركز صحي الرشاد الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3890,
            "name": "مركز صحي الرشاد النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3891,
            "name": "مركز صحي الرياض",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3892,
            "name": "مركز صحي الرشاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3893,
            "name": "مركز صحي التون كوبري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1508,
        "name": "قطاع التون كوبري",
        "healthCenters": [
          {
            "id": 3894,
            "name": "مركز صحي التون كوبري الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3895,
            "name": "مركز صحي التون كوبري النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3896,
            "name": "مركز صحي الرشاد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3897,
            "name": "مركز صحي التون كوبري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3898,
            "name": "مركز صحي تازة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1509,
        "name": "قطاع تازة",
        "healthCenters": [
          {
            "id": 3899,
            "name": "مركز صحي تازة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3900,
            "name": "مركز صحي تازة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3901,
            "name": "مركز صحي التون كوبري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3902,
            "name": "مركز صحي تازة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3903,
            "name": "مركز صحي ليلان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1510,
        "name": "قطاع ليلان",
        "healthCenters": [
          {
            "id": 3904,
            "name": "مركز صحي ليلان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3905,
            "name": "مركز صحي ليلان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3906,
            "name": "مركز صحي تازة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3907,
            "name": "مركز صحي ليلان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3908,
            "name": "مركز صحي شوان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1511,
        "name": "قطاع شوان",
        "healthCenters": [
          {
            "id": 3909,
            "name": "مركز صحي شوان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3910,
            "name": "مركز صحي شوان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3911,
            "name": "مركز صحي ليلان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3912,
            "name": "مركز صحي شوان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3913,
            "name": "مركز صحي تسعين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2121,
        "name": "مركز أسنان تخصصي كركوك التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2122,
        "name": "مركز أسنان تخصصي الحويجة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2123,
        "name": "مركز أسنان تخصصي النصر التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 16,
    "name": "دائرة صحة ديالى",
    "description": "تغطي محافظة ديالى ومركزها مدينة بعقوبة وأقضية المقدادية والخالص وخانقين وبلدروز",
    "location": "ديالى - بعقوبة",
    "sectors": [
      {
        "id": 1601,
        "name": "قطاع بعقوبة الأول",
        "healthCenters": [
          {
            "id": 3914,
            "name": "مركز صحي بعقوبة الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3915,
            "name": "مركز صحي بعقوبة الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3916,
            "name": "مركز صحي السعدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3917,
            "name": "مركز صحي هبهب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3918,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1602,
        "name": "قطاع بعقوبة الثاني",
        "healthCenters": [
          {
            "id": 3919,
            "name": "مركز صحي بعقوبة الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3920,
            "name": "مركز صحي بعقوبة الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3921,
            "name": "مركز صحي هبهب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3922,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3923,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1603,
        "name": "قطاع المقدادية",
        "healthCenters": [
          {
            "id": 3924,
            "name": "مركز صحي المقدادية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3925,
            "name": "مركز صحي المقدادية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3926,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3927,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3928,
            "name": "مركز صحي بهرز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1604,
        "name": "قطاع الخالص",
        "healthCenters": [
          {
            "id": 3929,
            "name": "مركز صحي الخالص الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3930,
            "name": "مركز صحي الخالص النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3931,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3932,
            "name": "مركز صحي بهرز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3933,
            "name": "مركز صحي المفرق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1605,
        "name": "قطاع خانقين",
        "healthCenters": [
          {
            "id": 3934,
            "name": "مركز صحي خانقين الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3935,
            "name": "مركز صحي خانقين النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3936,
            "name": "مركز صحي بهرز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3937,
            "name": "مركز صحي المفرق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3938,
            "name": "مركز صحي كفري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1606,
        "name": "قطاع بلدروز",
        "healthCenters": [
          {
            "id": 3939,
            "name": "مركز صحي بلدروز الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3940,
            "name": "مركز صحي بلدروز النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3941,
            "name": "مركز صحي المفرق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3942,
            "name": "مركز صحي كفري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3943,
            "name": "مركز صحي خانقين القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1607,
        "name": "قطاع كفري",
        "healthCenters": [
          {
            "id": 3944,
            "name": "مركز صحي كفري الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3945,
            "name": "مركز صحي كفري النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3946,
            "name": "مركز صحي كفري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3947,
            "name": "مركز صحي خانقين القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3948,
            "name": "مركز صحي بلدروز الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1608,
        "name": "قطاع جلولاء",
        "healthCenters": [
          {
            "id": 3949,
            "name": "مركز صحي جلولاء الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3950,
            "name": "مركز صحي جلولاء النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3951,
            "name": "مركز صحي خانقين القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3952,
            "name": "مركز صحي بلدروز الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3953,
            "name": "مركز صحي جلولاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1609,
        "name": "قطاع السعدية",
        "healthCenters": [
          {
            "id": 3954,
            "name": "مركز صحي السعدية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3955,
            "name": "مركز صحي السعدية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3956,
            "name": "مركز صحي بلدروز الغربية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3957,
            "name": "مركز صحي جلولاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3958,
            "name": "مركز صحي السعدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1610,
        "name": "قطاع هبهب",
        "healthCenters": [
          {
            "id": 3959,
            "name": "مركز صحي هبهب الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3960,
            "name": "مركز صحي هبهب النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3961,
            "name": "مركز صحي جلولاء",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3962,
            "name": "مركز صحي السعدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3963,
            "name": "مركز صحي هبهب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1611,
        "name": "قطاع العظيم",
        "healthCenters": [
          {
            "id": 3964,
            "name": "مركز صحي العظيم الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3965,
            "name": "مركز صحي العظيم النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3966,
            "name": "مركز صحي السعدية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3967,
            "name": "مركز صحي هبهب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3968,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1612,
        "name": "قطاع المنصورية",
        "healthCenters": [
          {
            "id": 3969,
            "name": "مركز صحي المنصورية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3970,
            "name": "مركز صحي المنصورية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3971,
            "name": "مركز صحي هبهب",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3972,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3973,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1613,
        "name": "قطاع بهرز",
        "healthCenters": [
          {
            "id": 3974,
            "name": "مركز صحي بهرز الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3975,
            "name": "مركز صحي بهرز النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3976,
            "name": "مركز صحي العظيم",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3977,
            "name": "مركز صحي المنصورية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3978,
            "name": "مركز صحي بهرز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2124,
        "name": "مركز أسنان تخصصي ديالى التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2125,
        "name": "مركز أسنان تخصصي بعقوبة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2126,
        "name": "مركز أسنان تخصصي الخالص التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 17,
    "name": "دائرة صحة دهوك",
    "description": "تغطي محافظة دهوك في إقليم كردستان العراق بالكامل وبجميع أقضيتها ونواحيها الجبلية",
    "location": "دهوك",
    "sectors": [
      {
        "id": 1701,
        "name": "قطاع دهوك الأول",
        "healthCenters": [
          {
            "id": 3979,
            "name": "مركز صحي دهوك الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3980,
            "name": "مركز صحي دهوك الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3981,
            "name": "مركز صحي مانكيش",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3982,
            "name": "مركز صحي صرسنك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3983,
            "name": "مركز صحي بامرني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1702,
        "name": "قطاع دهوك الثاني",
        "healthCenters": [
          {
            "id": 3984,
            "name": "مركز صحي دهوك الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3985,
            "name": "مركز صحي دهوك الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3986,
            "name": "مركز صحي صرسنك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3987,
            "name": "مركز صحي بامرني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3988,
            "name": "مركز صحي مازي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1703,
        "name": "قطاع زاخو",
        "healthCenters": [
          {
            "id": 3989,
            "name": "مركز صحي زاخو الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3990,
            "name": "مركز صحي زاخو النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3991,
            "name": "مركز صحي بامرني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3992,
            "name": "مركز صحي مازي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3993,
            "name": "مركز صحي شيلادزي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1704,
        "name": "قطاع سميل",
        "healthCenters": [
          {
            "id": 3994,
            "name": "مركز صحي سميل الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3995,
            "name": "مركز صحي سميل النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3996,
            "name": "مركز صحي مازي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3997,
            "name": "مركز صحي شيلادزي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 3998,
            "name": "مركز صحي ديرلوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1705,
        "name": "قطاع العمادية",
        "healthCenters": [
          {
            "id": 3999,
            "name": "مركز صحي العمادية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4000,
            "name": "مركز صحي العمادية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4001,
            "name": "مركز صحي شيلادزي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4002,
            "name": "مركز صحي ديرلوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4003,
            "name": "مركز صحي زاويته",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1706,
        "name": "قطاع عقرة",
        "healthCenters": [
          {
            "id": 4004,
            "name": "مركز صحي عقرة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4005,
            "name": "مركز صحي عقرة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4006,
            "name": "مركز صحي ديرلوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4007,
            "name": "مركز صحي زاويته",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4008,
            "name": "مركز صحي كروي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1707,
        "name": "قطاع شيخان",
        "healthCenters": [
          {
            "id": 4009,
            "name": "مركز صحي شيخان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4010,
            "name": "مركز صحي شيخان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4011,
            "name": "مركز صحي زاويته",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4012,
            "name": "مركز صحي كروي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4013,
            "name": "مركز صحي الشهداء دهوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1708,
        "name": "قطاع باتيفا",
        "healthCenters": [
          {
            "id": 4014,
            "name": "مركز صحي باتيفا الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4015,
            "name": "مركز صحي باتيفا النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4016,
            "name": "مركز صحي كروي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4017,
            "name": "مركز صحي الشهداء دهوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4018,
            "name": "مركز صحي باتيفا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1709,
        "name": "قطاع مانكيش",
        "healthCenters": [
          {
            "id": 4019,
            "name": "مركز صحي مانكيش الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4020,
            "name": "مركز صحي مانكيش النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4021,
            "name": "مركز صحي الشهداء دهوك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4022,
            "name": "مركز صحي باتيفا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4023,
            "name": "مركز صحي مانكيش",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1710,
        "name": "قطاع صرسنك",
        "healthCenters": [
          {
            "id": 4024,
            "name": "مركز صحي صرسنك الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4025,
            "name": "مركز صحي صرسنك النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4026,
            "name": "مركز صحي باتيفا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4027,
            "name": "مركز صحي مانكيش",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4028,
            "name": "مركز صحي صرسنك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1711,
        "name": "قطاع بامرني",
        "healthCenters": [
          {
            "id": 4029,
            "name": "مركز صحي بامرني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4030,
            "name": "مركز صحي بامرني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4031,
            "name": "مركز صحي مانكيش",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4032,
            "name": "مركز صحي صرسنك",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4033,
            "name": "مركز صحي بامرني",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2127,
        "name": "مركز أسنان تخصصي دهوك التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2128,
        "name": "مركز أسنان تخصصي زاخو التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2129,
        "name": "مركز أسنان تخصصي عقرة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 18,
    "name": "دائرة صحة أربيل",
    "description": "تغطي عاصمة إقليم كردستان العراق مدينة أربيل ونواحيها وأقضيتها التاريخية والجبلية",
    "location": "أربيل",
    "sectors": [
      {
        "id": 1801,
        "name": "قطاع أربيل الأول",
        "healthCenters": [
          {
            "id": 4034,
            "name": "مركز صحي أربيل الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4035,
            "name": "مركز صحي أربيل الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4036,
            "name": "مركز صحي خليفان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4037,
            "name": "مركز صحي رواندز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4038,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1802,
        "name": "قطاع أربيل الثاني",
        "healthCenters": [
          {
            "id": 4039,
            "name": "مركز صحي أربيل الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4040,
            "name": "مركز صحي أربيل الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4041,
            "name": "مركز صحي رواندز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4042,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4043,
            "name": "مركز صحي حرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1803,
        "name": "قطاع سوران",
        "healthCenters": [
          {
            "id": 4044,
            "name": "مركز صحي سوران الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4045,
            "name": "مركز صحي سوران النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4046,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4047,
            "name": "مركز صحي حرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4048,
            "name": "مركز صحي شقلاوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1804,
        "name": "قطاع شقلاوة",
        "healthCenters": [
          {
            "id": 4049,
            "name": "مركز صحي شقلاوة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4050,
            "name": "مركز صحي شقلاوة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4051,
            "name": "مركز صحي حرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4052,
            "name": "مركز صحي شقلاوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4053,
            "name": "مركز صحي باداوا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1805,
        "name": "قطاع كويسنجق",
        "healthCenters": [
          {
            "id": 4054,
            "name": "مركز صحي كويسنجق الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4055,
            "name": "مركز صحي كويسنجق النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4056,
            "name": "مركز صحي شقلاوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4057,
            "name": "مركز صحي باداوا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4058,
            "name": "مركز صحي عدالة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1806,
        "name": "قطاع مخمور",
        "healthCenters": [
          {
            "id": 4059,
            "name": "مركز صحي مخمور الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4060,
            "name": "مركز صحي مخمور النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4061,
            "name": "مركز صحي باداوا",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4062,
            "name": "مركز صحي عدالة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4063,
            "name": "مركز صحي منارة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1807,
        "name": "قطاع عينكاوة",
        "healthCenters": [
          {
            "id": 4064,
            "name": "مركز صحي عينكاوة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4065,
            "name": "مركز صحي عينكاوة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4066,
            "name": "مركز صحي عدالة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4067,
            "name": "مركز صحي منارة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4068,
            "name": "مركز صحي صلاح الدين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1808,
        "name": "قطاع صلاح الدين",
        "healthCenters": [
          {
            "id": 4069,
            "name": "مركز صحي صلاح الدين الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4070,
            "name": "مركز صحي صلاح الدين النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4071,
            "name": "مركز صحي منارة أربيل",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4072,
            "name": "مركز صحي صلاح الدين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4073,
            "name": "مركز صحي خليفان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1809,
        "name": "قطاع خليفان",
        "healthCenters": [
          {
            "id": 4074,
            "name": "مركز صحي خليفان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4075,
            "name": "مركز صحي خليفان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4076,
            "name": "مركز صحي صلاح الدين",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4077,
            "name": "مركز صحي خليفان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4078,
            "name": "مركز صحي رواندز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1810,
        "name": "قطاع رواندز",
        "healthCenters": [
          {
            "id": 4079,
            "name": "مركز صحي رواندز الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4080,
            "name": "مركز صحي رواندز النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4081,
            "name": "مركز صحي خليفان",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4082,
            "name": "مركز صحي رواندز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4083,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1811,
        "name": "قطاع خبات",
        "healthCenters": [
          {
            "id": 4084,
            "name": "مركز صحي خبات الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4085,
            "name": "مركز صحي خبات النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4086,
            "name": "مركز صحي رواندز",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4087,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4088,
            "name": "مركز صحي حرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1812,
        "name": "قطاع حرير",
        "healthCenters": [
          {
            "id": 4089,
            "name": "مركز صحي حرير الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4090,
            "name": "مركز صحي حرير النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4091,
            "name": "مركز صحي خبات",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4092,
            "name": "مركز صحي حرير",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4093,
            "name": "مركز صحي شقلاوة القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2130,
        "name": "مركز أسنان تخصصي أربيل التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2131,
        "name": "مركز أسنان تخصصي عينكاوة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2132,
        "name": "مركز أسنان تخصصي سوران التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 19,
    "name": "دائرة صحة السليمانية",
    "description": "تغطي محافظة السليمانية في إقليم كردستان العراق بجميع أقضيتها وإداراتها المستقلة",
    "location": "السليمانية",
    "sectors": [
      {
        "id": 1901,
        "name": "قطاع السليمانية الأول",
        "healthCenters": [
          {
            "id": 4094,
            "name": "مركز صحي السليمانية الأول الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4095,
            "name": "مركز صحي السليمانية الأول النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4096,
            "name": "مركز صحي حلبجة الجديدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4097,
            "name": "مركز صحي قره داغ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4098,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1902,
        "name": "قطاع السليمانية الثاني",
        "healthCenters": [
          {
            "id": 4099,
            "name": "مركز صحي السليمانية الثاني الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4100,
            "name": "مركز صحي السليمانية الثاني النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4101,
            "name": "مركز صحي قره داغ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4102,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4103,
            "name": "مركز صحي بختياري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1903,
        "name": "قطاع رانية",
        "healthCenters": [
          {
            "id": 4104,
            "name": "مركز صحي رانية الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4105,
            "name": "مركز صحي رانية النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4106,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4107,
            "name": "مركز صحي بختياري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4108,
            "name": "مركز صحي قاضي محمد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1904,
        "name": "قطاع كلار",
        "healthCenters": [
          {
            "id": 4109,
            "name": "مركز صحي كلار الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4110,
            "name": "مركز صحي كلار النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4111,
            "name": "مركز صحي بختياري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4112,
            "name": "مركز صحي قاضي محمد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4113,
            "name": "مركز صحي عقاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1905,
        "name": "قطاع جمجمال",
        "healthCenters": [
          {
            "id": 4114,
            "name": "مركز صحي جمجمال الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4115,
            "name": "مركز صحي جمجمال النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4116,
            "name": "مركز صحي قاضي محمد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4117,
            "name": "مركز صحي عقاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4118,
            "name": "مركز صحي رزكاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1906,
        "name": "قطاع دربندخان",
        "healthCenters": [
          {
            "id": 4119,
            "name": "مركز صحي دربندخان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4120,
            "name": "مركز صحي دربندخان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4121,
            "name": "مركز صحي عقاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4122,
            "name": "مركز صحي رزكاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4123,
            "name": "مركز صحي سيد صادق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1907,
        "name": "قطاع دوكان",
        "healthCenters": [
          {
            "id": 4124,
            "name": "مركز صحي دوكان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4125,
            "name": "مركز صحي دوكان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4126,
            "name": "مركز صحي رزكاري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4127,
            "name": "مركز صحي سيد صادق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4128,
            "name": "مركز صحي قلات دزة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1908,
        "name": "قطاع بنجوين",
        "healthCenters": [
          {
            "id": 4129,
            "name": "مركز صحي بنجوين الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4130,
            "name": "مركز صحي بنجوين النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4131,
            "name": "مركز صحي سيد صادق",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4132,
            "name": "مركز صحي قلات دزة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4133,
            "name": "مركز صحي حلبجة الجديدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1909,
        "name": "قطاع سيد صادق",
        "healthCenters": [
          {
            "id": 4134,
            "name": "مركز صحي سيد صادق الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4135,
            "name": "مركز صحي سيد صادق النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4136,
            "name": "مركز صحي قلات دزة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4137,
            "name": "مركز صحي حلبجة الجديدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4138,
            "name": "مركز صحي قره داغ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1910,
        "name": "قطاع قلات دزة",
        "healthCenters": [
          {
            "id": 4139,
            "name": "مركز صحي قلات دزة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4140,
            "name": "مركز صحي قلات دزة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4141,
            "name": "مركز صحي حلبجة الجديدة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4142,
            "name": "مركز صحي قره داغ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4143,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1911,
        "name": "قطاع حلبجة الجديدة",
        "healthCenters": [
          {
            "id": 4144,
            "name": "مركز صحي حلبجة الجديدة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4145,
            "name": "مركز صحي حلبجة الجديدة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4146,
            "name": "مركز صحي قره داغ",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4147,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4148,
            "name": "مركز صحي بختياري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 1912,
        "name": "قطاع قره داغ",
        "healthCenters": [
          {
            "id": 4149,
            "name": "مركز صحي قره داغ الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4150,
            "name": "مركز صحي قره داغ النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4151,
            "name": "مركز صحي سرجنار",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4152,
            "name": "مركز صحي بختياري",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4153,
            "name": "مركز صحي قاضي محمد",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2133,
        "name": "مركز أسنان تخصصي السليمانية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2134,
        "name": "مركز أسنان تخصصي رانية التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2135,
        "name": "مركز أسنان تخصصي كلار التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  },
  {
    "id": 20,
    "name": "دائرة صحة حلبجة",
    "description": "تغطي محافظة حلبجة الفتية ومناطقها الجبلية بالكامل وأقضيتها ونواحيها الحدودية",
    "location": "حلبجة",
    "sectors": [
      {
        "id": 2001,
        "name": "قطاع حلبجة",
        "healthCenters": [
          {
            "id": 4154,
            "name": "مركز صحي حلبجة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4155,
            "name": "مركز صحي حلبجة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4156,
            "name": "مركز صحي بمو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4157,
            "name": "مركز صحي خورمال القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4158,
            "name": "مركز صحي سيروان الثانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 2002,
        "name": "قطاع سيروان",
        "healthCenters": [
          {
            "id": 4159,
            "name": "مركز صحي سيروان الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4160,
            "name": "مركز صحي سيروان النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4161,
            "name": "مركز صحي خورمال القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4162,
            "name": "مركز صحي سيروان الثانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4163,
            "name": "مركز صحي حلبجة الشمالية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 2003,
        "name": "قطاع خورمال",
        "healthCenters": [
          {
            "id": 4164,
            "name": "مركز صحي خورمال الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4165,
            "name": "مركز صحي خورمال النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4166,
            "name": "مركز صحي سيروان الثانية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4167,
            "name": "مركز صحي حلبجة الشمالية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4168,
            "name": "مركز صحي بيارة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 2004,
        "name": "قطاع بيارة",
        "healthCenters": [
          {
            "id": 4169,
            "name": "مركز صحي بيارة الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4170,
            "name": "مركز صحي بيارة النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4171,
            "name": "مركز صحي حلبجة الشمالية",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4172,
            "name": "مركز صحي بيارة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4173,
            "name": "مركز صحي بمو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      },
      {
        "id": 2005,
        "name": "قطاع بمو",
        "healthCenters": [
          {
            "id": 4174,
            "name": "مركز صحي بمو الرئيسي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4175,
            "name": "مركز صحي بمو النموذجي",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4176,
            "name": "مركز صحي بيارة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4177,
            "name": "مركز صحي بمو",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          },
          {
            "id": 4178,
            "name": "مركز صحي خورمال القديمة",
            "status": "pending",
            "score": null,
            "serviceScore": null,
            "indicatorScore": null
          }
        ]
      }
    ],
    "specializedCenters": [
      {
        "id": 2136,
        "name": "مركز أسنان تخصصي حلبجة التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2137,
        "name": "مركز أسنان تخصصي سيروان التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": 2138,
        "name": "مركز أسنان تخصصي خورمال التخصصي",
        "status": "pending",
        "score": null,
        "stage1Score": null,
        "stage2Score": null,
        "availableUnits": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      }
    ]
  }
],

  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      fullName: 'أحمد محمد العلي',
      role: 'admin',
      specialization: null,
      directorateIds: [],
      sectorId: null,
      assignedCenterIds: [],
      createdAt: '2024-01-15',
      evaluationsCompleted: 0,
      totalAssigned: 0,
    },
    {
      id: 2,
      username: 'eval_health1',
      password: '123456',
      fullName: 'محمد حسين الجبوري',
      role: 'evaluator',
      specialization: 'health',
      directorateIds: [2], // Baghdad Karkh
      sectorId: 202, // قطاع الكاظمية
      assignedCenterIds: [1010, 1011, 1025, 1026, 1027, 1028],
      createdAt: '2024-02-10',
      evaluationsCompleted: 6,
      totalAssigned: 6,
    },
    {
      id: 3,
      username: 'eval_spec1',
      password: '123456',
      fullName: 'علي كاظم الموسوي',
      role: 'evaluator',
      specialization: 'specialized',
      directorateIds: [1], // Baghdad الرصافة
      sectorId: null,
      assignedCenterIds: [2001, 2002],
      createdAt: '2024-02-20',
      evaluationsCompleted: 1,
      totalAssigned: 2,
    },
    {
      id: 4,
      username: 'eval_health2',
      password: '123456',
      fullName: 'فاطمة عبد الرزاق',
      role: 'evaluator',
      specialization: 'health',
      directorateIds: [4, 3], // Basra and Salah Al-Din
      sectorId: 401,
      assignedCenterIds: [1019, 1020],
      createdAt: '2024-03-01',
      evaluationsCompleted: 3,
      totalAssigned: 5,
    },
    {
      id: 5,
      username: 'eval_spec2',
      password: '123456',
      fullName: 'زينب حسن البصري',
      role: 'evaluator',
      specialization: 'specialized',
      directorateIds: [4, 1], // Basra and Baghdad الرصافة
      sectorId: null,
      assignedCenterIds: [2005, 2006],
      createdAt: '2024-03-15',
      evaluationsCompleted: 1,
      totalAssigned: 2,
    },
  ],

  evaluations: [],
  nextUserId: 6,
  nextDirectorateId: 21,
  dbVersion: 10
};

const SESSION_KEY = 'health_eval_session';

// ═══ إدارة جلسة المستخدم ═══
export function loginUser(username, password) {
  const data = loadData();
  const user = data.users.find(u => u.username === username && u.password === password);
  if (user) {
    const sessionUser = { ...user };
    delete sessionUser.password; // Do not store password in session
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  }
  return null;
}

export function getCurrentUser() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const parsedSession = JSON.parse(session);
      // Reload user from storage to get updated stats/details
      const data = loadData();
      const user = data.users.find(u => u.id === parsedSession.id);
      if (user) {
        const updatedSession = { ...user };
        delete updatedSession.password;
        return updatedSession;
      }
      return parsedSession;
    }
  } catch (e) {
    console.error('Session loading error', e);
  }
  return null;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}


// ═══ تحميل البيانات ═══
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Auto-reset if data belongs to old schema or version is outdated
      if (!data.dbVersion || data.dbVersion < 10 || !data.directorates || data.directorates.length < 15) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return { ...initialData };
      }

      // Migrate users to new schema if they don't have directorateIds or assignedCenterIds
      let migrated = false;
      if (data.users) {
        data.users = data.users.map(u => {
          if (!u.directorateIds) {
            u.directorateIds = u.directorateId ? [u.directorateId] : [];
            migrated = true;
          }
          if (!u.assignedCenterIds) {
            u.assignedCenterIds = [];
            migrated = true;
          }
          return u;
        });
      }
      if (migrated) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.error('Error saving migrated data:', e);
        }
      }
      return data;
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return { ...initialData };
}

// ═══ حفظ البيانات ═══
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// ═══ الحصول على البيانات ═══
export function getData() {
  return loadData();
}

// ═══ إعادة تعيين البيانات ═══
export function resetData() {
  saveData({ ...initialData });
  return { ...initialData };
}

// ═══════════════════════════════════════════
// عمليات المستخدمين
// ═══════════════════════════════════════════

export function getUsers() {
  return loadData().users;
}

export function addUser(user) {
  const data = loadData();
  const newUser = {
    ...user,
    id: data.nextUserId++,
    createdAt: new Date().toISOString().split('T')[0],
    evaluationsCompleted: 0,
    totalAssigned: 0,
  };
  data.users.push(newUser);
  saveData(data);
  return newUser;
}

export function updateUser(id, updates) {
  const data = loadData();
  const index = data.users.findIndex((u) => u.id === id);
  if (index !== -1) {
    data.users[index] = { ...data.users[index], ...updates };
    saveData(data);
    return data.users[index];
  }
  return null;
}

export function deleteUser(id) {
  const data = loadData();
  data.users = data.users.filter((u) => u.id !== id);
  saveData(data);
}

// ═══════════════════════════════════════════
// عمليات الدوائر الصحية
// ═══════════════════════════════════════════

export function getDirectorates() {
  return loadData().directorates;
}

export function getDirectorate(id) {
  return loadData().directorates.find((d) => d.id === id);
}

export function addDirectorate(directorate) {
  const data = loadData();
  const newDir = {
    ...directorate,
    id: data.nextDirectorateId++,
    sectors: directorate.sectors || [],
    specializedCenters: directorate.specializedCenters || [],
  };
  data.directorates.push(newDir);
  saveData(data);
  return newDir;
}

export function updateDirectorate(id, updates) {
  const data = loadData();
  const index = data.directorates.findIndex((d) => d.id === id);
  if (index !== -1) {
    data.directorates[index] = { ...data.directorates[index], ...updates };
    saveData(data);
    return data.directorates[index];
  }
  return null;
}

export function deleteDirectorate(id) {
  const data = loadData();
  data.directorates = data.directorates.filter((d) => d.id !== id);
  saveData(data);
}

// ═══════════════════════════════════════════
// عمليات القطاعات
// ═══════════════════════════════════════════

export function addSector(directorateId, sector) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    const maxId = Math.max(0, ...dir.sectors.map((s) => s.id));
    const newSector = {
      ...sector,
      id: maxId + 1,
      healthCenters: sector.healthCenters || [],
    };
    dir.sectors.push(newSector);
    saveData(data);
    return newSector;
  }
  return null;
}

export function deleteSector(directorateId, sectorId) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    dir.sectors = dir.sectors.filter((s) => s.id !== sectorId);
    saveData(data);
  }
}

// ═══════════════════════════════════════════
// عمليات المراكز الصحية
// ═══════════════════════════════════════════

export function addHealthCenter(directorateId, sectorId, center) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    const sector = dir.sectors.find((s) => s.id === sectorId);
    if (sector) {
      const maxId = Math.max(0, ...sector.healthCenters.map((c) => c.id));
      const newCenter = {
        ...center,
        id: maxId + 1,
        status: 'pending',
        score: null,
      };
      sector.healthCenters.push(newCenter);
      saveData(data);
      return newCenter;
    }
  }
  return null;
}

export function deleteHealthCenter(directorateId, sectorId, centerId) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    const sector = dir.sectors.find((s) => s.id === sectorId);
    if (sector) {
      sector.healthCenters = sector.healthCenters.filter((c) => c.id !== centerId);
      saveData(data);
    }
  }
}

// ═══════════════════════════════════════════
// عمليات المراكز التخصصية
// ═══════════════════════════════════════════

export function addSpecializedCenter(directorateId, center) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    const maxId = Math.max(0, ...dir.specializedCenters.map((c) => c.id));
    const newCenter = {
      ...center,
      id: maxId + 1,
      status: 'pending',
      score: null,
    };
    dir.specializedCenters.push(newCenter);
    saveData(data);
    return newCenter;
  }
  return null;
}

export function deleteSpecializedCenter(directorateId, centerId) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === directorateId);
  if (dir) {
    dir.specializedCenters = dir.specializedCenters.filter((c) => c.id !== centerId);
    saveData(data);
  }
}

// ═══════════════════════════════════════════
// دوال الإحصائيات
// ═══════════════════════════════════════════

export function getStats() {
  const data = loadData();
  const dirs = data.directorates;

  let totalSectors = 0;
  let totalHealthCenters = 0;
  let totalSpecialized = 0;
  let evaluatedHealth = 0;
  let evaluatedSpecialized = 0;
  let pendingHealth = 0;
  let pendingSpecialized = 0;
  let inProgressHealth = 0;
  let totalHealthScore = 0;
  let healthScoreCount = 0;
  let totalSpecScore = 0;
  let specScoreCount = 0;

  dirs.forEach((dir) => {
    totalSectors += dir.sectors.length;
    totalSpecialized += dir.specializedCenters.length;

    dir.sectors.forEach((sector) => {
      totalHealthCenters += sector.healthCenters.length;
      sector.healthCenters.forEach((center) => {
        if (center.status === 'evaluated') {
          evaluatedHealth++;
          if (center.score != null) {
            totalHealthScore += center.score;
            healthScoreCount++;
          }
        } else if (center.status === 'pending') {
          pendingHealth++;
        } else if (center.status === 'in-progress') {
          inProgressHealth++;
        }
      });
    });

    dir.specializedCenters.forEach((center) => {
      if (center.status === 'evaluated') {
        evaluatedSpecialized++;
        if (center.score != null) {
          totalSpecScore += center.score;
          specScoreCount++;
        }
      } else if (center.status === 'pending') {
        pendingSpecialized++;
      }
    });
  });

  const totalUsers = data.users.length;
  const evaluators = data.users.filter((u) => u.role === 'evaluator');
  const healthEvaluators = evaluators.filter((u) => u.specialization === 'health');
  const specEvaluators = evaluators.filter((u) => u.specialization === 'specialized');

  return {
    directorates: dirs.length,
    totalSectors,
    totalHealthCenters,
    totalSpecialized,
    evaluatedHealth,
    evaluatedSpecialized,
    pendingHealth,
    pendingSpecialized,
    inProgressHealth,
    avgHealthScore: healthScoreCount > 0 ? Math.round(totalHealthScore / healthScoreCount) : 0,
    avgSpecScore: specScoreCount > 0 ? Math.round(totalSpecScore / specScoreCount) : 0,
    totalUsers,
    totalEvaluators: evaluators.length,
    healthEvaluators: healthEvaluators.length,
    specEvaluators: specEvaluators.length,
    healthEvalProgress: totalHealthCenters > 0 ? Math.round((evaluatedHealth / totalHealthCenters) * 100) : 0,
    specEvalProgress: totalSpecialized > 0 ? Math.round((evaluatedSpecialized / totalSpecialized) * 100) : 0,
  };
}

export function getDirectorateStats(dirId) {
  const dir = getDirectorate(dirId);
  if (!dir) return null;

  let totalHC = 0;
  let evaluatedHC = 0;
  let totalScore = 0;
  let scoreCount = 0;

  dir.sectors.forEach((sector) => {
    totalHC += sector.healthCenters.length;
    sector.healthCenters.forEach((c) => {
      if (c.status === 'evaluated') {
        evaluatedHC++;
        if (c.score != null) {
          totalScore += c.score;
          scoreCount++;
        }
      }
    });
  });

  let evaluatedSC = 0;
  let scScore = 0;
  let scCount = 0;
  dir.specializedCenters.forEach((c) => {
    if (c.status === 'evaluated') {
      evaluatedSC++;
      if (c.score != null) {
        scScore += c.score;
        scCount++;
      }
    }
  });

  return {
    sectors: dir.sectors.length,
    totalHealthCenters: totalHC,
    totalSpecialized: dir.specializedCenters.length,
    evaluatedHealth: evaluatedHC,
    evaluatedSpecialized: evaluatedSC,
    avgHealthScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
    avgSpecScore: scCount > 0 ? Math.round(scScore / scCount) : 0,
    healthProgress: totalHC > 0 ? Math.round((evaluatedHC / totalHC) * 100) : 0,
    specProgress: dir.specializedCenters.length > 0 ? Math.round((evaluatedSC / dir.specializedCenters.length) * 100) : 0,
  };
}

// ═══════════════════════════════════════════
// حفظ نتائج التقييم التفاعلي
// ═══════════════════════════════════════════

export function submitHealthCenterEvaluation(dirId, sectorId, centerId, score, answers, serviceScore, indicatorScore) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === dirId);
  if (dir) {
    const sector = dir.sectors.find((s) => s.id === sectorId);
    if (sector) {
      const center = sector.healthCenters.find((c) => c.id === centerId);
      if (center) {
        center.status = 'evaluated';
        center.score = score;
        center.serviceScore = serviceScore;
        center.indicatorScore = indicatorScore;
        center.answers = answers;
        saveData(data);
        return true;
      }
    }
  }
  return false;
}

export function submitSpecializedCenterEvaluation(dirId, centerId, score, answers, stage1Score, stage2Score) {
  const data = loadData();
  const dir = data.directorates.find((d) => d.id === dirId);
  if (dir) {
    const center = dir.specializedCenters.find((c) => c.id === centerId);
    if (center) {
      center.status = 'evaluated';
      center.score = score;
      center.stage1Score = stage1Score;
      center.stage2Score = stage2Score;
      center.answers = answers;
      saveData(data);
      return true;
    }
  }
  return false;
}

