import {circleLineSegmentIntersects} from './circleLineSegmentIntersects';
import {lineSegmentInsideCircle} from './lineSegmentInsideCircle';

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
function circleLineCollision(ex: number, ey: number, lx: number, ly: number, cx: number, cy: number, r: number) {
    return circleLineSegmentIntersects(ex, ey, lx, ly, cx, cy, r) || lineSegmentInsideCircle(ex, ey, lx, ly, cx, cy, r);
}

export {circleLineCollision}
