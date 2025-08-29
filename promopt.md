UI/UX REDESIGN PROMPT FÜR KÜCHEN-INVENTAR SYSTEM
Kopiere diesen Prompt in Lovable um die horrible gelbe Oberfläche zu einem professionellen Küchen-Interface zu transformieren:

REDESIGN das bestehende Küchen-Inventar System mit PROFESSIONELLER UI/UX für Restaurantküchen. Fokus auf Benutzerfreundlichkeit, Lesbarkeit und moderne Ästhetik.
🎨 FARBPALETTE (KÜCHENPROFESSIONELL)
PRIMÄRFARBEN
cssHauptfarbe: #2563eb (Professional Blue)
Sekundär: #1e293b (Slate Dark)
Hintergrund: #f8fafc (Clean White)
Karten: #ffffff (Pure White)
STATUSFARBEN
cssErfolg/OK: #059669 (Forest Green)
Warnung/Niedrig: #d97706 (Warm Orange)
Kritisch/Dringend: #dc2626 (Alert Red)
Info: #0284c7 (Ocean Blue)
AKZENTFARBEN FÜR KÖCHE
cssNico: #ef4444 (Warm Red)
Marco: #06b6d4 (Cyan)  
Sofia: #8b5cf6 (Purple)
David: #10b981 (Emerald)
Emma: #f59e0b (Amber)
Lucas: #ec4899 (Pink)
Anna: #3b82f6 (Blue)
NEUTRALE FARBEN
cssText Primär: #0f172a (Slate 900)
Text Sekundär: #64748b (Slate 500)  
Borders: #e2e8f0 (Slate 200)
Disabled: #94a3b8 (Slate 400)
🎯 DESIGN PRINZIPIEN
1. KÜCHENUMGEBUNG-OPTIMIERT

Große Touch-Targets: Minimum 48px für Handschuhbedienung
Hoher Kontrast: WCAG AAA Standard für schlechte Lichtverhältnisse
Spritzwassergeschützt Design: Keine versteckten Interaktionen
Schnelle Erkennung: Kritische Info binnen 2 Sekunden sichtbar

2. PROFESSIONELLE ÄSTHETIK

Clean & Minimal: Kein visueller Lärm
Hospitality Standard: Wie Premium-Restaurant-Apps
Vertrauenswürdig: Banker/Arzt-Level Seriosität
Modern aber zeitlos: Trends vermeiden

3. FUNKTIONALE HIERARCHIE
Kritische Alerts > Budget Status > Tagesaufgaben > Sekundäre Info
📱 LAYOUT SPEZIFIKATIONEN
HEADER REDESIGN
cssBackground: Linear Gradient #1e293b zu #334155
Höhe: 80px
Logo: Weiß mit subtilen Schatten
Navigation: Pills-Style mit aktiven States
DASHBOARD CARDS
cssBackground: #ffffff
Border-radius: 12px
Box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Padding: 24px
Gap zwischen Cards: 20px
DRINGENDE ARTIKEL SECTION
cssBackground: Linear Gradient #fef2f2 zu #ffffff
Border: 2px solid #fecaca
Border-radius: 16px  
Icon: Animiertes ⚠️ mit pulse-Effekt
KOCH AVATARS
cssGröße: 48px (Dashboard), 64px (Detail)
Border: 3px solid chef.color
Background: chef.color mit 10% opacity
Text: Weiß mit Text-shadow
🔤 TYPOGRAFIE
FONT STACK
cssPrimary: 'Inter', 'SF Pro Display', system-ui
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI'
Monospace: 'Jetbrains Mono', 'SF Mono', monospace
FONT SIZES & WEIGHTS
cssH1 Dashboard: 32px, font-weight: 700
H2 Sections: 24px, font-weight: 600  
H3 Cards: 18px, font-weight: 600
Body Text: 16px, font-weight: 400
Small Text: 14px, font-weight: 400
Captions: 12px, font-weight: 500
LINE HEIGHTS
cssHeadlines: 1.2
Body: 1.6  
Captions: 1.4
🎪 KOMPONENTENDESIGN
BUTTONS
cssPrimary Button:
  background: #2563eb
  color: white
  padding: 12px 24px
  border-radius: 8px
  font-weight: 600
  hover: #1d4ed8
  
Secondary Button:
  background: #f1f5f9
  color: #334155
  border: 1px solid #e2e8f0
  
Danger Button:
  background: #dc2626
  color: white
INPUT FIELDS
cssBackground: #ffffff
Border: 2px solid #e2e8f0
Border-radius: 8px
Padding: 12px 16px
Font-size: 16px (iOS zoom vermeiden)
Focus: Border-color: #2563eb
CARDS & CONTAINERS
cssElevation 1: box-shadow: 0 1px 3px rgba(0,0,0,0.1)
Elevation 2: box-shadow: 0 4px 6px rgba(0,0,0,0.1)  
Elevation 3: box-shadow: 0 10px 15px rgba(0,0,0,0.1)
📊 STATUS VISUALISIERUNG
BESTAND INDICATORS
cssKritisch (0): 
  color: #dc2626
  background: #fef2f2
  icon: 🚨 mit rotation animation

Niedrig (<min):
  color: #d97706  
  background: #fffbeb
  icon: ⚠️ mit bounce

OK (>min):
  color: #059669
  background: #ecfdf5  
  icon: ✅
PROGRESS BARS
cssHeight: 8px
Border-radius: 4px
Background: #e2e8f0
Fill: Linear gradient basierend auf Status
Animation: Smooth fill mit CSS transitions
📱 RESPONSIVE BREAKPOINTS
cssMobile: max-width: 640px
Tablet: 641px - 1024px  
Desktop: 1025px+

Mobile Anpassungen:
- Cards stack vertikal
- Font-sizes reduzieren um 2px
- Touch targets mindestens 48px
- Horizontal scroll für Tabellen
🎯 INTERAKTIONS-PATTERNS
HOVER STATES
cssCards: transform: translateY(-2px) + shadow increase
Buttons: background color darkening + scale(1.02)
Inputs: border-color change + subtle glow
LOADING STATES
cssSkeleton Loading: #f1f5f9 background mit shimmer
Spinner: 2563eb color, 24px size
Text Loading: "Lädt..." mit dots animation
SUCCESS FEEDBACK
cssToast Messages: Slide in from top-right
Color: #059669 background
Duration: 4 seconds
Dismiss: Click oder auto-fade
🧪 ACCESSIBILITY FEATURES
CONTRAST RATIOS
cssNormal Text: Minimum 4.5:1
Large Text: Minimum 3:1  
Interactive Elements: Minimum 4.5:1
KEYBOARD NAVIGATION

Tab-order logisch
Focus indicators sichtbar
Escape für Modals
Enter für Primary Actions

SCREEN READERS

Alt-text für Icons
ARIA-labels für Buttons
Heading-Hierarchie korrekt
Status announcements

🎨 VISUAL IMPROVEMENTS
ICONS

Lucide React Icons (konsistent)
20px default size
Status-abhängige Farben
Subtile hover animations

SPACING SYSTEM (8px Grid)
cssxs: 4px
sm: 8px  
md: 16px
lg: 24px
xl: 32px
2xl: 48px
BORDER RADIUS
cssSmall: 6px (buttons, inputs)
Medium: 8px (cards)
Large: 12px (sections)
Extra: 16px (hero sections)
📋 SPEZIFISCHE VERBESSERUNGEN
DASHBOARD HEADER

Weniger aufdringlicher Gradient
Subtiler Schatten
Bessere Lesbarkeit der Navigation

STATS CARDS

Mehr Whitespace
Bessere Icon-Integration
Subtile Hover-Effekte
Konsistente Alignments

EINKAUFSLISTE

Klarere Koch-Gruppierung
Bessere Checkbox-Integration
Intuitivere Progress-Anzeige
Professionellere Action-Buttons

MENÜ-VERWALTUNG

Übersichtlichere Ingredient-Lists
Bessere Inline-Editing Experience
Klarere Add/Remove Actions
Konsistente Form-Styling

WICHTIG: Das Redesign soll die Funktionalität beibehalten aber die Benutzerfreundlichkeit dramatisch verbessern. Ziel ist ein Interface, das aussieht wie eine €50,000/Jahr SaaS-Lösung für Profiküchen.
ERFOLGSKRITERIUM: Köche sollen das System gerne benutzen anstatt es zu meiden wegen schlechter Optik.