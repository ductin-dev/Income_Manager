export const readableTime = (datetime) => {
  //Wed Aug 18 00:00:00 ICT 2021
  let tmp = datetime.split(" ");
  let date = new Date(
    tmp[0] +
      " " +
      tmp[1] +
      " " +
      tmp[2] +
      " " +
      tmp[5] +
      " " +
      tmp[3] +
      " " +
      "GMT (India Standard Time)"
  );

  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};
