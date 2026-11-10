// Screening rubric per role. Edit freely: each skill is a label plus regex patterns (case-insensitive) that count as evidence.
// Weights are relative inside a role. Experience ranges are starting defaults to confirm; they are not shown on the site.
export default {
  "_note": "Edit freely. Each skill is a label plus regex patterns (case-insensitive) that count as evidence. Weights are relative inside a role. Experience ranges are starting defaults for Jaisalil to confirm, not published on the site.",
  "domain": {
    "label": "Commercial interiors",
    "patterns": [
      "corporate",
      "office",
      "workplace",
      "commercial",
      "fit[- ]?out",
      "hospitality",
      "hotel",
      "retail",
      "showroom",
      "restaurant",
      "\\bqsr\\b",
      "co-?working",
      "turnkey",
      "design (and|&) build"
    ]
  },
  "preferredLocations": [
    "thane",
    "mumbai",
    "navi mumbai",
    "kalyan",
    "dombivli",
    "bhiwandi",
    "panvel",
    "vashi",
    "airoli",
    "ghansoli",
    "kharghar",
    "belapur",
    "mira road",
    "bhayandar"
  ],
  "roles": {
    "interior-designer": {
      "title": "Interior Designer",
      "experience": {
        "min": 3,
        "ideal": [
          4,
          8
        ]
      },
      "must": [
        {
          "label": "AutoCAD",
          "weight": 3,
          "patterns": [
            "auto ?cad"
          ]
        },
        {
          "label": "SketchUp",
          "weight": 2,
          "patterns": [
            "sketch ?up"
          ]
        },
        {
          "label": "Space planning",
          "weight": 3,
          "patterns": [
            "space planning",
            "test ?fit",
            "layout planning",
            "furniture layout"
          ]
        },
        {
          "label": "Working / GFC drawings",
          "weight": 3,
          "patterns": [
            "working drawings?",
            "\\bgfc\\b",
            "good for construction",
            "construction drawings?",
            "detail(ed)? drawings?"
          ]
        },
        {
          "label": "Materials and finishes",
          "weight": 2,
          "patterns": [
            "materials?",
            "finishes",
            "material (board|palette|selection)",
            "specifications?"
          ]
        },
        {
          "label": "Concept design",
          "weight": 2,
          "patterns": [
            "concept",
            "mood ?boards?",
            "design development"
          ]
        }
      ],
      "nice": [
        {
          "label": "3ds Max / V-Ray",
          "patterns": [
            "3ds ?max",
            "v-?ray",
            "corona"
          ]
        },
        {
          "label": "Revit",
          "patterns": [
            "revit"
          ]
        },
        {
          "label": "BOQ / estimates",
          "patterns": [
            "\\bboq\\b",
            "bill of quantit",
            "estimat"
          ]
        },
        {
          "label": "Lighting design",
          "patterns": [
            "lighting (design|layout)",
            "lux"
          ]
        },
        {
          "label": "Site coordination",
          "patterns": [
            "site (visits?|coordination|supervision)"
          ]
        },
        {
          "label": "Interior design degree",
          "patterns": [
            "b\\.? ?des",
            "b\\.? ?arch",
            "interior design(ing)? (degree|diploma)",
            "diploma in interior",
            "nid",
            "cept",
            "jj school"
          ]
        }
      ]
    },
    "3d-artist": {
      "title": "3D Artist",
      "experience": {
        "min": 2,
        "ideal": [
          3,
          6
        ]
      },
      "must": [
        {
          "label": "3ds Max",
          "weight": 3,
          "patterns": [
            "3ds ?max",
            "3d ?s ?max"
          ]
        },
        {
          "label": "V-Ray / Corona",
          "weight": 3,
          "patterns": [
            "v-?ray",
            "corona"
          ]
        },
        {
          "label": "Photoreal rendering",
          "weight": 3,
          "patterns": [
            "render(ing|s)?",
            "photo-?real",
            "visuali[sz]ation"
          ]
        },
        {
          "label": "Lighting and texturing",
          "weight": 2,
          "patterns": [
            "textur",
            "lighting",
            "material(s)? (setup|creation)",
            "uv"
          ]
        },
        {
          "label": "Photoshop post-production",
          "weight": 2,
          "patterns": [
            "photoshop",
            "post[- ]?production"
          ]
        }
      ],
      "nice": [
        {
          "label": "SketchUp",
          "patterns": [
            "sketch ?up"
          ]
        },
        {
          "label": "Walkthroughs / animation",
          "patterns": [
            "walk-?through",
            "animation",
            "fly-?through"
          ]
        },
        {
          "label": "Real-time engines",
          "patterns": [
            "lumion",
            "enscape",
            "\\bd5\\b",
            "unreal",
            "twinmotion"
          ]
        },
        {
          "label": "AutoCAD reading",
          "patterns": [
            "auto ?cad"
          ]
        }
      ]
    },
    "project-coordinator": {
      "title": "Project Coordinator",
      "experience": {
        "min": 4,
        "ideal": [
          5,
          10
        ]
      },
      "must": [
        {
          "label": "Project coordination",
          "weight": 3,
          "patterns": [
            "project coordinat",
            "coordinat(ed|ing|ion) (with|between)",
            "project management"
          ]
        },
        {
          "label": "Scheduling",
          "weight": 3,
          "patterns": [
            "schedul",
            "ms ?project",
            "primavera",
            "gantt",
            "timeline",
            "programme"
          ]
        },
        {
          "label": "Client communication",
          "weight": 2,
          "patterns": [
            "client (communication|coordination|meetings?|interface)",
            "\\bmom\\b",
            "minutes of meeting"
          ]
        },
        {
          "label": "Vendor coordination",
          "weight": 2,
          "patterns": [
            "vendor",
            "contractor coordination",
            "procurement",
            "purchase"
          ]
        },
        {
          "label": "Interior fit-out",
          "weight": 3,
          "patterns": [
            "fit[- ]?out",
            "interior (project|works)",
            "turnkey"
          ]
        }
      ],
      "nice": [
        {
          "label": "BOQ tracking",
          "patterns": [
            "\\bboq\\b",
            "bill of quantit"
          ]
        },
        {
          "label": "Snags and handover",
          "patterns": [
            "snag",
            "handover",
            "hand-?over",
            "close-?out"
          ]
        },
        {
          "label": "Excel / reporting",
          "patterns": [
            "excel",
            "progress report",
            "\\bmis\\b",
            "dashboard"
          ]
        },
        {
          "label": "MEP coordination",
          "patterns": [
            "\\bmep",
            "hvac",
            "services coordination"
          ]
        },
        {
          "label": "Engineering / architecture degree",
          "patterns": [
            "b\\.? ?e\\b",
            "b\\.? ?tech",
            "b\\.? ?arch",
            "civil engineer",
            "diploma in civil"
          ]
        }
      ]
    },
    "site-supervisor": {
      "title": "Site Supervisor",
      "experience": {
        "min": 3,
        "ideal": [
          4,
          10
        ]
      },
      "must": [
        {
          "label": "Site supervision",
          "weight": 3,
          "patterns": [
            "site supervis",
            "site in-?charge",
            "site execution",
            "supervis(ed|ing|ion) (of )?(site|works|labour)"
          ]
        },
        {
          "label": "Interior trades",
          "weight": 3,
          "patterns": [
            "carpentry",
            "joinery",
            "false ceiling",
            "gypsum",
            "\\bpop\\b",
            "partition",
            "flooring",
            "painting",
            "furniture installation"
          ]
        },
        {
          "label": "Reading drawings",
          "weight": 2,
          "patterns": [
            "reading drawings",
            "drawings?",
            "auto ?cad"
          ]
        },
        {
          "label": "Quality and safety",
          "weight": 2,
          "patterns": [
            "quality",
            "safety",
            "\\bqa\\b",
            "\\bqc\\b",
            "\\behs\\b"
          ]
        },
        {
          "label": "Labour and progress",
          "weight": 2,
          "patterns": [
            "labour",
            "manpower",
            "workmen",
            "daily progress",
            "\\bdpr\\b"
          ]
        }
      ],
      "nice": [
        {
          "label": "Measurements / billing",
          "patterns": [
            "measurement",
            "billing",
            "\\bra bills?\\b"
          ]
        },
        {
          "label": "Fit-out projects",
          "patterns": [
            "fit[- ]?out",
            "turnkey",
            "interior project"
          ]
        },
        {
          "label": "MEP awareness",
          "patterns": [
            "\\bmep",
            "electrical",
            "plumbing",
            "hvac"
          ]
        },
        {
          "label": "Civil diploma",
          "patterns": [
            "diploma in civil",
            "civil engineer",
            "\\biti\\b"
          ]
        }
      ]
    },
    "quantity-surveyor": {
      "title": "Quantity Surveyor",
      "experience": {
        "min": 4,
        "ideal": [
          5,
          10
        ]
      },
      "must": [
        {
          "label": "Quantity take-off",
          "weight": 3,
          "patterns": [
            "take-?off",
            "quantit(y|ies)",
            "measurement"
          ]
        },
        {
          "label": "BOQ preparation",
          "weight": 3,
          "patterns": [
            "\\bboq\\b",
            "bill of quantit"
          ]
        },
        {
          "label": "Rate analysis / estimation",
          "weight": 3,
          "patterns": [
            "rate analysis",
            "estimat",
            "costing",
            "cost plan"
          ]
        },
        {
          "label": "Bill certification",
          "weight": 3,
          "patterns": [
            "bill (checking|certification|verification)",
            "\\bra bills?\\b",
            "running account",
            "certif(y|ied|ication) of bills",
            "contractor bills?"
          ]
        },
        {
          "label": "Excel",
          "weight": 1,
          "patterns": [
            "excel",
            "spreadsheet"
          ]
        }
      ],
      "nice": [
        {
          "label": "Tendering",
          "patterns": [
            "tender",
            "bid",
            "comparative statement"
          ]
        },
        {
          "label": "Cost control / variations",
          "patterns": [
            "cost control",
            "variation",
            "reconciliation",
            "budget"
          ]
        },
        {
          "label": "AutoCAD / CostX",
          "patterns": [
            "auto ?cad",
            "costx",
            "planswift"
          ]
        },
        {
          "label": "IS 1200 / modes of measurement",
          "patterns": [
            "is ?1200",
            "mode of measurement",
            "\\bsmm\\b"
          ]
        },
        {
          "label": "Interior / fit-out",
          "patterns": [
            "fit[- ]?out",
            "interior"
          ]
        }
      ]
    },
    "other": {
      "title": "Other",
      "experience": {
        "min": 0,
        "ideal": [
          2,
          15
        ]
      },
      "must": [],
      "nice": []
    }
  }
};
