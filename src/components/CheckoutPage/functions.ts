function cleanseServiceName(serviceName:string){
  let stringToBeReturned:string='';
  stringToBeReturned = serviceName.replaceAll('<span>','');
  stringToBeReturned = stringToBeReturned.replaceAll('</span>','');
  return stringToBeReturned;
}

export { cleanseServiceName };