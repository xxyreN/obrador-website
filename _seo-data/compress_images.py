#!/usr/bin/env python3
"""One-shot image compressor for obrador-website portfolio images.

Resaves PNGs with optimize=True + downsizes any image wider than 1600px to 1440px.
Generates WebP siblings at quality 82.
"""
import os
import sys
from PIL import Image

IMG_DIR = "F:/claude projects/obrador-website/img"
MAX_WIDTH = 1600
TARGET_WIDTH = 1440
WEBP_QUALITY = 82

def process(path):
    name = os.path.basename(path)
    if name == "favicon.ico":
        return None
    if name == "logo.png":
        return None
    try:
        im = Image.open(path)
    except Exception as e:
        return f"SKIP {name} (open error: {e})"

    orig_size = os.path.getsize(path)
    w, h = im.size
    resized = False
    if w > MAX_WIDTH:
        new_h = int(h * TARGET_WIDTH / w)
        im = im.resize((TARGET_WIDTH, new_h), Image.LANCZOS)
        resized = True

    if im.mode == "RGBA":
        rgb_for_webp = Image.new("RGB", im.size, (255, 255, 255))
        rgb_for_webp.paste(im, mask=im.split()[3])
    elif im.mode != "RGB":
        rgb_for_webp = im.convert("RGB")
    else:
        rgb_for_webp = im

    im.save(path, "PNG", optimize=True)
    new_png_size = os.path.getsize(path)

    webp_path = os.path.splitext(path)[0] + ".webp"
    rgb_for_webp.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    webp_size = os.path.getsize(webp_path)

    return f"{name}: PNG {orig_size//1024}K -> {new_png_size//1024}K{' (resized)' if resized else ''}, WebP {webp_size//1024}K"

if __name__ == "__main__":
    for f in sorted(os.listdir(IMG_DIR)):
        if f.lower().endswith(".png") and not f.endswith(".webp"):
            r = process(os.path.join(IMG_DIR, f))
            if r:
                print(r)
