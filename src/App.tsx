import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Upload, 
  RefreshCw, 
  Check, 
  Image as ImageIcon, 
  Coffee, 
  Tv, 
  Shirt, 
  ShoppingBag, 
  Train, 
  Smartphone, 
  Tag, 
  HelpCircle, 
  AlertCircle, 
  Eye, 
  ChevronRight, 
  Download, 
  Layers, 
  Play,
  Palette,
  CheckCircle2,
  Trash2,
  ImagePlay
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Predefined styles for mocks
interface StylePreset {
  id: string;
  name: string;
  description: string;
  color: string;
}

const STYLE_PRESETS: StylePreset[] = [
  { id: "studio", name: "Studio Minimalist", description: "Studio lighting, clean neutral gradient backdrop, pristine mockup realism", color: "from-gray-500 to-slate-700" },
  { id: "cyberpunk", name: "Cyberpunk Neon", description: "Vibrant laser lines, reflective rain puddles, neon blue/magenta highlights", color: "from-pink-500 to-indigo-600" },
  { id: "warm", name: "Warm & Organic", description: "Charming sunset shadows, wooden surfaces, surrounding eucalyptus leaves", color: "from-amber-400 to-orange-600" },
  { id: "editorial", name: "Editorial Vogue", description: "High-contrast geometric sunlight play, modern architectural backdrop", color: "from-purple-500 to-rose-600" }
];

// Medium config
interface MarketingMedium {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// Interactive SVG Presets designed with styled vector graphics for instant use
const SVG_PRESETS = [
  {
    id: "banana",
    name: "Nano Banana 🍌",
    description: "Premium glowing gold organic banana",
    color: "bg-amber-100 border-amber-300",
    iconCode: (
      <svg id="svg-banana" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#713f12" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100%" cy="100%" r="120" fill="url(#glowGrad)" opacity="0.6" transform="translate(-100, -100)" />
        <rect width="200" height="200" rx="24" fill="#faf5ff" />
        <g transform="translate(10, 10)">
          {/* Stem */}
          <path d="M40 50 C45 35, 55 35, 58 43 C56 48, 50 55, 45 61 Z" fill="url(#stemGrad)" />
          {/* Banana body */}
          <path d="M45 55 C70 85, 115 130, 155 125 C165 123, 172 118, 175 110 C165 125, 145 145, 115 145 C75 145, 50 105, 45 55 Z" fill="url(#bananaGrad)" filter="drop-shadow(0px 8px 16px rgba(234, 179, 8, 0.2))" />
          {/* Accent stripes */}
          <path d="M72 82 C90 100, 115 122, 140 120" stroke="#ca8a04" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M50 63 C65 85, 95 118, 118 128" stroke="#ca8a04" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
          {/* Banana tip */}
          <path d="M172 105 C174 113, 175 110, 170 114 C167 116, 163 118, 161 113 Z" fill="#451a03" />
          
          {/* Branding Badge Sticker */}
          <g transform="translate(85, 90) rotate(-15)">
            <rect x="-35" y="-14" width="70" height="28" rx="14" fill="#0284c7" stroke="white" strokeWidth="2" />
            <text x="0" y="-3" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">NANO</text>
            <text x="0" y="7" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="sans-serif">BANANA 2.5</text>
          </g>
        </g>
      </svg>
    )
  },
  {
    id: "cola",
    name: "Retro Soda Can 🥤",
    description: "Vibrant futuristic energy potion can",
    color: "bg-red-100 border-red-300",
    iconCode: (
      <svg id="svg-cola" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="canBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="70%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="canTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="24" fill="#fef2f2" />
        <g transform="translate(10, 10)">
          {/* Can Rim Top */}
          <ellipse cx="100" cy="40" rx="35" ry="10" fill="url(#canTop)" />
          <ellipse cx="100" cy="38" rx="32" ry="8" fill="#475569" />
          {/* Can Main Body */}
          <path d="M65 40 Q100 50 135 40 L135 150 Q100 160 65 150 Z" fill="url(#canBody)" filter="drop-shadow(0px 10px 20px rgba(220, 38, 38, 0.25))" />
          {/* Can Bottom Rim */}
          <ellipse cx="100" cy="150" rx="35" ry="10" fill="url(#canTop)" />
          {/* Cool Neon Waves */}
          <path d="M66 80 Q100 100 134 75" stroke="#fef08a" strokeWidth="5" fill="none" opacity="0.8" />
          <path d="M66 100 Q100 120 134 95" stroke="#38bdf8" strokeWidth="6" fill="none" opacity="0.9" />
          <path d="M66 120 Q100 140 134 115" stroke="#ec4899" strokeWidth="4" fill="none" opacity="0.8" />
          
          {/* Typography on product */}
          <text x="100" y="85" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif" rotate="10">FIZZY</text>
          <text x="101" y="105" textAnchor="middle" fill="#fef08a" fontSize="10" letterSpacing="1.5" fontWeight="bold" fontFamily="monospace">COLA</text>
        </g>
      </svg>
    )
  },
  {
    id: "honey",
    name: "Heritage Honey 🍯",
    description: "Serene gold-amber beeswax honey jar",
    color: "bg-orange-100 border-orange-300",
    iconCode: (
      <svg id="svg-honey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="corkLid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="24" fill="#fffbeb" />
        <g transform="translate(10, 10)">
          {/* Glass Jar neck */}
          <rect x="75" y="47" width="50" height="15" rx="4" fill="url(#jarGlass)" />
          {/* Cork lid */}
          <rect x="70" y="32" width="60" height="18" rx="5" fill="url(#corkLid)" />
          {/* Jar Base */}
          <path d="M60 60 C55 60 48 70 48 95 C48 135 55 155 85 155 L115 155 C145 155 152 135 152 95 C152 70 145 60 140 60 Z" fill="url(#jarGlass)" filter="drop-shadow(0px 8px 24px rgba(217, 119, 6, 0.25))" />
          
          {/* Hexagon honey patterns */}
          <polygon points="100,85 106,89 106,96 100,100 94,96 94,89" fill="none" stroke="#fffbeb" strokeWidth="2" opacity="0.6" />
          <polygon points="112,96 118,100 118,107 112,111 106,107 106,100" fill="none" stroke="#fffbeb" strokeWidth="1.5" opacity="0.4" />
          <polygon points="88,96 94,100 94,107 88,111 82,107 82,100" fill="none" stroke="#fffbeb" strokeWidth="1.5" opacity="0.4" />
          
          {/* Label design */}
          <rect x="65" y="102" width="70" height="34" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
          <text x="100" y="115" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold" fontFamily="serif">PURE HONEY</text>
          <text x="100" y="128" textAnchor="middle" fill="#d97706" fontSize="7" letterSpacing="1" fontFamily="sans-serif">RAW • ORGANIC</text>
        </g>
      </svg>
    )
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"preset" | "ai" | "upload">("preset");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("banana");
  
  // Custom states
  const [customProductImage, setCustomProductImage] = useState<string | null>(null);
  const [aiProductPrompt, setAiProductPrompt] = useState<string>("");
  const [isGeneratingProduct, setIsGeneratingProduct] = useState<boolean>(false);
  const [productError, setProductError] = useState<string | null>(null);

  // Marketing Medium
  const [selectedMedium, setSelectedMedium] = useState<string>("mug");
  const [selectedStyle, setSelectedStyle] = useState<string>("studio");
  const [customContext, setCustomContext] = useState<string>("");

  // Visualizations in progress
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);
  const [visualizeError, setVisualizeError] = useState<string | null>(null);
  const [currentGenerationFeedback, setCurrentGenerationFeedback] = useState<string | null>(null);

  // Completed campaign visual list
  interface MockupResult {
    id: string;
    productSource: string; // "banana", "cola", "honey", "custom", "ai"
    imageBytes: string; // Base64 data of generated image
    medium: string;
    style: string;
    promptUsed: string;
    timestamp: string;
    mediumLabel: string;
  }
  const [campaignMockups, setCampaignMockups] = useState<MockupResult[]>([]);
  const [fullscreenMockup, setFullscreenMockup] = useState<MockupResult | null>(null);

  // Parallel rendering states for "Generate All"
  const [isGeneratingAll, setIsGeneratingAll] = useState<boolean>(false);
  const [parallelStatuses, setParallelStatuses] = useState<{ [key: string]: "idle" | "loading" | "done" | "error" }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MARKING_MEDIUMS: MarketingMedium[] = [
    { id: "mug", name: "Boutique Ceramic Coffee Mug", description: "Seamless print on a custom ceramic mug on an artisan cafe table", icon: <Coffee className="w-5 h-5" /> },
    { id: "tshirt", name: "Cotton Custom T-Shirt", description: "Centrally printed high-fidelity graphic on custom fashion crewneck", icon: <Shirt className="w-5 h-5" /> },
    { id: "billboard", name: "Metropolitan Giant Billboard", description: "Massive backlit digital display towering over central city hub", icon: <Tv className="w-5 h-5" /> },
    { id: "tote", name: "Minimalist Canvas Tote Bag", description: "Chic organic canvas tote bag hanging inside a daylight boutique", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "subway", name: "Underground Subway Lightbox", description: "Luminous backlit poster billboard framed on subway station platform", icon: <Train className="w-5 h-5" /> },
    { id: "smartphone", name: "Sleek Gadget Screen Frame", description: "Clean mockup background displayed on screen of a modern phone", icon: <Smartphone className="w-5 h-5" /> },
    { id: "laptop_sticker", name: "Die-Cut Vinyl Laptop Sticker", description: "Branded sticker perfectly scaled on a metallic travel laptop", icon: <Tag className="w-5 h-5" /> }
  ];

  // Helper: Convert selected SVG to base64 PNG
  const convertSvgToPngDataUrl = async (svgId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const svgElement = document.getElementById(svgId);
      if (!svgElement) {
        reject(new Error(`SVG with element ID '${svgId}' not found.`));
        return;
      }
      try {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const blobUrl = window.URL.createObjectURL(svgBlob);
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 600;
          canvas.height = 600;
          const context = canvas.getContext("2d");
          if (context) {
            context.fillStyle = "white";
            context.fillRect(0, 0, 600, 600);
            context.drawImage(image, 50, 50, 500, 500);
            resolve(canvas.toDataURL("image/png"));
          } else {
            reject(new Error("Could not gain canvas 2D render context."));
          }
          window.URL.revokeObjectURL(blobUrl);
        };
        image.onerror = (err) => {
          reject(err);
        };
        image.src = blobUrl;
      } catch (e) {
        reject(e);
      }
    });
  };

  // Helper: Retrieve active source product image (base64 string)
  const getActiveProductImageBase64 = async (): Promise<string> => {
    if (activeTab === "preset") {
      const svgId = `svg-${selectedPresetId}`;
      return await convertSvgToPngDataUrl(svgId);
    } else if (activeTab === "upload") {
      if (!customProductImage) {
        throw new Error("No custom product photo uploaded yet.");
      }
      return customProductImage;
    } else { // activeTab === "ai"
      if (!customProductImage) {
        throw new Error("Please type in a seed prompt to generate an AI starter product first.");
      }
      return customProductImage;
    }
  };

  // Action: Generate starting product image using Imagen 3
  const handleGenerateStarterProduct = async () => {
    if (!aiProductPrompt.trim()) {
      setProductError("Please enter a desc. of the product you'd like to create.");
      return;
    }

    setIsGeneratingProduct(true);
    setProductError(null);
    try {
      const response = await fetch("/api/generate-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiProductPrompt })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Server failed to yield starter product.");
      }

      setCustomProductImage(data.imageUrl);
    } catch (e: any) {
      console.error(e);
      setProductError(e.message || "Something went wrong.");
    } finally {
      setIsGeneratingProduct(false);
    }
  };

  // Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomProductImage(event.target.result as string);
        setProductError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drop Handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomProductImage(event.target.result as string);
          setProductError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Action: Run visualization for a single medium
  const handleVisualizeMedium = async (targetMediumId: string = selectedMedium) => {
    setVisualizeError(null);
    setIsVisualizing(true);
    setCurrentGenerationFeedback(null);

    try {
      const base64Img = await getActiveProductImageBase64();
      
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productImage: base64Img,
          medium: targetMediumId,
          style: selectedStyle,
          customDescription: customContext
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || `Failed to visualize on product frame: ${targetMediumId}`);
      }

      const label = MARKING_MEDIUMS.find(m => m.id === targetMediumId)?.name || targetMediumId;

      const newResult: MockupResult = {
        id: `mock-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productSource: activeTab === "preset" ? selectedPresetId : activeTab,
        imageBytes: data.imageUrl,
        medium: targetMediumId,
        style: selectedStyle,
        promptUsed: customContext || "Standard dynamic mockup layout",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        mediumLabel: label
      };

      setCampaignMockups(prev => [newResult, ...prev]);
      if (data.feedback) {
        setCurrentGenerationFeedback(data.feedback);
      }
    } catch (e: any) {
      console.error(e);
      setVisualizeError(e.message || "Visualizer encountered an error. Ensure your GEMINI_API_KEY is configured.");
    } finally {
      setIsVisualizing(false);
    }
  };

  // Action: Generate Mockups for ALL Mediums simultaneously (Product Consistency test!)
  const handleGenerateAllMediums = async () => {
    setVisualizeError(null);
    setIsGeneratingAll(true);
    
    // Set all statuses to loading
    const initialStatuses: { [key: string]: "idle" | "loading" | "done" | "error" } = {};
    MARKING_MEDIUMS.forEach(m => {
      initialStatuses[m.id] = "loading";
    });
    setParallelStatuses(initialStatuses);

    let base64Img = "";
    try {
      base64Img = await getActiveProductImageBase64();
    } catch (e: any) {
      setVisualizeError(e.message || "Failed to load product source before visualization.");
      setIsGeneratingAll(false);
      return;
    }

    // Process all in parallel
    const promises = MARKING_MEDIUMS.map(async (med) => {
      try {
        const response = await fetch("/api/visualize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productImage: base64Img,
            medium: med.id,
            style: selectedStyle,
            customDescription: customContext
          })
        });

        const data = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || "Generation error");
        }

        const newResult: MockupResult = {
          id: `mock-${Date.now()}-${med.id}-${Math.floor(Math.random() * 1000)}`,
          productSource: activeTab === "preset" ? selectedPresetId : activeTab,
          imageBytes: data.imageUrl,
          medium: med.id,
          style: selectedStyle,
          promptUsed: customContext || "Visual representation mockup",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          mediumLabel: med.name
        };

        setCampaignMockups(prev => [newResult, ...prev]);
        setParallelStatuses(prev => ({ ...prev, [med.id]: "done" }));
      } catch (err) {
        console.error(`Parallel gen failed for ${med.id}:`, err);
        setParallelStatuses(prev => ({ ...prev, [med.id]: "error" }));
      }
    });

    await Promise.all(promises);
    setIsGeneratingAll(false);
  };

  // Download Action
  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="root-visualizer" className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-20">
      
      {/* Visual Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2 text-slate-900 rounded-xl shadow-inner flex items-center justify-center">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                AI Product Marketing Visualizer
                <span className="text-xs bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full font-mono">Nano Banana 🍌</span>
              </h1>
              <p className="text-xs text-slate-500">Maintain design consistency across various advertising channels with multi-modal generative mockups</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Powering brand mockups instantly</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Product Selection / Creation Space (Grid Span 5) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                1. Product Original Setup
              </h2>
              <span className="text-xs font-semibold text-slate-400">Product Source</span>
            </div>

            {/* Mode Selectors */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl mb-6 text-xs font-semibold">
              <button 
                id="tab-preset"
                onClick={() => { setActiveTab("preset"); setProductError(null); }}
                className={`py-2 px-3 rounded-xl transition duration-150 ${activeTab === "preset" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Graphics Preset
              </button>
              <button 
                id="tab-ai"
                onClick={() => { setActiveTab("ai"); setProductError(null); }}
                className={`py-2 px-3 rounded-xl transition duration-150 ${activeTab === "ai" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Generate Product
              </button>
              <button 
                id="tab-upload"
                onClick={() => { setActiveTab("upload"); setProductError(null); }}
                className={`py-2 px-3 rounded-xl transition duration-150 ${activeTab === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Photo Upload
              </button>
            </div>

            {/* Sub-panels */}
            {activeTab === "preset" && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <p className="text-xs text-slate-500">
                  Select a beautiful premium vector preset to check mockups with zero initial API cost. Our generator renders these vectors directly into clean mockups:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SVG_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      id={`preset-btn-${p.id}`}
                      onClick={() => {
                        setSelectedPresetId(p.id);
                        setCustomProductImage(null);
                      }}
                      className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition duration-200 hover:-translate-y-0.5 ${selectedPresetId === p.id ? "border-amber-400 bg-amber-50/40 ring-4 ring-amber-100" : "border-slate-100 bg-white hover:border-slate-200"}`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden mb-2">
                        {p.iconCode}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{p.name.split(" ")[0]}</span>
                      {selectedPresetId === p.id && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-400 rounded-full p-0.5 text-slate-950">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Embedded Hidden container rendering current selected SVG, allowing canvas serialization */}
                <div className="sr-only">
                  {SVG_PRESETS.map((p) => (
                    <div key={p.id} className="relative">
                      {p.iconCode}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <p className="text-xs text-slate-500">
                  Type a concept to generate a unique standalone product backdrop-free shot. Powered by Imagen 3:
                </p>
                <div className="flex gap-2">
                  <input
                    id="ai-product-input"
                    type="text"
                    value={aiProductPrompt}
                    onChange={(e) => setAiProductPrompt(e.target.value)}
                    placeholder="E.g., A minimalist teal matte stainless steel water bottle with wood lid"
                    className="flex-1 text-xs border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 transition duration-150"
                  />
                  <button
                    id="btn-ai-generate"
                    disabled={isGeneratingProduct}
                    onClick={handleGenerateStarterProduct}
                    className="bg-slate-900 border border-slate-950 text-white rounded-xl px-4 py-2.5 hover:bg-slate-800 disabled:opacity-50 text-xs font-bold transition duration-150 flex items-center gap-1.5"
                  >
                    {isGeneratingProduct ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    Generate
                  </button>
                </div>

                {productError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{productError}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "upload" && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <p className="text-xs text-slate-500">
                  Upload a clean, bright photo of your unique product (ideally with high contrast and light backdrops):
                </p>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-slate-100/50 rounded-2xl py-8 px-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition duration-150 group"
                >
                  <div className="bg-white p-3 rounded-full border border-slate-200 group-hover:scale-105 transition duration-150 shadow-sm text-slate-400 group-hover:text-amber-500">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Drag &amp; drop product photo here</span>
                  <span className="text-[10px] text-slate-500">Supports PNG, JPG, WebP</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Current Product Frame Preview */}
            <div className="mt-6 border border-slate-100 bg-slate-50 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">Subject Source Preview</span>
              <div className="relative aspect-square max-w-[240px] mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center p-2">
                {activeTab === "preset" ? (
                  <div className="w-full h-full p-2 flex items-center justify-center">
                    {SVG_PRESETS.find(p => p.id === selectedPresetId)?.iconCode}
                  </div>
                ) : customProductImage ? (
                  <img 
                    src={customProductImage} 
                    alt="Active target product" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    id="target-product-preview-img"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-slate-400 text-xs">
                    <ImageIcon className="w-10 h-10 stroke-[1.2]" />
                    <span>No image source loaded</span>
                  </div>
                )}

                {/* Badge showing origin */}
                <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></div>
                  <span>{activeTab === "preset" ? "Vector Preset" : activeTab === "ai" ? "AI Generated" : "User Uploaded"}</span>
                </div>
              </div>
              
              {customProductImage && (activeTab === "upload" || activeTab === "ai") && (
                <button
                  id="btn-remove-source"
                  onClick={() => setCustomProductImage(null)}
                  className="mt-3 mx-auto flex items-center justify-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1 font-semibold transition duration-150"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Discard Source
                </button>
              )}
            </div>
          </div>
          
          {/* Preset Visual consistency help block */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 flex gap-3 text-xs text-slate-700">
            <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-slate-900">Consistency Architecture</span>
              <p className="text-slate-600 text-xs">
                With **nano banana** (`gemini-2.5-flash-image`), the AI maps out local contours from the original product layer and projects them cleanly into various mediums. Keep prompts focused on composition for best consistency results.
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Medium Selection and Visualization Controls (Grid Span 7) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                2. AI Placement Mediums &amp; Settings
              </h2>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-md font-mono text-slate-500">Model Options</span>
            </div>

            {/* Step 2.1: Choose Medium */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wide">Select Target Placement Medium</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MARKING_MEDIUMS.map((m) => {
                  const isSelected = selectedMedium === m.id;
                  return (
                    <button
                      key={m.id}
                      id={`medium-card-${m.id}`}
                      onClick={() => setSelectedMedium(m.id)}
                      className={`flex items-start text-left p-3 rounded-2xl border-2 transition duration-150 group relative ${isSelected ? "border-amber-400 bg-amber-50/20 ring-4 ring-amber-100" : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"}`}
                    >
                      <div className={`p-2 rounded-xl mr-3 ${isSelected ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800"}`}>
                        {m.icon}
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight mb-0.5 truncate">{m.name}</h4>
                        <p className="text-[10px] text-slate-500 leading-normal line-clamp-1">{m.description}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-amber-400 rounded-full p-0.5 text-slate-950">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2.2: Aesthetic Styles */}
            <div className="mb-6 border-t border-slate-100 pt-5">
              <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wide">Aesthetic Theme Direction</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STYLE_PRESETS.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      id={`style-btn-${style.id}`}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center border-2 transition duration-200 ${isSelected ? "border-amber-400 bg-amber-50/30" : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}
                    >
                      <div className={`h-1.5 w-6 rounded-full mb-1 bg-gradient-to-r ${style.color}`}></div>
                      <span className="text-[11px] font-extrabold text-slate-900">{style.name.split(" ")[0]}</span>
                      <p className="text-[8px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">{style.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2.3: Custom prompt descriptor */}
            <div className="mb-6 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Custom Background Details (Optional)</label>
                <span className="text-[10px] text-slate-400">Context enhancement</span>
              </div>
              <textarea
                id="custom-context-input"
                rows={2}
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="E.g., Surrounded by coffee beans and vintage espresso machines, warm moody lighting, professional advertisement photoshoot."
                className="w-full text-xs border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-amber-300 transition duration-150 resize-none leading-relaxed"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="btn-visualize-single"
                disabled={isVisualizing || isGeneratingAll || (activeTab !== "preset" && !customProductImage)}
                onClick={() => handleVisualizeMedium()}
                className="flex-1 bg-slate-950 border border-slate-950 hover:bg-slate-850 hover:border-slate-900 text-white rounded-2xl py-3 px-5 font-extrabold text-sm shadow-md transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVisualizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Spinning up Nano Banana...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Visualize in chosen Medium</span>
                  </>
                )}
              </button>

              <button
                id="btn-visualize-all"
                disabled={isVisualizing || isGeneratingAll || (activeTab !== "preset" && !customProductImage)}
                onClick={handleGenerateAllMediums}
                className="bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-slate-900 rounded-2xl py-3 px-5 font-black text-sm shadow-md transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                title="Generate all placements side-by-side to compare consistency!"
              >
                {isGeneratingAll ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating All Placements...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Campaign Grid</span>
                  </>
                )}
              </button>
            </div>

            {/* Visualize Error Block */}
            {visualizeError && (
              <div className="mt-4 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-bold">Visualization Failed</span>
                  <p className="text-red-500">{visualizeError}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Please ensure your <strong>GEMINI_API_KEY</strong> is set in the Secrets manager (Settings &gt; Secrets).</p>
                </div>
              </div>
            )}

            {/* Generation Status Indicators during Parallel Load */}
            {isGeneratingAll && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Campaign Generation Pipeline:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MARKING_MEDIUMS.map(m => (
                    <div key={m.id} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 text-[10px]">
                      <div className={`w-2 h-2 rounded-full ${
                        parallelStatuses[m.id] === "done" ? "bg-emerald-500" :
                        parallelStatuses[m.id] === "error" ? "bg-red-400" : "bg-amber-400 animate-ping"
                      }`} />
                      <span className="font-medium text-slate-605 truncate">{m.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Showcase Section: Active Campaign Mockups / Side-by-side Comparison Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                📂 Active Marketing Campaign Showcase
              </h2>
              <p className="text-xs text-slate-500">Compare layout consistency across active frames and mediums as we render them with consistency</p>
            </div>
            
            {campaignMockups.length > 0 && (
              <button
                id="btn-clear-campaign"
                onClick={() => setCampaignMockups([])}
                className="text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl font-bold transition duration-150 flex items-center gap-1 self-start"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Campaign Workspace
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {campaignMockups.length === 0 ? (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-2 border-dashed border-slate-200 bg-white rounded-3xl py-16 px-4 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="bg-slate-100 p-4 rounded-full text-slate-400">
                  <ImagePlay className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Campaign is empty</h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto leading-relaxed">
                    Select a product and media frame above, then click visualize. Your generative consistency mockups will overlay here.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="workspace-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                layout
              >
                {campaignMockups.map((mock) => {
                  return (
                    <motion.div
                      key={mock.id}
                      layoutId={mock.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col group"
                    >
                      {/* Generative Mockup Image Container */}
                      <div className="relative aspect-square bg-slate-50 overflow-hidden cursor-zoom-in" onClick={() => setFullscreenMockup(mock)}>
                        <img 
                          src={mock.imageBytes} 
                          alt={mock.mediumLabel}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-mono text-white tracking-wider font-extrabold uppercase uppercase">
                          {mock.medium}
                        </div>
                        
                        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition duration-150 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-slate-800 shadow-md">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Info Panel under mockup */}
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3 border-t border-slate-150">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[11px] font-black text-slate-900 line-clamp-1">{mock.mediumLabel}</span>
                            <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase shrink-0">{mock.style}</span>
                          </div>
                          
                          {mock.promptUsed && (
                            <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 italic mb-1">
                              &ldquo;{mock.promptUsed}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
                          <span>Source: <strong className="text-slate-600 capitalize">{mock.productSource}</strong></span>
                          <span className="font-mono">{mock.timestamp}</span>
                        </div>
                      </div>

                      {/* Hover action cards */}
                      <div className="bg-slate-50 border-t border-slate-100 p-2.5 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setFullscreenMockup(mock)}
                          className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 py-1.5 rounded-lg flex items-center justify-center gap-1 transition duration-150 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-slate-500" />
                          Inspect
                        </button>
                        <button
                          onClick={() => downloadImage(mock.imageBytes, `campaign-${mock.medium}-${Date.now()}.png`)}
                          className="text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-800 py-1.5 rounded-lg flex items-center justify-center gap-1 transition duration-150 cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-amber-400" />
                          Save Mock
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Fullscreen Insight Modal */}
      <AnimatePresence>
        {fullscreenMockup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setFullscreenMockup(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative"
            >
              <button 
                id="btn-close-modal"
                onClick={() => setFullscreenMockup(null)}
                className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition duration-150 z-10 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Side picture display */}
              <div className="md:w-1/2 bg-slate-900 flex items-center justify-center relative aspect-square">
                <img 
                  src={fullscreenMockup.imageBytes} 
                  alt={fullscreenMockup.mediumLabel} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Side metadata display */}
              <div className="md:w-1/2 p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#ca8a04]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Conformed Representation</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-2 mb-1.5 leading-tight">{fullscreenMockup.mediumLabel}</h3>
                  
                  <div className="flex gap-1.5 mb-5 flex-wrap">
                    <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase font-bold">{fullscreenMockup.medium}</span>
                    <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase font-bold">{fullscreenMockup.style} style</span>
                    <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase font-bold">Source: {fullscreenMockup.productSource}</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Context Directive</span>
                    <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      &ldquo;{fullscreenMockup.promptUsed || "Rendered as standard dynamic mock scenario"}&rdquo;
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-col gap-1.5">
                    <span className="font-bold text-slate-800">Generating Pipeline Insight:</span>
                    <p className="leading-relaxed">
                      Conformed using model <span className="font-mono text-amber-700 font-semibold">gemini-2.5-flash-image</span> (with consistent nano banana contours). Design outlines, branding stamps, color palettes, and central labels are analytically blended onto the target geometry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => downloadImage(fullscreenMockup.imageBytes, `marketing-mockup-${fullscreenMockup.medium}.png`)}
                    className="flex-1 bg-slate-950 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    Download Mockup Image
                  </button>
                  <button
                    onClick={() => setFullscreenMockup(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl text-xs transition duration-150 cursor-pointer border border-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
