/* PondMath engine - pure functions, no DOM. Honest backyard pond math.
   Constants stated in the UI: 7.48 gal per cu ft, liner = footprint + 2x depth
   + 2 ft overlap per side, turnover 1-2 hours, 150 GPH per inch of spillway,
   20 gal per goldfish and 250 gal per koi (the inch-per-gallon rule is a myth). */
var PondMath = (function () {
  function volumeGal(l, w, avgDepthFt) {
    return l * w * avgDepthFt * 7.48;
  }
  function depthVerdict(avgFt, maxFt) {
    var ratio = avgFt / maxFt;
    if (ratio >= 0.65) return 'Nearly a box - shelves are where plants and frogs actually live; honest average depth cuts the liner and pump sizes.';
    if (ratio >= 0.4) return 'A realistic shelf-to-depth mix - plant ledges included.';
    return 'Mostly shallow shelves - great for plants, but watch summer heat and winter freeze.';
  }
  function linerSize(l, w, maxDepthFt, overlapFt) {
    var linerL = l + 2 * maxDepthFt + 2 * overlapFt;
    var linerW = w + 2 * maxDepthFt + 2 * overlapFt;
    return { linerL: linerL, linerW: linerW, areaFt2: linerL * linerW };
  }
  function linerVerdict(overlapFt) {
    if (overlapFt < 1) return 'Under a foot of overlap anchors badly - the first rock pulls the edge down.';
    if (overlapFt <= 2.5) return 'Two feet of overlap is the standard - enough to trench and anchor.';
    return 'Generous overlap - safe, but you are paying for liner you will bury.';
  }
  function pumpGph(volumeGal, turnoverHrs) {
    return volumeGal / turnoverHrs;
  }
  function headDerateGph(ratedGph, headFt, maxHeadFt) {
    var f = ratedGph * (1 - headFt / maxHeadFt);
    return f > 0 ? f : 0;
  }
  function pumpVerdict(actualGph, neededGph) {
    var pct = actualGph / neededGph * 100;
    if (pct >= 110) return 'Flow covers the turnover with headroom - the pump is honest for this pond.';
    if (pct >= 90) return 'Just covers turnover at this lift - fine, but clean the pre-filter or it slips under.';
    return 'Under 90% of needed flow after head loss - the waterfall stole the circulation.';
  }
  function waterfallGph(spillInches, gphPerInch) {
    return spillInches * gphPerInch;
  }
  function fishCheck(type, count, volumeGal) {
    var perFish = type === 'koi' ? 250 : 20;
    var capacity = Math.floor(volumeGal / perFish);
    return { perFish: perFish, capacity: capacity, ok: count <= capacity };
  }
  function fishVerdict(type, count, volumeGal) {
    var c = fishCheck(type, count, volumeGal);
    if (c.ok) return 'Room for ' + c.capacity + ' ' + type + ' at the honest ' + c.perFish + ' gal each - ' + count + ' is comfortable.';
    return 'This pond honestly holds ' + c.capacity + ' ' + type + ' (' + c.perFish + ' gal each). ' + count + ' is overstocked - the inch-per-gallon rule is a myth that kills fish.';
  }
  function winterVerdict(maxDepthIn, climate) {
    var need = climate === 'mild' ? 18 : (climate === 'cold' ? 24 : 36);
    if (maxDepthIn >= need) return maxDepthIn + 'in clears the ' + climate + '-winter bar of ' + need + 'in - fish can winter under ice with a hole open.';
    return maxDepthIn + 'in is under the ' + need + 'in a ' + climate + ' winter wants - plan a de-icer and aerator, or move fish in.';
  }
  return {
    volumeGal: volumeGal, depthVerdict: depthVerdict,
    linerSize: linerSize, linerVerdict: linerVerdict,
    pumpGph: pumpGph, headDerateGph: headDerateGph, pumpVerdict: pumpVerdict, waterfallGph: waterfallGph,
    fishCheck: fishCheck, fishVerdict: fishVerdict, winterVerdict: winterVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = PondMath;
