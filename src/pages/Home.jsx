import React, { useState } from "react";
import Search from "../components/Search";
import Result from "../components/Result";

const Home = () => {
  const [payload,setPayload] = useState(null);
  return (
    <div className="main">
      <Search payload={payload} setPayload={setPayload}/>
      {payload && <Result payload={payload} />}
    </div>
  );
};

export default Home;
