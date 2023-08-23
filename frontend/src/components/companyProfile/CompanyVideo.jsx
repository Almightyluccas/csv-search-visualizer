import React from 'react';
import otherVideo from "../../assets/neARabl.mp4";
const CompanyVideo = () => {
  return (
    <div className={'flex justify-center'}>
      <video width='640' height='360' autoPlay muted controls>
        <source src={otherVideo} type="video/mp4" />
      </video>
    </div>

  );
}

export default CompanyVideo