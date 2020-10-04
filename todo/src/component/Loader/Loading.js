import React from "react";

export const Loading = () => {
  return (
    <div style={{ color: "white",height:'100vh',width:'100vw' }}>
      <span className='loadingCon text-4xl'>
        <i className="fas fa-tasks"></i>{" "}
        <span className="l1 text-orange-500">T</span>
        <span className='l2'>R</span>
        <span className='l3'>U</span>
        <span className='l4'>D</span>
        <span className='l5'>U</span>
      </span>
    </div>
  );
};
