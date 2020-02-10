import { encodeData } from "../../helpers/http";

export default ({ q, _start, _limit }) => {
  let data = { _start };
  if (q) {
    data['q'] = q;
  }
  if(_limit > 0){
    data['_limit'] = _limit;
  }
  return encodeData(data);
}