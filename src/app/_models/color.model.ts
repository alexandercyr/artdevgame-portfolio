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
    return 'rgb('+ (this.r) +', '+ (this.g) +', ' + (this.b) +')'
  }

  getRGBAString(alpha) {
    return 'rgb('+ (this.r) +', '+ (this.g) +', ' + (this.b) +', ' + alpha + ')';
  }

  //colorChannelA and colorChannelB are ints ranging from 0 to 255
colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
  var channelA = colorChannelA*amountToMix;
  var channelB = colorChannelB*(1-amountToMix);
  return parseInt("" + channelA + channelB);
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
colorMixerString(rgbB, amountToMix){
  const rgbA = [this.r, this.g, this.b]
  var r = this.colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
  var g = this.colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
  var b = this.colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
  return "rgb("+r+","+g+","+b+")";
}
colorMixer(rgbB, amountToMix){
  const rgbA = [this.r, this.g, this.b]
  var r = this.colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
  var g = this.colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
  var b = this.colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
  return [r, g, b];
}
}
