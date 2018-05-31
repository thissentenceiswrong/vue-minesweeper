import {xyToIndex} from "./../classes/Helper";

export default function() {
    console.assert(xyToIndex(1, 1, 9, 9) === 10, "Wrong");
}
