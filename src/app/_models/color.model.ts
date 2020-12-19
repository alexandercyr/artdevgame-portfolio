export class Color {
  r;
  g;
  b;

  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getRGBString() {
    return 'rgb('+ (this.r * 255) +', '+ (this.g * 255) +', ' + (this.b * 255) +')'
  }

  getRGBAString(alpha) {
    return 'rgb('+ (this.r * 255) +', '+ (this.g * 255) +', ' + (this.b * 255) +', ' + alpha + ')';
  }
}
