/**
 *
 * @param ex x coordinate of line segment start
 * @param ey y coordinate of line segment start
 * @param lx x coordinate of line segment end
 * @param ly y coordinate of line segment end
 * @param cx x coordinate of circle centre
 * @param cy y coordinate of circle centre
 * @param r circle radius
 */
function circleLineSegmentIntersects(ex: number, ey: number, lx: number, ly: number, cx: number, cy: number, r: number) {
    var dx = lx - ex;
    var dy = ly - ey;
    var fx = ex - cx;
    var fy = ey - cy;

    var _d = Math.sqrt(dx * dx + dy * dy);
    var _f = Math.sqrt(fx * fx + fy * fy);

    var a = _d * _d;
    var b = 2 * _d * _f;
    var c = _f * _f - r * r;

    var delta = b * b - 4 * a * c;

    if (delta < 0) {
        return false;
    }

    delta = Math.sqrt(delta);

    var t1 = (-b - delta) / (2 * a);
    var t2 = (-b + delta) / (2 * a);

    if (t1 >= 0 && t1 <= 1) {
        return true;
    }

    if (t2 >= 0 && t2 <= 1) {
        return true;
    }

    return false;
}

export {circleLineSegmentIntersects}
