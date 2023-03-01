import React from "react";

function FiveStar({ rate }) {

    return <div style={{ '--rating': rate }} className="star text-yellow-400" />;
}

export default FiveStar;