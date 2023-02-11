export class RectCollider {
  rectCollider(objA, objB) {
    const a = objA.getBounds();
    const b = objB.getBounds();

    const rightmostLeft = a.left < b.left ? b.left : a.left;
    const leftmostRight = a.right > b.right ? b.right : a.right;
    const bottommostTop = a.top < b.top ? b.top : a.top;
    const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    if (leftmostRight <= rightmostLeft) {
      return false;
    }
    return topmostBottom > bottommostTop;
  }
}
