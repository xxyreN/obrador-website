"""Generate OG default image (1200x630) and apple-touch-icon (180x180)."""
import os
from PIL import Image, ImageDraw, ImageFont

IMG_DIR = "F:/claude projects/obrador-website/img"
LOGO = os.path.join(IMG_DIR, "logo.png")

logo = Image.open(LOGO).convert("RGBA")

apple = logo.resize((180, 180), Image.LANCZOS)
apple.save(os.path.join(IMG_DIR, "apple-touch-icon.png"), "PNG", optimize=True)
print(f"apple-touch-icon.png: {os.path.getsize(os.path.join(IMG_DIR,'apple-touch-icon.png'))//1024}K")

og_w, og_h = 1200, 630
bg_color = (245, 237, 228, 255)
dark = (26, 23, 21, 255)
copper = (196, 149, 106, 255)
muted = (107, 101, 96, 255)

og = Image.new("RGBA", (og_w, og_h), bg_color)
draw = ImageDraw.Draw(og)

logo_size = 200
small_logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
logo_x = (og_w - logo_size) // 2
logo_y = 110
og.paste(small_logo, (logo_x, logo_y), small_logo)

font_paths = [
    "C:/Windows/Fonts/georgia.ttf",
    "C:/Windows/Fonts/georgiab.ttf",
    "C:/Windows/Fonts/segoeui.ttf",
]
serif_font = None
sans_font = None
small_font = None
for p in font_paths:
    if os.path.exists(p):
        if "georgia" in p.lower() and "georgiab" not in p.lower():
            try:
                serif_font = ImageFont.truetype(p, 80)
            except: pass
        elif "segoeui" in p.lower():
            try:
                sans_font = ImageFont.truetype(p, 32)
                small_font = ImageFont.truetype(p, 22)
            except: pass

if serif_font is None:
    serif_font = ImageFont.load_default()
if sans_font is None:
    sans_font = ImageFont.load_default()
if small_font is None:
    small_font = ImageFont.load_default()

title = "Obrador Web"
def text_size(t, f):
    bbox = draw.textbbox((0,0), t, font=f)
    return bbox[2]-bbox[0], bbox[3]-bbox[1]

w, h = text_size(title, serif_font)
draw.text(((og_w-w)//2, logo_y+logo_size+40), title, fill=dark, font=serif_font)

tag = "Webs para cafeterías en Madrid"
w2, h2 = text_size(tag, sans_font)
draw.text(((og_w-w2)//2, logo_y+logo_size+40+h+18), tag, fill=muted, font=sans_font)

bottom = "obradorweb.com  ·  desde €490"
w3, h3 = text_size(bottom, small_font)
draw.text(((og_w-w3)//2, og_h-60), bottom, fill=copper, font=small_font)

og.convert("RGB").save(os.path.join(IMG_DIR, "og-default.png"), "PNG", optimize=True)
og.convert("RGB").save(os.path.join(IMG_DIR, "og-default.jpg"), "JPEG", quality=88, optimize=True)
print(f"og-default.png: {os.path.getsize(os.path.join(IMG_DIR,'og-default.png'))//1024}K")
print(f"og-default.jpg: {os.path.getsize(os.path.join(IMG_DIR,'og-default.jpg'))//1024}K")
