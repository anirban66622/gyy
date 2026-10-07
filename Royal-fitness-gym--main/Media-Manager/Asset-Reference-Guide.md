# Royal Fitness Gym — Centralized Media Asset Master Reference Guide 👑

Welcome to the **Master Reference Document** for all visual media assets used across the Royal Fitness Gym website.

This guide provides a complete, easy-to-read index of every image, video, GIF, icon, logo, background, animation frame, slider image, and gallery asset on the website.

---

## ⚡ How Centralized Media Management Works

All media URLs on this website are connected to a single central configuration file:
**`/src/config/mediaManager.ts`**

### To replace or update any visual asset:
1. Open **`/src/config/mediaManager.ts`**.
2. Locate the corresponding asset ID or section in the code.
3. Paste your new Image, GIF, or Video URL into the `url` field.
4. Save the file. **The entire website updates instantly everywhere** — no other component files need to be modified!

---

# 📑 Complete Visual Asset Directory (Section-by-Section)

---

## 1. Hero Section

- **Section Name:** Hero Banner
- **Component Name:** `HeroSection` (`/src/components/HeroSection.tsx`)
- **Page Location:** Home Page (`/`)
- **Purpose of Media:** Fullscreen high-impact background image establishing the premium aesthetic of Royal Fitness Gym.
- **Current File Identifier:** `hero-bg-01`
- **Current URL / Path:** `https://lh3.googleusercontent.com/d/1MwSm6Ie9cMaW9gSZV9C7y68uqvoSYveF`
- **Fallback URL:** `https://drive.google.com/uc?export=view&id=1MwSm6Ie9cMaW9gSZV9C7y68uqvoSYveF`
- **File Type:** Image (JPG / WebP)
- **Recommended Aspect Ratio:** `16:9` or Fullscreen Cover
- **Recommended Resolution:** `1920x1080` or `2560x1440` (HD/4K)
- **Alt Text:** "Royal Fitness Gym Hero Background"
- **Gallery Structure:** Single Image
- **Animation / Scrolling Behavior:** Static background with entrance fade-in transition
- **Device Compatibility:** Desktop & Mobile (Responsive cover fit)
- **Notes:** High-contrast dark gym interior with ambient lighting.

---

## 2. Endless Workout Marquee Section

- **Section Name:** Services & Marquee Loop
- **Component Name:** `MarqueeSection` (`/src/components/MarqueeSection.tsx`)
- **Page Location:** Home Page (`/`)
- **Purpose of Media:** Continuous 3D animation loop showcasing gym activities, 3D renders, and exercise motion loops.
- **File Type:** Animated GIF / MP4 Loop
- **Recommended Aspect Ratio:** `16:10`
- **Recommended Resolution:** `840x540` or `1280x720`
- **Gallery Structure:** Dual-Row Infinite Scroll Marquee
- **Total Slots in Marquee:** 22 Animated Frames (Repeated dynamically from 5 primary GIF assets)
- **Animation / Scrolling Behavior:** Infinite horizontal scroll with scroll-triggered offset
- **Device Compatibility:** Desktop & Mobile

### Marquee Asset List:
- **GIF 1 (3D Render Loop 1):**
  - **URL:** `https://lh3.googleusercontent.com/d/1WW4kYQiy8iIXHNywbOw7Dkxqu2yv9qKs`
  - **Alt Text:** "Workout loop showcase 1"
- **GIF 2 (3D Render Loop 2):**
  - **URL:** `https://lh3.googleusercontent.com/d/1XzYApeZP-cnlMFbmcjt52s-q_nnyQ3Z5`
  - **Alt Text:** "Workout loop showcase 2"
- **GIF 3 (3D Render Loop 3):**
  - **URL:** `https://lh3.googleusercontent.com/d/1uKz6xNPX4N5378cfzZx9Dz19uL6ZOGbv`
  - **Alt Text:** "Workout loop showcase 3"
- **GIF 4 (3D Render Loop 4):**
  - **URL:** `https://lh3.googleusercontent.com/d/14nJ2rMxWhoVI3eQzS0NKZAbwLNcs47jF`
  - **Alt Text:** "Workout loop showcase 4"
- **GIF 5 (3D Render Loop 5):**
  - **URL:** `https://lh3.googleusercontent.com/d/1T1ATIpgX-wh-Gn8hSIrLNfSTdcAr6dQ_`
  - **Alt Text:** "Workout loop showcase 5"

---

## 3. Explore Projects Showcase Section

- **Section Name:** Interactive Project Showcase Cards
- **Component Name:** `ProjectsSection` (`/src/components/ProjectsSection.tsx`)
- **Page Location:** Home Page (`/`)
- **Purpose of Media:** 3 stacked interactive project cards highlighting Gym Equipment, Certified Coaches, and Transformation Champions.
- **Gallery Structure:** 3 Stacked Cards (Each card contains 3 images = 9 images total)
- **Animation / Scrolling Behavior:** Parallax scroll stack with sticky card pin and elevation
- **Device Compatibility:** Desktop & Mobile

### Card 01: "World-Class Fitness Equipment"
- **Purpose:** Displaying heavy machinery, dumbbells, and cardio equipment.
- **Column 1 Image 1:** `https://lh3.googleusercontent.com/d/13VKdO2g3uQAgiU5bm3qTeIjSGO97uR2A` (Aspect: `16:9`, Res: `1280x720`)
- **Column 1 Image 2:** `https://lh3.googleusercontent.com/d/1xowUAcRJSQeB6EZhERvUf7aUaLg8tQ9M` (Aspect: `16:9`, Res: `1280x720`)
- **Column 2 Showcase Image:** `https://lh3.googleusercontent.com/d/1t92_E5LlBXynJ3wTNMiw3dc6_bhCLQoq` (Aspect: `16:9`, Res: `1280x720`)

### Card 02: "Specialised Exercise & Wellness Coaches"
- **Purpose:** Displaying certified personal trainers and 1-on-1 coaching sessions.
- **Column 1 Image 1:** `https://lh3.googleusercontent.com/d/1ro8LD3pluR-tasEize5isKc9CGM9FchT` (Aspect: `4:3`, Res: `1000x750`)
- **Column 1 Image 2:** `https://lh3.googleusercontent.com/d/1pYJHHc8Qm0EPCpbRnAB3Q2i2asuyykbj` (Aspect: `4:3`, Res: `1000x750`)
- **Column 2 Showcase Image:** `https://lh3.googleusercontent.com/d/14MYWuA1W-n6JWsdO8Xga1smh4KyAkO0C` (Aspect: `4:3`, Res: `1000x750`)

### Card 03: "Our Transformation Champions"
- **Purpose:** Displaying real member transformation stories and community athletes.
- **Column 1 Image 1:** `https://lh3.googleusercontent.com/d/1w7MzMk2bJVqoHqbKuAUBWVwNXzST1pPP` (Aspect: `16:9`, Res: `1280x720`)
- **Column 1 Image 2:** `https://lh3.googleusercontent.com/d/1BjZbgRICIUXM9nFhVXjjfhZ1QjzFXJM0` (Aspect: `16:9`, Res: `1280x720`)
- **Column 2 Showcase Image:** `https://lh3.googleusercontent.com/d/1tt1kAnOX4WASg5zl_EA2-kY7ZYDETfiR` (Aspect: `3:4`, Res: `900x1200`)

---

## 4. Gym Explorer Menu Overlay

- **Section Name:** Fullscreen Royal Gym Navigation Menu
- **Component Name:** `GymMenuOverlay` (`/src/components/menu/GymMenuOverlay.tsx`)
- **Page Location:** Accessible from Navigation Bar everywhere
- **Purpose of Media:** Feature preview thumbnails for the 6 interactive sub-pages.
- **File Type:** Image (JPG / WebP)
- **Recommended Aspect Ratio:** `16:9`
- **Recommended Resolution:** `800x450`
- **Gallery Structure:** 6 Navigation Cards
- **Animation / Scrolling Behavior:** Staggered slide-up animation when menu opens
- **Device Compatibility:** Desktop & Mobile

### Menu Card Thumbnails:
1. **01 — Pictures of the Gym:** `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80`
2. **02 — Pictures of Members:** `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80`
3. **03 — Our Fitness Influencer:** `https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80`
4. **04 — Body Fat Calculator:** `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80`
5. **05 — Body Weight & Protein Calculator:** `https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80`
6. **06 — Memberships Fees & Plans:** `https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80`

---

## 5. Gym Facility Pictures Page

- **Section Name:** Gym Facility Galleries
- **Component Name:** `GymPicturesPage` (`/src/components/menu/GymPicturesPage.tsx`)
- **Page Location:** `/menu -> Pictures of the Gym`
- **Purpose of Media:** Showcasing equipment, zones, cardio floors, turf tracks, content studios, VIP coaching pods, and recovery saunas.
- **File Type:** High-Resolution Images
- **Recommended Aspect Ratio:** `16:9`
- **Recommended Resolution:** `1200x675` or higher
- **Gallery Structure:** 6 Interactive Auto-Swiping Zone Cards (5 photos per zone = 30 photos total)
- **Animation / Scrolling Behavior:** Auto-swipe carousel every 4 seconds with interactive navigation controls & fullscreen lightbox zoom.
- **Device Compatibility:** Desktop & Mobile

### Zone 1: Heavy Strength & Free Weights Zone
- **Image 1 (Olympic Power Racks):** `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (Dumbbell Section):** `https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Steel Competition Plates):** `https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (Bench Press Pods):** `https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Deadlift Platforms):** `https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1200&q=80`

### Zone 2: High-Tech Cardio & Endurance Floor
- **Image 1 (Curved Treadmills):** `https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (StairMasters & Climbers):** `https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Concept2 Rowers & Air Bikes):** `https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (Virtual Cardio Suite):** `https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Endurance Track):** `https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80`

### Zone 3: Functional Turf & Agility Track
- **Image 1 (30m Sled Track):** `https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (Battle Ropes & Kettlebells):** `https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Slam Balls & Conditioning):** `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (Plyo Boxes & Agility Ladders):** `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Turf Sprint Lane):** `https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1200&q=80`

### Zone 4: Professional Fitness Content Studio
- **Image 1 (Mirror Walls & Ring Lights):** `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (Tunable LED Panels):** `https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Neon Posing Backdrop):** `https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (Cinematic Video Recording Room):** `https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Private Creator Recording Lounge):** `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80`

### Zone 5: Royal VIP Coaching & Private Training
- **Image 1 (Private 1-on-1 Training Pod):** `https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (Form Analysis & Biometrics):** `https://images.unsplash.com/photo-1571019614002-c5d8362635a9?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Private Power Station):** `https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (VIP Performance Guidance):** `https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Power Studio Pod):** `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80`

### Zone 6: Hydration Bar & Recovery Sauna Lounge
- **Image 1 (Infrared Sauna Suite):** `https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80`
- **Image 2 (Recovery Compression Lounge):** `https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80`
- **Image 3 (Electrolyte & Protein Bar):** `https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80`
- **Image 4 (Cold Plunge Ice Tubs):** `https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80`
- **Image 5 (Fresh Smoothie & Hydration Station):** `https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80`

---

## 6. Member Pictures & Motion Reel Page

- **Section Name:** Member Transformations & Motion Video Reel
- **Component Name:** `MemberPicturesPage` (`/src/components/menu/MemberPicturesPage.tsx`)
- **Page Location:** `/menu -> Pictures of Members`
- **Purpose of Media:** Showcasing real member workout videos, squats, deadlifts, and transformation photos.
- **File Type:** Video (MP4) & Image (JPG/PNG)
- **Recommended Aspect Ratio:** `9:16` or Vertical Motion Poster
- **Recommended Resolution:** `720x1280` or `1080x1920`
- **Gallery Structure:** Dual-Row Infinite Scroll Reel & Category Grid (9 Media items)
- **Animation / Scrolling Behavior:** Infinite Reel + Autoplay Video loop on hover + Fullscreen Lightbox Player
- **Device Compatibility:** Desktop & Mobile

### Member Media Asset List:
1. **Marcus Thorne (Barbell Squats 240kg):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-in-a-gym-42875-large.mp4`
2. **Sarah Jenkins (Battle Ropes & Deadlift PR):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-woman-doing-crossfit-exercise-with-battle-ropes-42878-large.mp4`
3. **David K. (-18kg Fat Loss Transformation):**
   - **Type:** Image (JPG)
   - **URL:** `https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80`
4. **Alex Vance (Heavy Dumbbell Arm Hypertrophy):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-a-dumbbell-in-a-gym-42874-large.mp4`
5. **Elena Rostova (Content Studio Champion):**
   - **Type:** Image (JPG)
   - **URL:** `https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80`
6. **Viktor & Royal Crew (IPF Squat Mastery):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-muscular-man-doing-squats-with-a-barbell-42880-large.mp4`
7. **Jessica Miller (Curved Treadmill Sprint):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-athletic-woman-doing-warm-up-exercises-in-a-gym-42884-large.mp4`
8. **6 AM Morning Squad (Community Sled Team):**
   - **Type:** Image (JPG)
   - **URL:** `https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80`
9. **Tom & Power Team (30m Sled Sprint):**
   - **Type:** Video (MP4)
   - **URL:** `https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-a-treadmill-in-a-gym-42867-large.mp4`

---

## 7. Fitness Influencers & Athletes Page

- **Section Name:** Royal Gym Influencer & Creator Roster
- **Component Name:** `FitnessInfluencersPage` (`/src/components/menu/FitnessInfluencersPage.tsx`)
- **Page Location:** `/menu -> Our Fitness Influencer`
- **Purpose of Media:** Headshots and profile avatars of Royal Gym creators and brand ambassadors.
- **File Type:** High-Resolution Profile Images (JPG / WebP)
- **Recommended Aspect Ratio:** `1:1` Square or Circular Avatar
- **Recommended Resolution:** `800x800`
- **Gallery Structure:** 3x3 Creator Grid (9 Influencers)
- **Animation / Scrolling Behavior:** Smooth hover scale & social link trigger
- **Device Compatibility:** Desktop & Mobile

### Influencer Profile Assets:
1. **Vikram "Titan" Sharma (@vikram_titan_fit):** `https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80`
2. **Aanya Malhotra (@aanya_hybridfit):** `https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80`
3. **Rohan Verma (@rohan_power_v):** `https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80`
4. **Priya Nair (@priya_nair_mobility):** `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80`
5. **Kabir Mehta (@kabirmehta_shreds):** `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80`
6. **Ananya Deshmukh (@ananya_crossfit_fit):** `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80`
7. **Devraj Chauhan (@devraj_royal_coach):** `https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80`
8. **Rhea Roy (@rhea_pilates_fit):** `https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80`
9. **Siddharth "Sid" Malhotra (@sid_aesthetic_fit):** `https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=800&q=80`

---

## 8. Footer & Contact Modals

- **Section Name:** Contact & Footer Links
- **Component Names:** `FooterSection` & `ContactModal`
- **Page Location:** Bottom of every page & Enquiry Popup
- **Purpose of Media:** Social media links, Google Maps direction links, and contact channels.
- **Social & Location Channels:**
  - **WhatsApp Direct Channel:** `https://wa.me/917368024982`
  - **Instagram Official Page:** `https://www.instagram.com/royalfitness026?igsh=bGZvYmI0MHZnbWhx`
  - **Facebook Official Page:** `https://www.facebook.com/share/17jU76mU6S/`
  - **Google Maps Location:** `https://maps.google.com/?q=Royal+Fitness+unisex+gym+PWD+more+Adhikari+Kharibari+West+Bengal+734427`

---

## 🛠 Summary Checklist for Website Administrators

| Section | Central Config Identifier | Total Assets |
| :--- | :--- | :--- |
| Hero Section | `MEDIA_ASSETS.hero.background` | 1 Image |
| Marquee Showcase | `MEDIA_ASSETS.marquee.gifs` | 5 GIFs (22 Slots) |
| Explore Projects | `MEDIA_ASSETS.projects` | 9 Images |
| Gym Menu Overlay | `MEDIA_ASSETS.menuOverlay` | 6 Thumbnails |
| Gym Facility Galleries | `MEDIA_ASSETS.gymFacilityGalleries` | 30 Photos |
| Member Transformations | `MEDIA_ASSETS.memberMedia` | 9 Videos/Photos |
| Fitness Influencers | `MEDIA_ASSETS.influencers` | 9 Avatars |

---
*Created automatically for Royal Fitness Gym Media Asset Management.*
