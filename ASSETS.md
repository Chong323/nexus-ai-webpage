# Nason Solar — 媒体资产清单

所有文件放在项目根目录的 `/public/` 下。放好后告诉我，我可以帮你把对应代码里的占位符替换成真正的 `<Image>` / `<video>` 标签。

---

## 🔴 P0 — 视频背景（最高优先）

| 文件路径 | 用途 | 规格 |
|---------|------|------|
| `public/hero-bg.mp4` | Hero 区全屏背景视频（无人机航拍安装现场） | 1920×1080，10-15秒循环，MP4，有则自动淡入显示 |

---

## 🟠 P1 — "Why Choose Us" 板块图片（Products 区，视差效果）

| 文件路径 | 内容 | 组件 |
|---------|------|------|
| `public/images/team-install.jpg` | 施工团队在屋顶作业 | `Products.tsx` block1 |
| `public/images/team-founder.jpg` | 创始人 / 团队合照（退伍军人背景） | `Products.tsx` block2 |
| `public/images/powerwall-install.jpg` | Tesla Powerwall 安装完成 | `Products.tsx` block3 |

**规格：** 800×600px，4:3，JPG

---

## 🟠 P1 — 六大服务卡片图片（Features 区，hover 时缩放）

| 文件路径 | 内容 | 组件 |
|---------|------|------|
| `public/images/service-residential.jpg` | 住宅屋顶太阳能板 | `Features.tsx` |
| `public/images/service-commercial.jpg` | 商业建筑屋顶太阳能 | `Features.tsx` |
| `public/images/service-battery.jpg` | 储能系统（Powerwall）安装 | `Features.tsx` |
| `public/images/service-ev.jpg` | 家用 EV 充电桩 | `Features.tsx` |
| `public/images/service-carport.jpg` | 太阳能车棚 | `Features.tsx` |
| `public/images/service-farm.jpg` | 地面光伏电站 | `Features.tsx` |

**规格：** 800×450px，16:9，JPG

---

## 🟠 P1 — 认证 / 合作方 Logo（Certifications 滚动栏）

| 文件路径 | 内容 | 组件 |
|---------|------|------|
| `public/logos/tesla.svg` | Tesla Energy 认证 Logo | `Certifications.tsx` |
| `public/logos/enphase.svg` | Enphase Platinum Logo | `Certifications.tsx` |
| `public/logos/nabcep.svg` | NABCEP 认证 Logo | `Certifications.tsx` |
| `public/logos/cslb.svg` | CSLB（加州承包商执照局）Logo | `Certifications.tsx` |
| `public/logos/bbb.svg` | BBB 认可 Logo | `Certifications.tsx` |

**规格：** SVG，透明背景，显示宽度约 80px

---

## 🟡 P2 — 项目案例图片（Project Gallery 区，可过滤+灯箱）

| 文件路径 | 项目 | 分类 | 组件 |
|---------|------|------|------|
| `public/images/gallery/arcadia-residential.jpg` | Arcadia 住宅屋顶太阳能 | residential | `ProjectGallery.tsx` |
| `public/images/gallery/pasadena-commercial.jpg` | Pasadena 商业办公楼屋顶 | commercial | `ProjectGallery.tsx` |
| `public/images/gallery/sg-ev.jpg` | San Gabriel 餐厅 EV 充电桩 | ev | `ProjectGallery.tsx` |
| `public/images/gallery/temple-city-residential.jpg` | Temple City 住宅屋顶 | residential | `ProjectGallery.tsx` |
| `public/images/gallery/monrovia-commercial.jpg` | Monrovia 仓库商业屋顶 | commercial | `ProjectGallery.tsx` |
| `public/images/gallery/alhambra-battery.jpg` | Alhambra Powerwall 安装 | battery | `ProjectGallery.tsx` |
| `public/images/gallery/san-marino-residential.jpg` | San Marino 豪宅屋顶 | residential | `ProjectGallery.tsx` |
| `public/images/gallery/rosemead-carport.jpg` | Rosemead 社区太阳能车棚 | ev | `ProjectGallery.tsx` |

**规格：** 800×600px，4:3，JPG，不超过 300KB

---

## 🟡 P2 — 客户头像（Testimonials 轮播，可选）

| 文件路径 | 对应客户 | 组件 |
|---------|---------|------|
| `public/images/avatar-mc.jpg` | Michael Chen | `Testimonials.tsx` |
| `public/images/avatar-jp.jpg` | Jennifer Park | `Testimonials.tsx` |
| `public/images/avatar-rg.jpg` | Robert Garcia | `Testimonials.tsx` |
| `public/images/avatar-lw.jpg` | Lisa Wang | `Testimonials.tsx` |
| `public/images/avatar-dk.jpg` | David Kim | `Testimonials.tsx` |
| `public/images/avatar-st.jpg` | Sarah Thompson | `Testimonials.tsx` |

**规格：** 200×200px，1:1，JPG，圆形显示

---

## 📋 放好文件后的操作

每个区域放好文件后，告诉我哪个区域准备好了，我来帮你把对应组件里的占位符注释替换成真正的代码：

- **Hero 视频** → `Hero.tsx` 里的 `VIDEO SLOT` 注释 → 替换为 `<video>` 激活
- **Features 图片** → `Features.tsx` 里的 `IMAGE SLOT` 注释 → 替换为 `<Image>` + hover 缩放
- **Products 图片** → `Products.tsx` → `ParallaxImage` 组件内替换（保留视差效果）
- **Gallery 图片** → `ProjectGallery.tsx` 里两处 `IMAGE SLOT` 注释 → 卡片缩略图 + 灯箱大图
- **Logo** → `Certifications.tsx` 里的 `LOGO SLOT` 注释 → 替换为 `<Image>`
- **头像** → `Testimonials.tsx` 里的 `AVATAR SLOT` 注释 → 替换为 `<Image>`
