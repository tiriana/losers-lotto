function sqr(n: number) {
    return n * n;
}

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
function lineSegmentInsideCircle(ex: number, ey: number, lx: number, ly: number, cx: number, cy: number, r: number) {
    var eIn: boolean = sqr(ex - cx) + sqr(ey - cy) < r * r;
    var lIn: boolean = sqr(lx - cx) + sqr(ly - cy) < r * r;

    return eIn || lIn;
}

export {lineSegmentInsideCircle}
