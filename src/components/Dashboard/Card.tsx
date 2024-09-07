import React from "react";

const Card = ({ icon: Icon, label, h1, value, colorClass, colorIcon }) => (
  <div
    className={`card1 flex w-36 flex-col items-start rounded-lg py-5 ps-2 shadow-md ${colorClass}`}
  >
    <div
      className={`my-3 flex h-8 w-8 items-center justify-center rounded-full ${colorIcon}`}
    >
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <h3 className="font-boldest font-poppins text-xl text-red-500">{h1}</h3>
      <p className="font-poppins font-boldest my-1 text-gray-500">{label}</p>
      <p className="font-boldest font-poppins text-sm text-blue-700">{value}</p>
    </div>
  </div>
);
export default React.memo(Card);
