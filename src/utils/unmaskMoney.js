export const unmaskMoney = (string, zero) => {

    let unmask = string?.replace(/[^\d]/g, "");

    if (unmask === '' && !zero) return null
    if (unmask === undefined && zero) return 0
  
    //unmask = unmask?.replace(/([0-9]{2})$/g, ".$1");
   //unmask = unmask?.replace(/(^0+(?=\d))|(,?0+$)/g, '');
  
    return parseFloat(unmask)
  }