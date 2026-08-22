"""Pad a photo out to a target aspect ratio without cropping it.

Photos on this site are never cropped to their tiles — they are scaled to fit
inside them — so a row of tiles only reads as uniform when every photo in it
shares one aspect ratio. When a supplied shot does not, run it through here
instead of cropping it back.

Every original pixel is kept, centred at full size. The recovered margin is
built from the photo's own edge rows or columns: stretched outward, blurred,
and desaturated with distance from the seam, so the join is invisible and the
outer edge reads as out-of-focus backdrop rather than smeared subject.

Usage:
    python3 scripts/pad-to-aspect.py <src> <dst> <ratio-w> <ratio-h>

    # the Product feature cards share a 4:3 tile
    python3 scripts/pad-to-aspect.py in.webp public/placeholders/out.webp 4 3

Requires Pillow (`pip install Pillow`). Record what was done to any file in
public/placeholders/README.md, next to that file's row.
"""

import sys

from PIL import Image, ImageEnhance, ImageFilter

# How much of the frame's edge is stretched to build the margin.
STRIP_FRACTION = 0.02
# Saturation the fill lands on at its outer edge, where it should read as
# plain backdrop. At the seam the fill keeps the photo's own colour.
OUTER_SATURATION = 0.4


def fill(region, size, blur, axis, toward_seam):
    """Stretch an edge strip across `size`, blurred and progressively
    desaturated with distance from the seam."""
    base = region.resize(size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(blur))
    flat = ImageEnhance.Color(base).enhance(OUTER_SATURATION)
    span = size[0] if axis == "x" else size[1]
    ramp = Image.linear_gradient("L").resize((span, 1) if axis == "x" else (1, span))
    ramp = ramp.rotate(-90, expand=True) if axis == "x" else ramp
    ramp = ramp.resize(size)
    if toward_seam:
        ramp = ramp.transpose(
            Image.FLIP_LEFT_RIGHT if axis == "x" else Image.FLIP_TOP_BOTTOM
        )
    return Image.composite(flat, base, ramp)


def pad(src, dst, ratio_w, ratio_h):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    target = ratio_w / ratio_h
    cw, ch = (w, round(w / target)) if w / h >= target else (round(h * target), h)

    canvas = Image.new("RGB", (cw, ch))
    left, top = (cw - w) // 2, (ch - h) // 2
    strip = max(2, round(min(w, h) * STRIP_FRACTION))

    if left > 0:
        blur = max(left, w) / 10
        canvas.paste(fill(im.crop((0, 0, strip, h)), (left, h), blur, "x", True), (0, top))
        canvas.paste(
            fill(im.crop((w - strip, 0, w, h)), (cw - left - w, h), blur, "x", False),
            (left + w, top),
        )
    if top > 0:
        blur = max(top, h) / 10
        canvas.paste(fill(im.crop((0, 0, w, strip)), (w, top), blur, "y", True), (left, 0))
        canvas.paste(
            fill(im.crop((0, h - strip, w, h)), (w, ch - top - h), blur, "y", False),
            (left, top + h),
        )

    canvas.paste(im, (left, top))
    canvas.save(dst, "WEBP", quality=90, method=6)
    print(f"{src}: {w}x{h} -> {cw}x{ch} ({dst})")


if __name__ == "__main__":
    if len(sys.argv) != 5:
        sys.exit(__doc__)
    pad(sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]))
