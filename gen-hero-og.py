#!/usr/bin/env python3
"""Generate hero-style OG image: dark bg, big white title."""
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SCALE = 3
W, H = 1200 * SCALE, 630 * SCALE

FONT_DIR = Path("/home/ubuntu/.openclaw/workspace/skills/editorial-site/scripts/fonts")
SYSTEM_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"

BG    = "#0A0A0A"
WHITE = "#FFFFFF"
DIM   = "#FFFFFF"
GREY  = "rgba(255,255,255,0.3)"
BLUE  = "#2563EB"

def load_font(path, size):
    try:
        return ImageFont.truetype(str(path), size)
    except:
        return ImageFont.load_default()

def cx(draw, text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return (W - (bb[2] - bb[0])) // 2

def main():
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Subtle particle dots
    random.seed(42)
    for _ in range(80):
        x = random.randint(0, W)
        y = random.randint(0, H)
        r = random.randint(1, int(2.5 * SCALE))
        op = int(random.uniform(0.04, 0.18) * 255)
        draw.ellipse([(x-r, y-r), (x+r, y+r)], fill=(255, 255, 255, op))

    f_bold        = load_font(FONT_DIR / "inter-bold.ttf", 88 * SCALE)
    f_bold_sm     = load_font(FONT_DIR / "inter-bold.ttf", 54 * SCALE)
    f_mono        = load_font(SYSTEM_MONO, 16 * SCALE)

    # Byline at top
    byline = "ROUSSEAU KAZI  ·  MARCH 2026  ·  6 MIN READ"
    draw.text((cx(draw, byline, f_mono), 148 * SCALE), byline, fill=(255, 255, 255, 76), font=f_mono)

    # Title line 1
    line1 = "Kill your identity"
    draw.text((cx(draw, line1, f_bold), 210 * SCALE), line1, fill=WHITE, font=f_bold)

    # Title line 2 (slightly dimmer)
    line2 = "before it gets murdered"
    draw.text((cx(draw, line2, f_bold_sm), 320 * SCALE), line2, fill=(255, 255, 255, 180), font=f_bold_sm)

    # Thin blue accent line under title
    bar_w = int(48 * SCALE)
    bar_x = (W - bar_w) // 2
    draw.rectangle([(bar_x, 410 * SCALE), (bar_x + bar_w, 410 * SCALE + int(3 * SCALE))], fill=BLUE)

    # Save
    out = Path("/home/ubuntu/.openclaw/workspace/notes-blog/kyi/og.png")
    img_2x = img.resize((2400, 1260), Image.LANCZOS)
    img_2x.save(out, "PNG", optimize=True)

    preview = img.resize((1200, 630), Image.LANCZOS)
    preview.save("/tmp/og-preview.png", "PNG")
    print(f"Saved preview: /tmp/og-preview.png")

if __name__ == "__main__":
    main()
